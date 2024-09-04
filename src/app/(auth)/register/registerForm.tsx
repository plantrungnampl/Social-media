// "use client";

// import React, { useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signUpSchema, signupValues } from "@/validation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { Login as RegisterAction } from "./actions";
// import { LoadingButton } from "@/components/LoadingButton";

// export const RegisterForm = () => {
//   const [error, setError] = useState<string>();

//   const [isPending, startTransition] = useTransition();
//   const [isLoading, setIsLoading] = useState(false);
//   const form = useForm<signupValues>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       username: "",
//     },
//   });

//   async function onSubmit(values: signupValues) {
//     console.log(values);
//     setError(undefined);
//     startTransition(async () => {
//       const { error } = await RegisterAction(values);
//       if (error) setError(error);
//     });
//   }

//   return (
//     <div className="sm:mx-auto sm:w-full sm:max-w-md">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle className="text-center text-2xl font-bold">
//             Create a new account
//           </CardTitle>
//           <p className="text-center text-sm text-gray-600">
//             It's quick and easy.
//           </p>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Username</FormLabel>
//                     <FormControl>
//                       <Input placeholder="username" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="Email address"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <p className="text-xs text-gray-500">
//                 By clicking Sign Up, you agree to our Terms, Privacy Policy and
//                 Cookies Policy.
//               </p>
//               <LoadingButton
//                 type="submit"
//                 className="w-full"
//                 loading={isPending}
//               >
//                 Sign Up
//               </LoadingButton>
//             </form>
//           </Form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <Link href="/login" className="text-blue-600 hover:underline text-sm">
//             Already have an account?
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };
"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signupValues } from "@/validation";
import Link from "next/link";
import { Login as RegisterAction } from "./actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { LoadingButton } from "@/components/LoadingButton";
import { Separator } from "@/components/ui/separator";
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Make sure to install react-icons

export const RegisterForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<signupValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: signupValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await RegisterAction(values);
      if (error) setError(error);
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Choose a username" {...field} className="rounded-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} className="rounded-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a password" {...field} className="rounded-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <p className="text-xs text-gray-500">
                By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
              </p>
              <LoadingButton type="submit" className="w-full rounded-full" loading={isPending}>
                Sign Up
              </LoadingButton>
            </form>
          </Form>
          <Separator className="my-4" />
          <div className="space-y-4">
            <Button variant="outline" className="w-full rounded-full" onClick={() => {}}>
              <FaGoogle className="mr-2" /> Sign up with Google
            </Button>
            <Button variant="outline" className="w-full rounded-full" onClick={() => {}}>
              <FaGithub className="mr-2" /> Sign up with GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};