export const handleFileChange = (files: FileList | null, formik: any) => {
  if (files && files.length > 0) {
    const newImages = Array.from(files).filter(
      (file: File, index) =>
        index < 4 &&
        file.type.startsWith("image/") &&
        formik.values.images.length < 4
    );

    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        formik.setFieldValue("images", [...formik.values.images, url]);
      };
      reader.readAsDataURL(file);
    });
  }
};
