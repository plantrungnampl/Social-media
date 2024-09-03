import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";
import { RegisterForm } from "./registerForm";
export const metadata: Metadata = {
  title: "Sign up",
};
const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Logo and tagline */}
      <div className="lg:flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-md lg:mx-0 lg:w-full lg:max-w-full lg:px-8">
          <h2 className="mt-6 text-center lg:text-left text-3xl sm:text-4xl font-extrabold text-blue-600">
            Social Media Project
          </h2>
          <p className="mt-2 text-center lg:text-left text-sm sm:text-xl text-gray-600">
            We helps you connect and share with the people in your life.
          </p>
        </div>
      </div>
      <div className="lg:flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        {/* Register form */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
