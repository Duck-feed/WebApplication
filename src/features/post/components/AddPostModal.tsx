import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddPostForm from "./AddPostForm";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import type { CreatePostCommand } from "../validation/createPostSchema";

export default function AddPostModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const methods = useForm<CreatePostCommand>({
    defaultValues: {
      content: "",
      visibility: "PUBLIC_ALL",
      media: [],
    },
  });

  const { handleSubmit, control } = methods;

  const content = useWatch({ control, name: "content" });
  const media = useWatch({ control, name: "media" });

  const isPostDisabled = !(content?.trim() || media?.length);

  const onSubmit = (data: CreatePostCommand) => {
    console.log("Submitted", data);
  };

  return (
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
  );
}
