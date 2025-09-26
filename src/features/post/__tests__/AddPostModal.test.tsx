import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { createPost } from "../api";
import AddPostModal from "../components/AddPostModal";

jest.mock("../api");
jest.mock("sonner", () => ({
  __esModule: true,
  toast: {
    promise: jest.fn(() => ({
      unwrap: jest.fn().mockResolvedValue("ok"),
    })),
  },
}));


jest.mock("@/features/auth/hooks/useAuth", () => ({
  __esModule: true,
  useAuth: () => ({
    user: {
      profileName: null,
      username: "sample_name",
      avatar: "https://example.com/avatar.png",
    },
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));
describe("🧪 Add Post Modal component test", () => {
  test("renders when open", () => {
    render(<AddPostModal isOpen={true} />);
    expect(screen.getByText("New post")).toBeInTheDocument();
  });

  test("closes when cancel is clicked", async () => {
    const onOpenChange = jest.fn();
    render(<AddPostModal isOpen={true} onOpenChange={onOpenChange} />);

    const cancelBtn = screen.getByText("Cancel");
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  test("post button is disabled when content is empty", () => {
    render(<AddPostModal isOpen={true} />);
    const postBtn = screen.getByRole("button", { name: /post/i });
    expect(postBtn).toBeDisabled();
  });

  test("post button is disabled when content exceeds 1000 characters", async () => {
    render(<AddPostModal isOpen={true} />);
    const textarea = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(textarea, { target: { value: "a".repeat(1001) } });
    fireEvent.blur(textarea);

    const postBtn = screen.getByRole("button", { name: /post/i });
    await waitFor(() => {
      expect(postBtn).toBeDisabled();
    });
  });
});

describe("🧪 Add Post Modal API test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Make toast.promise return an object with .unwrap(), matching component usage
    (toast.promise as jest.Mock).mockImplementation((promise: Promise<unknown>) => ({
      unwrap: () => promise,
    }));
  });

  test("shows loading toast when posting", async () => {
    const pending = new Promise(() => {});
    (createPost as jest.Mock).mockReturnValue(pending);

    render(<AddPostModal isOpen={true} />);

    const textarea = screen.getByPlaceholderText("What's on your mind?");

    await userEvent.type(textarea, "hello world");
    await userEvent.tab();

    const postBtn = screen.getByRole("button", { name: /post/i });

    await waitFor(() => expect(postBtn).toBeEnabled());

    await userEvent.click(postBtn);

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalledWith(
        expect.any(Promise),
        expect.objectContaining({ loading: "Posting..." }),
      );
    });
  });

  test("shows success toast on post success", async () => {
    (createPost as jest.Mock).mockResolvedValue("mock-result");

    render(<AddPostModal isOpen={true} />);

    const textarea = screen.getByPlaceholderText("What's on your mind?");
    await userEvent.type(textarea, "Test content");
    await userEvent.tab(); // trigger RHF validation

    const postBtn = screen.getByRole("button", { name: /post/i });
    await waitFor(() => expect(postBtn).toBeEnabled());

    await userEvent.click(postBtn);

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalledWith(
        expect.any(Promise),
        expect.objectContaining({
          success: "Post created successfully!",
        }),
      );
    });
  });

  test("shows error toast on post failure", async () => {
    const rejectionError = new Error("Failed to post");
    (createPost as jest.Mock).mockRejectedValue(rejectionError);

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<AddPostModal isOpen />);

    const textarea = screen.getByPlaceholderText("What's on your mind?");
    await userEvent.type(textarea, "Error post");
    await userEvent.tab();

    const postBtn = screen.getByRole("button", { name: /post/i });
    await waitFor(() => expect(postBtn).toBeEnabled());

    await userEvent.click(postBtn);

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalledWith(
        expect.any(Promise),
        expect.objectContaining({ error: expect.any(Function) }),
      );
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to post", rejectionError.message);
    });

    consoleErrorSpy.mockRestore();
  });
});
