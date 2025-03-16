import type { Metadata } from "next";

type TAuthorHref = {
  name: string;
  url: string;
};
type TMetaDataProps = {
  title: string;
  appName: string;
  description: string;
  keywords: string[];
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
    title: title ?? "Bookolia - Showcase Your Book Portfolios",
    description:
      description ??
      "Bookolia is a platform where users can create and share their book portfolios. Join using Google and explore a wide range of book collections curated by the community.",
    keywords: keywords ?? [
      "bookolia",
      "book portfolio",
      "book sharing platform",
      "google sign-in",
      "book collection",
      "online book portfolios",
    ],
    authors: authors ?? [
      { name: "Tareq Mahmood", url: "https://test.vercel.app" },
    ],
    creator: creator ?? "Your Name",
    openGraph: {
      title: title ?? "Bookolia - Showcase Your Book Portfolios",
      description:
        description ??
        "Bookolia is a platform where users can create and share their book portfolios. Join using Google and explore a wide range of book collections curated by the community.",
      url: url ?? "https://bookolia.vercel.app",
      siteName: appName ?? "Bookolia",
      locale: locale ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? "Bookolia - Showcase Your Book Portfolios",
      description:
        description ??
        "Bookolia is a platform where users can create and share their book portfolios. Join using Google and explore a wide range of book collections curated by the community.",
      site: twitterAccount ?? "@bookolia",
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
