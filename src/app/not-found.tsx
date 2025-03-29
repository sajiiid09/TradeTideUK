import Link from "next/link";
import NotFoundSvg from "@/assets/404-not-found.svg";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-[50vh] my-[10vh]">
      <h2 className="text-xl text-left font-bold mb-2">
        The page you were looking for was not found
      </h2>
      <p className="text-md mb-2">Could not find requested resource</p>
      <img
        src={NotFoundSvg.src}
        alt="404 not found"
        height={300}
        width={300}
        className="mb-4"
      />
      {/* <Link href="/">Return Home</Link> */}
      <Link
        href="/"
        className="text-xl text-blue-800 hover:text-blue-500 duration-300 underline hover:underline hover:underline-offset-2"
      >
        {" "}
        ← Return Home
      </Link>
    </div>
  );
}
