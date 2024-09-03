"use client";

import React from "react";

interface ErrorMessageProps {
  error: unknown;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onRetry,
}) => (
  <div className="text-center text-red-500 p-4">
    An error occurred:{" "}
    {error instanceof Error ? error.message : "Unknown error"}
    <button
      onClick={onRetry}
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Try Again
    </button>
  </div>
);
