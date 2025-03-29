import { Metadata } from "next";
import NextHead from "@/components/common/metaData";

import LoginPage from "./_component";

export const metadata: Metadata = NextHead({
  title: "Login",
});

export default function Login() {
  return <LoginPage />;
}
