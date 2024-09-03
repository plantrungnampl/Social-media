import React from "react";
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { CheckCircle, XCircle } from "lucide-react";
interface ToastProps {
  title: string;
  description: string;
  variant: string;
}
export const EnhancedToast: React.FC<ToastProps> = ({
  title,
  description,
  variant = "default",
}) => (
  <Toast
    className={`
  ${variant === "destructive" ? "bg-red-100" : "bg-green-100"} 
  border-l-4 
  ${variant === "destructive" ? "border-red-500" : "border-green-500"}
  p-0 m-0 overflow-hidden
`}
  >
    <div className="flex items-center p-4">
      {variant === "destructive" ? (
        <XCircle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
      ) : (
        <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
      )}
      <div>
        <h3
          className={`${
            variant === "destructive" ? "text-red-800" : "text-green-800"
          } font-semibold`}
        >
          {title}
        </h3>
        <p
          className={`${
            variant === "destructive" ? "text-red-600" : "text-green-600"
          } text-sm`}
        >
          {description}
        </p>
      </div>
    </div>
  </Toast>
);
