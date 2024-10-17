import { useFormik } from "formik";
import { useCreateTweet } from "@/lib/hooks/useCreateTweet";

interface TweetFormValues {
  content: string;
  images: ImageObject[];
  replyToId?: number;
}
interface ImageObject {
  file: File;
  preview: string;
}
interface UseTweetFormLogicProps {
  onSuccess?: () => void;
  id?: number;
}

function useTweetFormLogic({ id, onSuccess }: UseTweetFormLogicProps) {
  const { mutateAsync: createTweet } = useCreateTweet();

  const formik = useFormik<TweetFormValues>({
    initialValues: {
      content: "",
      images: [],
      replyToId: id ? id : undefined,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id !== undefined) {
          values.replyToId = id;
        }

        const formData = new FormData();
        formData.append("content", values.content);
        if (values.replyToId) {
          formData.append("replyToId", values.replyToId.toString());
        }

        values.images.forEach((imageObject, index) => {
          formData.append("file", imageObject.file);
        });

        await createTweet(formData);

        resetForm();

        onSuccess?.();
        onSuccess?.();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newImages: ImageObject[] = [];

      Array.from(files).forEach((file: File) => {
        if (file.type.startsWith("image/") && formik.values.images.length < 4) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const url = reader.result as string;
            // Add the image file and its preview URL to the array
            newImages.push({ file, preview: url });
            formik.setFieldValue("images", [
              ...formik.values.images,
              ...newImages,
            ]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  return { formik, handleFileInputChange };
}

export default useTweetFormLogic;
