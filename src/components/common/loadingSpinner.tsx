import type React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  );
};

const LoadingSpinnerLayout: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black to-violet min-h-screen z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export { LoadingSpinner, LoadingSpinnerLayout };
