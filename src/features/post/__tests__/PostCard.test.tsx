import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "../components/PostCard";

jest.mock("@/lib/utils", () => {
  const actual = jest.requireActual("@/lib/utils");
  return {
    ...actual,
    timeAgo: jest.fn(() => "2h ago"),
  };
});

const { timeAgo } = jest.requireMock("@/lib/utils") as { timeAgo: jest.Mock };

const mockPost = {
  id: "post-123",
  content: "This is a test post",
  publishedAt: new Date().toISOString(),
  author: {
    id: "user-1",
    userName: "john.doe",
    fullName: "John Doe",
    avatarUrl: "https://via.placeholder.com/40",
  },
  media: [
    {
      id: "media-1",
      url: "https://via.placeholder.com/100",
      type: "image",
      order: 0,
    },
  ],
  commentCount: 3,
  reactionCount: 5,
  isReactedByCurrentUser: false,
};

describe("PostCard", () => {
  beforeEach(() => {
    timeAgo.mockClear();
  });

  it("renders author, content, time, likes and comments", () => {
    render(<PostCard {...mockPost} />);

    expect(screen.getByText(mockPost.author.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(timeAgo).toHaveBeenCalledWith(mockPost.publishedAt);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("toggles like count when Heart button is clicked", () => {
    render(<PostCard {...mockPost} />);

    const likeButton = screen.getByText("5").closest("button");
    expect(likeButton).toBeTruthy();

    fireEvent.click(likeButton!);
    expect(screen.getByText("6")).toBeInTheDocument();

    fireEvent.click(likeButton!);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("alerts when image is clicked and not dragging", () => {
    render(<PostCard {...mockPost} />);

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const img = screen.getByAltText("post-img-0");
    fireEvent.click(img);
    expect(alertMock).toHaveBeenCalledWith("Open image: " + mockPost.media[0].url);

    alertMock.mockRestore();
  });
});
