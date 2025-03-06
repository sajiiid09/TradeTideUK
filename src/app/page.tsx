import { APP_NAME } from "@/constants/app.constant";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-black to-violet p-4 min-h-screen text-white">
      <main className="w-full max-w-4xl text-center">
        <h1 className="mb-6 font-bold text-6xl">{APP_NAME}</h1>
        <p className="mb-12 text-xl">
          Your personal book collection, curated and shared.
        </p>
        <div className="flex justify-center space-x-6">
        </div>
      </main>
      <footer className="mt-16 text-gray-400 text-sm">
        © 2025 {APP_NAME}. All rights reserved.
      </footer>
    </div>
  );
}
