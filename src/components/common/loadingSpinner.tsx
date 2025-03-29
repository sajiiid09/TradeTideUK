import type React from "react";

const LoadingSpinner = ({ size }: { size?: number }) => {
  const spinnerSize = size ?? 32;
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full h-${spinnerSize} w-${spinnerSize} border-t-2 border-b-2 border-gray-900`}
      ></div>
    </div>
  );
};

const LoadingSpinnerLayout: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br min-h-screen z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-16 border-green-900"></div>
    </div>
  );
};

export { LoadingSpinner, LoadingSpinnerLayout };
