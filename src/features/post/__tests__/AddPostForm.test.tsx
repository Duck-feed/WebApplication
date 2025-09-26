// __tests__/AddPostForm.test.tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import type { CreatePostCommand } from "@/features/post/validation/createPostSchema";
import AddPostForm from "../components/AddPostForm";

jest.mock("@/components/emoji/EmojiPicker", () => ({
  __esModule: true,
  default: ({ onSelect, onClose }: { onSelect: (emoji: string) => void; onClose: () => void }) => (
    <div data-testid="emoji-picker">
      <button onClick={() => onSelect("😀")}>Mock Emoji</button>
      <button onClick={onClose}>Mock Close</button>
    </div>
  ),
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

function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm<CreatePostCommand>({
    defaultValues: {
      content: "",
      visibility: "PUBLIC_ALL",
      media: [],
    },
    mode: "onBlur", // validate on blur
    resolver: async (values) => {
      const errors: any = {};
      if ((values.content ?? "").length > 1000) {
        errors.content = {
          type: "maxLength",
          message: "Content must be at most 1000 characters",
        };
      }
      return { values, errors };
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe("AddPostForm", () => {
  test("renders input and avatar", () => {
    render(
      <FormWrapper>
        <AddPostForm />
      </FormWrapper>,
    );

    // Check if the input and avatar are rendered
    expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument();
    expect(screen.getByText("sample_name")).toBeInTheDocument();
  });

  test("opens emoji picker and inserts emoji", () => {
    render(
      <FormWrapper>
        <AddPostForm />
      </FormWrapper>,
    );

    const emojiTrigger = screen.getByRole("button", { name: /insert emoji/i });
    fireEvent.click(emojiTrigger);

    expect(screen.getByTestId("emoji-picker")).toBeInTheDocument();

    const mockEmoji = screen.getByText("Mock Emoji");
    fireEvent.click(mockEmoji);

    expect(screen.getByDisplayValue("😀")).toBeInTheDocument();
  });

  test("textarea ref assignment and focus works", () => {
    render(
      <FormWrapper>
        <AddPostForm />
      </FormWrapper>,
    );

    const textarea = screen.getByPlaceholderText("What's on your mind?");
    textarea.focus(); // trigger useRef & setSelectionRange logic
  });

  test("calls onClose from EmojiPicker", () => {
    render(
      <FormWrapper>
        <AddPostForm />
      </FormWrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: /insert emoji/i }));
    expect(screen.getByTestId("emoji-picker")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Mock Close")); // 👈 close

    // assert it disappeared (popover closed)
    expect(screen.queryByTestId("emoji-picker")).not.toBeInTheDocument();
  });

  test("enter content over 1000 characters shows validation error", async () => {
    render(
      <FormWrapper>
        <AddPostForm />
      </FormWrapper>,
    );

    const textarea = screen.getByPlaceholderText("What's on your mind?");
    const longText = "a".repeat(1001);

    fireEvent.change(textarea, { target: { value: longText } });
    fireEvent.blur(textarea); // trigger validation

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Content must be at most 1000 characters",
      );
    });
  });
});
