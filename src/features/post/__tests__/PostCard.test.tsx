import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "../components/PostCard";

const mockPost = {
  id: 1,
  author: "John Doe",
  avatar: "https://via.placeholder.com/40",
  time: "2h ago",
  content: "This is a test post",
  images: ["https://via.placeholder.com/100"],
  likes: 5,
  comments: 3,
};

describe("PostCard", () => {
  it("renders author, content, time, likes and comments", () => {
    render(<PostCard {...mockPost} />);

    expect(screen.getByText(mockPost.author)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(mockPost.time)).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("toggles like count when Heart button is clicked", () => {
    render(<PostCard {...mockPost} />);

    const likeButton = screen.getByText("5").closest("button");
    expect(likeButton).toBeTruthy();

    // Click once -> likes + 1
    fireEvent.click(likeButton!);
    expect(screen.getByText("6")).toBeInTheDocument();

    // Click again -> likes back
    fireEvent.click(likeButton!);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("alerts when image is clicked and not dragging", () => {
    render(<PostCard {...mockPost} />);

    // Mock window.alert
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const img = screen.getByAltText("post-img-0");
    fireEvent.click(img);
    expect(alertMock).toHaveBeenCalledWith("Open image: " + mockPost.images[0]);

    alertMock.mockRestore();
  });
});
