import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { UserAvatar } from "@/components/common/UserAvatar";
import { IoImageOutline } from "react-icons/io5";
import { GoSmiley } from "react-icons/go";
import { Button } from "@/components/ui/button";

export default function AddPostForm() {
  const { register } = useFormContext();

  return (
    <div className="flex flex-row gap-1 w-full mt-2">
      <div className="flex flex-start mt-1 mb-2 mr-2">
        <UserAvatar
          src="https://ruinmyweek.com/wp-content/uploads/2020/09/the-is-for-me-meme-calls-out-history-greediest-villains-1.jpg"
          name="sample name"
          size="md"
        />
      </div>
      <div className="flex-1 mr-3 sm:mr-6 md:mr-12">
        <span className="font-semibold">sample_name</span>
        <TextareaAutosize
          {...register("content")}
          className="w-full resize-none outline-none"
          placeholder="What's on your mind?"
          minRows={1}
          maxRows={10}
        />
        <div className="flex items-center gap-3 mb-3 text-gray-600">
          <Button variant="ghost" size="icon" className="hover:text-black">
            <IoImageOutline />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-black">
            <GoSmiley />
          </Button>
        </div>
      </div>
    </div>
  );
}
