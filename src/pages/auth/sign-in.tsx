import AuthCommon from "@/components/login/auth";
import { signinValidationSchema } from "@/validation/auth-validatoin";

export default function SignInPage() {
  return (
    <>
      <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <AuthCommon
          title="Sign in"
          description="Enter your email and password to login"
          initialValues={{
            email: "",
            password: "",
          }}
          isSignUp={false}
          validationSchema={signinValidationSchema}
          showAdditionalContent={true}
        />
      </div>
    </>
  );
}
