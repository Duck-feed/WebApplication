import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../components/LoginForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAppSelector } from "@/app/hooks/redux";

const mockNavigate = jest.fn();
const loginMock = jest.fn();
let unwrapMock: jest.Mock;
let mockState: any;

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

jest.mock("@/features/auth/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/app/hooks/redux", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockedUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

const renderLoginForm = () => render(<LoginForm />);

beforeEach(() => {
  jest.clearAllMocks();

  mockState = { auth: { error: null } } as any;
  unwrapMock = jest.fn().mockResolvedValue(undefined);
  loginMock.mockReturnValue({ unwrap: unwrapMock });

  mockedUseAuth.mockReturnValue({
    login: loginMock,
    loading: false,
    logout: jest.fn(),
    user: null,
  });

  mockedUseAppSelector.mockImplementation((selector) => selector(mockState));
});

describe("LoginForm", () => {
  it("renders login form", () => {
    renderLoginForm();

    expect(
      screen.getByText(/Enter your details to sign in to your account/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("shows validation messages when required fields are empty", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByLabelText(/Email/i), "invalid-email");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
  });

  it("submits credentials, respects remember me, and navigates on success", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByLabelText(/Remember me/i));
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("test@example.com", "password123", true);
    });
    await waitFor(() => {
      expect(unwrapMock).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("does not navigate when authentication fails", async () => {
    unwrapMock.mockRejectedValueOnce(new Error("Login failed"));
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(unwrapMock).toHaveBeenCalled();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("renders server-side error messages", () => {
    mockState.auth.error = "Invalid credentials, Another error";
    renderLoginForm();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Invalid credentials");
    expect(items[1]).toHaveTextContent("Another error");
  });

  it("disables submit button and shows loading text while authenticating", () => {
    mockedUseAuth.mockReturnValue({
      login: loginMock,
      loading: true,
      logout: jest.fn(),
      user: null,
    });

    renderLoginForm();

    const submitButton = screen.getByRole("button", { name: /Signing in.../i });
    expect(submitButton).toBeDisabled();
  });

  it("navigates to registration when 'Create an account' is clicked", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
