import React, { useEffect, useReducer, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { CustomIcon } from "../ui/custom-icon";
import Background from "../../../public/assets/default_profile_400x400.png";
import { useFormik } from "formik";
import { Input } from "../ui/input";
import { useDialogStore } from "@/lib/store/dialog";
import { useUpdateUser } from "@/lib/hooks/useUpdateUser";
import { useGetUser } from "@/lib/hooks/useGetUser";

function StepOne({ formik, handleFileChange, setStep }: any) {
  return (
    <>
      <div className="flex items-center justify-center h-4 sm:h-14">
        <CustomIcon iconName="TwitterIcon" />
      </div>

      <div className="sm:h-20 h-10 mt-4">
        <p className="sm:text-3xl  text-2xl font-bold text-main-primary">
          Pick a profile picture
        </p>
        <p className="text-xs text-dark-secondary">
          Have a favourite selfie? Upload it now.
        </p>
      </div>

      <div className=" h-full flex items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="relative">
          <img
            src={
              formik.values.profile_pic instanceof File
                ? URL.createObjectURL(formik.values.profile_pic)
                : formik.values.profile_pic || Background.src
            }
            alt="Profile Picture"
            className="h-44 w-44 bg-black rounded-full relative flex justify-center items-center object-cover"
          />
          <label
            htmlFor="file-input"
            className="bg-light-primary outline-none h-10 w-10 rounded-full flex justify-center items-center cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <CustomIcon
              iconName="AddphotoIcon"
              className="fill-white w-6 h-6"
            />
          </label>
          <input
            className="hidden"
            type="file"
            accept="images/*"
            name="profile_pic"
            id="file-input"
            onChange={handleFileChange}
          />
        </form>
      </div>

      <div className="h-20 flex items-center justify-center">
        <button
          onClick={() => setStep(2)}
          className="w-full hover:bg-dark-secondary/10 rounded-full h-12 border border-dark-border/10 outline-none"
        >
          <p className="font-bold">
            {formik.values.profile_pic ? "Next" : "Skip for now"}
          </p>
        </button>
      </div>
    </>
  );
}

function StepTwo({ formik }: any) {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" border-black h-full overflow-hidden flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-center h-4 sm:h-14">
          <CustomIcon iconName="TwitterIcon" />
        </div>

        <div className="h-20 mt-4">
          <p className="sm:text-3xl text-2xl font-bold text-main-primary">
            What should we call you?
          </p>
          <p className="text-sm text-dark-secondary mt-2">
            Your @username is unique. You can always change it later.
          </p>
        </div>

        <div className=" flex mt-2 sm:mt-4">
          <div className="relative w-full ">
            <label className="w-full rounded-md p-2  flex flex-col border-blue-400 border-2 outline-none ">
              <span className="text-blue-400 text-xs">Username</span>
              <div className="flex flex-row">
                <p className="text-blue-400 flex-none">@</p>
                <div className="flex-grow">
                  <Input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    // placeholder="Enter your name"
                    className="border-1 h-6 font-medium text-lg rounded-none p-1 w-full focus-visible:ring-0 "
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="h-20 flex items-center justify-center">
        <button
          type="submit"
          className="w-full hover:bg-dark-secondary/10 rounded-full h-12 border border-dark-border/10 outline-none"
        >
          <p className="font-bold">Next</p>
        </button>
      </div>
    </form>
  );
}

function MultistepForm({ isOpen }: any) {
  const [step, setStep] = useState(1);
  const { refetch } = useGetUser();
  const { closeDialog } = useDialogStore();
  const { mutateAsync, isSuccess } = useUpdateUser({
    onSuccess: () => {
      closeDialog();
      refetch();
    },
  });

  const formik = useFormik({
    initialValues: {
      profile_pic: Background.src,
      name: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      if (values.profile_pic) {
        formData.append("profile_pic", values.profile_pic);
      }
      formData.append("name", values?.name);

      mutateAsync(formData);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];

      formik.setFieldValue("profile_pic", file);
    }
  };

  return (
    <div className="fixed">
      <Dialog open={isOpen}>
        <DialogContent className="bg-light w-[90%] rounded-md max-w-[550px]  text-black h-[65%] border-0 top-[15%] flex flex-col sm:px-16 border-none outline-none">
          {step === 1 && (
            <StepOne
              formik={formik}
              handleFileChange={handleFileChange}
              setStep={setStep}
            />
          )}
          {step === 2 && <StepTwo formik={formik} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MultistepForm;
