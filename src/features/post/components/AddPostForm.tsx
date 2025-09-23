import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { GoSmiley } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import { UserAvatar } from "@/components/common/UserAvatar";
import EmojiPicker from "@/components/emoji/EmojiPicker";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { CreatePostCommand } from "@/features/post/validation/createPostSchema";

export default function AddPostForm() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatePostCommand>();

  const content = watch("content") ?? "";
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const smileyBtnRef = useRef<HTMLButtonElement>(null);

  const handleEmojiInsert = (emoji: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? content.length;

    const newContent = content.slice(0, start) + emoji + content.slice(end);
    setValue("content", newContent, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    if (!isPickerOpen) {
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }
  };

  return (
    <div className="flex flex-row gap-1 w-full mt-2">
      {/* Avatar */}
      <div className="flex flex-start mt-1 mb-2 mr-2">
        <UserAvatar
          src="https://ruinmyweek.com/wp-content/uploads/2020/09/the-is-for-me-meme-calls-out-history-greediest-villains-1.jpg"
          name="sample name"
          size="md"
        />
      </div>

      {/* Input + Tools */}
      <div className="flex-1 mr-3 sm:mr-6 md:mr-12">
        <span className="font-semibold">sample_name</span>

        <TextareaAutosize
          {...register("content")}
          className="w-full resize-none outline-none mt-1"
          placeholder="What's on your mind?"
          minRows={1}
          maxRows={10}
          ref={(e) => {
            register("content").ref(e);
            textareaRef.current = e;
          }}
        />
        {errors.content && (
          <span role="alert" className="text-sm text-red-500 mt-1">
            {errors.content.message?.toString()}
          </span>
        )}

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-3 text-gray-600 mt-2">
          <Button type="button" variant="ghost" size="icon" className="hover:text-black">
            <IoImageOutline />
          </Button>

          <Popover
            open={isPickerOpen}
            onOpenChange={(open) => {
              setIsPickerOpen(open);
              // When closing via trigger/outside/Escape, return focus to textarea.
              if (!open) {
                setTimeout(() => textareaRef.current?.focus(), 0);
              }
            }}
          >
            <PopoverTrigger asChild>
              <Button
                ref={smileyBtnRef}
                type="button"
                variant="ghost"
                size="icon"
                className="hover:text-black"
                aria-label="Insert emoji"
              >
                <GoSmiley />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              side="top"
              sideOffset={-100}
              alignOffset={50}
              collisionPadding={8}
              className="p-0 border-none"
            >
              <EmojiPicker
                // Disable internal click-outside so the Popover owns open/close behavior
                disableOutsideClose
                className="w-72 rounded-xl border bg-white p-2 shadow-lg ring-1 ring-black/5"
                onSelect={(emoji) => {
                  handleEmojiInsert(emoji);
                }}
                onClose={() => setIsPickerOpen(false)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
