import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import PostingToast from "@/components/common/PostingToast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddPostForm from "@/features/post/components/AddPostForm";
import { POST_VISIBILITY } from "@/features/post/constant";
import { createPostSchema } from "@/features/post/validation/createPostSchema";
import type { CreatePostCommand } from "@/features/post/validation/createPostSchema";

export default function AddPostModal({
  isOpen,
  onClose,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>) {
  const methods = useForm<CreatePostCommand>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      visibility: "PUBLIC_ALL",
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

  const onSubmit = (data: CreatePostCommand) => {
    console.log("Submitted", data);
    setIsPosting(true);

    // Simulate a network request
    setTimeout(() => {
      setIsPosting(false);
    }, 4000);

    reset({
      content: "",
      visibility: POST_VISIBILITY.PUBLIC_ALL,
      media: [],
    });
    onClose();
  };

  return (
    <>
      {/* Spinner overlay */}
      <PostingToast show={isPosting} />

      <Dialog open={isOpen} onOpenChange={onClose}>
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
                  <Button variant="ghost" size="sm" className="absolute right-1" onClick={onClose}>
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
    </>
  );
}
