import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { useCreateUser } from "@/api/useCreateUser";
import { useLoginUser } from "@/api/useLoginUser";
import { useRouter } from "next/router";
import Background from "../../../public/assets/twitter-banner.png";
import { useDialogStore } from "@/lib/store/dialog";

interface AuthCommonProps {
  title: string;
  description: string;
  initialValues: any;
  isSignUp: boolean;
  validationSchema: any;
  showAdditionalContent: boolean;
}

export default function AuthCommon({
  title,
  description,
  initialValues,
  isSignUp,
  validationSchema,
  showAdditionalContent,
}: AuthCommonProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { openDialog } = useDialogStore();
  const router = useRouter();

  const { mutateAsync: loginUser, isPending: isLoginUserPending } =
    useLoginUser({
      onSuccess: () => {
        router.push("/home");
      },
    });

  const { mutateAsync: createUser, isPending: isCreateUserPending } =
    useCreateUser();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        if (isSignUp) {
          await createUser(values);

          const loginData = {
            email: values.email,
            password: values.password, // Assuming password is stored in form values
          };

          await loginUser(loginData);
          openDialog();
        } else {
          await loginUser(values);
        }

        resetForm();
      } catch (error: any) {
        if (error.response) {
          const { field, message } = error.response.data;
          setFieldError(field, message);
        }
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <div
        className="w-full h-full bg-cover relative hidden flex-col bg-muted p-10 text-white lg:flex"
        style={{
          backgroundImage: `url(${Background?.src})`,
        }}
      ></div>

      <div className="lg:p-8 bg-white h-full w-full items-center flex">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">{title}</CardTitle>
              <CardDescription className="text-center">
                {description}
              </CardDescription>
            </CardHeader>
            <form onSubmit={formik.handleSubmit}>
              <CardContent className="grid gap-4">
                {isSignUp && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder=""
                      name="username"
                      disabled={isCreateUserPending || isLoginUserPending}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={formik.errors.username}
                    />
                    {formik.errors.username && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.username as string}
                      </div>
                    )}
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder=""
                    name="email"
                    disabled={isCreateUserPending || isLoginUserPending}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                  />
                  {formik.errors.email && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email as string}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    showPassword={showPassword}
                    onTogglePasswordVisibility={() =>
                      setShowPassword(!showPassword)
                    }
                    type="password"
                    name="password"
                    disabled={isCreateUserPending || isLoginUserPending}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                  />
                  {formik.errors.password && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password as string}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isCreateUserPending || isLoginUserPending}
                >
                  {isCreateUserPending ||
                    (isLoginUserPending && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ))}
                  {isSignUp ? "Sign Up" : "Login"}
                </Button>
                {isSignUp && (
                  <p className="mt-2 text-xs text-center text-gray-700">
                    Already have an account?{" "}
                    <Link
                      href="/auth/sign-in"
                      className=" text-blue-600 hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                )}
              </CardFooter>
              {showAdditionalContent && (
                <>
                  <div className="relative mb-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 m-2">
                    <Button variant="outline">
                      {isCreateUserPending || isLoginUserPending ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                      )}
                      Github
                    </Button>
                    <Button variant="outline">
                      {isCreateUserPending || isLoginUserPending ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                      )}
                      Google
                    </Button>
                  </div>
                  <p className="mt-4 text-xs text-center mb-4 text-gray-700">
                    Don't have an account?
                    <Link
                      href="/auth/sign-up"
                      className=" text-blue-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </>
              )}
            </form>
          </Card>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
