import {
  APP_DESCRIPTION,
  APP_KEYWORDS,
  APP_NAME,
  APP_TWITTER_HANDLE,
} from "@/constants/app.constant";
import type { Metadata } from "next";

type TAuthorHref = {
  name: string;
  url: string;
};
type TMetaDataProps = {
  title?: string;
  appName?: string;
  description?: string;
  keywords?: string[];
  authors?: TAuthorHref[];
  creator?: string;
  url?: string;
  type?: string;
  locale?: string;
  icon?: string;
  cover?: string;
  twitterAccount?: string;
  twitterHandle?: string;
};
const NextHead = ({
  title,
  description,
  appName,
  keywords,
  authors,
  creator,
  url,
  locale,
  twitterAccount,
  twitterHandle,
}: TMetaDataProps): Metadata => {
  return {
    title: title ? `${title} | ${APP_NAME}` : APP_NAME,
    description: description ?? APP_DESCRIPTION,
    keywords: keywords ?? APP_KEYWORDS,
    authors: authors ?? [
      { name: "Tareq Mahmood", url: "https://test.vercel.app" },
    ],
    creator: creator ?? "Your Name",
    openGraph: {
      title: title ?? APP_NAME,
      description: description ?? APP_DESCRIPTION,
      url: url ?? "https://bookolia.vercel.app",
      siteName: appName ?? APP_NAME,
      locale: locale ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? APP_DESCRIPTION,
      description: description ?? APP_DESCRIPTION,
      site: twitterAccount ?? APP_TWITTER_HANDLE,
      creator: twitterHandle ?? "@yourtwitterhandle",
    },
    robots: "index, follow",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
};

export default NextHead;
