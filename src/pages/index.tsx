import { Inter } from "next/font/google";
import SignUpPage from "./auth/sign-up";
import Feed from "./posts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <SignUpPage />
      {/* <Feed /> */}
    </main>
  );
}
