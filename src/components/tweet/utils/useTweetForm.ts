import { useFormik } from "formik";
import { useCreateTweet } from "@/lib/hooks/useCreateTweet";
import { handleFileChange } from "./handleChangeFile";

interface TweetFormValues {
  content: string;
  images: string[];
  replyToId?: number;
}

interface UseTweetFormLogicProps {
  onSuccess?: () => void;
  id?: number;
}

function useTweetFormLogic({ id, onSuccess }: UseTweetFormLogicProps) {
  const { mutateAsync: createTweet, isSuccess } = useCreateTweet();

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
        console.log(values);
        await createTweet(values);

        resetForm();
        onSuccess?.();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const handleFileInputChange = async (e: any) => {
    handleFileChange(e.target.files, formik);
  };

  return { formik, handleFileInputChange };
}

export default useTweetFormLogic;
