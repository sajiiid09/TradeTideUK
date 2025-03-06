"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  code?: number;
  message?: string;
  description?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = 404,
  message = "Page Not Found",
  description = "Oops! The page you're looking for doesn't exist.",
}) => {
  const router = useRouter();
  const [isRotating, setIsRotating] = useState(false);

  const handleRetry = () => {
    setIsRotating(true);
    router.refresh();
    setTimeout(() => {
      setIsRotating(false);
      router.refresh();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 opacity-50 animate-pulse"></div>
        <div className="relative z-10">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{code}</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {message}
          </h2>
          <p className="text-gray-600 mb-8">{description}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <RefreshCw
              className={`inline-block mr-2 ${isRotating ? "animate-spin" : ""}`}
            />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
