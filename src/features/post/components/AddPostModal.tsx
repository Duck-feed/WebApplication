import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddPostForm from "@/features/post/components/AddPostForm";
import { PostVisibility } from "@/features/post/constant";
import { createPostSchema } from "@/features/post/validation/createPostSchema";
import type { CreatePostCommand } from "@/features/post/validation/createPostSchema";
import { createPost } from "../api";
import type { AddPostModalProps } from "../types";

export default function AddPostModal({
  isOpen,
  onOpenChange,
  onClose,
  onPostCreated,
}: AddPostModalProps) {
  const setOpen = (open: boolean) => {
    if (onOpenChange) onOpenChange(open);
    else if (!open) onClose?.();
  };

  const methods = useForm<CreatePostCommand>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      visibility: PostVisibility.PUBLIC_ALL,
      media: [],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = methods;
  const [isPosting, setIsPosting] = useState(false);

  const isPostDisabled = !isValid || isSubmitting || isPosting;

  const onSubmit = async (data: CreatePostCommand) => {
    setIsPosting(true);
    setOpen(false);
    try {
      const result = await toast
        .promise(createPost(data), {
          loading: "Posting...",
          error: (e) => e?.message || "Something went wrong. Please try again.",
        })
        .unwrap();

      console.log("Post created:", result);

      onPostCreated?.();

      reset({
        content: "",
        visibility: PostVisibility.PUBLIC_ALL,
        media: [],
      });
    } catch (e) {
      if (e instanceof Error) {
        console.error("Failed to post", e.message);
      } else {
        console.error("Failed to post", e);
      }
      setOpen(true);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby="New post creation form"
        className="flex flex-col bg-white p-4 sm:max-w-[640px] sm:max-h-[90vh] sm:rounded-xl max-w-full max-h-screen"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
            {/* Header */}
            <DialogHeader className="flex flex-col items-center relative">
              <DialogTitle className="text-center mt-3">New post</DialogTitle>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogHeader>

            {/* Form Fields */}
            <AddPostForm />

            {/* Footer */}
            <div className="flex justify-end mt-3">
              <Button type="submit" disabled={isPostDisabled} variant="outline">
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
