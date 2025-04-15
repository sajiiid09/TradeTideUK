"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getOneUserIfProfileExists } from "@/lib/repositories/profile.repository";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function UserProfileProvider() {
  const { data: session } = useSession();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const pathname = usePathname();
  const [count, setCount] = React.useState<number>(0);
  React.useEffect(() => {
    async function profileCallback(id: string) {
      if (getLocalStorage("profile")) {
        return null;
      }
      if (!getLocalStorage("profile") && count < 2) {
        setCount(count + 1);
        return await getOneUserIfProfileExists({ id });
      }
    }
    if (session) {
      profileCallback(session?.user?.id as string)
        .then(res => {
          if (res && res?.data?.profiles && res.data.profiles.length > 0) {
            console.log(res.data.profiles[0], "where is this?");
            // setLocalStorage("profile", JSON.stringify(res.data.profiles[0]));
          }
          if (
            res &&
            res.data?.profiles.length === 0 &&
            !pathname.includes("onboard")
          ) {
            toast(() => (
              <>
                You don&apos;t have a profile yet, creating one allows you to
                checkout and buy products! &nbsp;
                <a
                  href="/user/onboard"
                  target="_blank"
                  className="text-blue-500 hover:underline underline hover:text-blue-700 duration-200"
                >
                  Click here to create one!
                </a>
              </>
            ));
          }
        })
        .catch(err => {
          console.log(err);
          toast.error("There was an issue retrieving the profile");
        });
    }
  }, [count, getLocalStorage, pathname, session, setLocalStorage]);
  return <></>;
}
