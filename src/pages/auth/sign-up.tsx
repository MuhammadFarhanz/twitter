import AuthCommon from "@/components/login/auth";
import { signupValidationSchema } from "@/validation/auth-validatoin";

export default function SignUpPage() {
  return (
    <>
      <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <AuthCommon
          title="Create an account"
          description="Enter your email and password to sign up"
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          isSignUp={true}
          validationSchema={signupValidationSchema}
          showAdditionalContent={false}
        />
      </div>
    </>
  );
}
