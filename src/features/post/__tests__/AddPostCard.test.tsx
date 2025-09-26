import { act, fireEvent, render, screen } from "@testing-library/react";
import AddPostCard from "../components/AddPostCard";

jest.mock("@/features/auth/hooks/useAuth", () => ({
  useAuth: jest.fn(() => ({
    user: {
      id: "user-1",
      username: "john.doe",
      avatar: "https://via.placeholder.com/40",
      profileName: "John Doe",
    },
  })),
}));

jest.mock("../components/AddPostModal", () => {
  return jest.fn(({ isOpen, onOpenChange }) => {
    if (isOpen) {
      return (
        <div data-testid="mock-modal">
          <p>Modal is open</p>
          <button onClick={() => onOpenChange(false)}>Close Modal</button>
        </div>
      );
    }
    return null;
  });
});

describe("Add Post Card component tests", () => {
  test("card is rendered", () => {
    render(<AddPostCard />);
    const cardElementContent = screen.getByPlaceholderText("What's new");
    expect(cardElementContent).toBeInTheDocument();
  });

  test("displays a modal when the input is clicked", async () => {
    render(<AddPostCard />);
    const inputElement = screen.getByPlaceholderText("What's new");

    await act(async () => {
      fireEvent.click(inputElement);
    });

    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  });

  test("post button opens the modal", async () => {
    render(<AddPostCard />);
    const postButton = screen.getByRole("button", { name: /post/i });
    await act(async () => {
      fireEvent.click(postButton);
    });

    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  });
});
