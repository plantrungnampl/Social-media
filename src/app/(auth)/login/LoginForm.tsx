// "use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { LoginValues, loginSchema } from "@/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import React, { useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { Login as LoginActions } from "./actions";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { LoadingButton } from "@/components/LoadingButton";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


// export const LoginForm = () => {
//   const [error, setError] = useState<string>();
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<LoginValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   async function onSubmit(values: LoginValues) {
//     setError(undefined);
//     startTransition(async () => {
//       const { error } = await LoginActions(values);
//       if (error) setError(error);
//     });
//   }
//   return (
//     <>
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-center text-2xl font-bold">
//               Log in to social media
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4"
//               >
//                 <FormField
//                   control={form.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Username</FormLabel>
//                       <FormControl>
//                         <Input placeholder="username" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {error && (
//                   <Alert variant="destructive" className="mb-4">
//                     <ExclamationTriangleIcon className="h-4 w-4" />
//                     <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//                 )}
//                 <LoadingButton
//                   type="submit"
//                   className="w-full"
//                   loading={isPending}
//                 >
//                   Login
//                 </LoadingButton>
//               </form>
//             </Form>
//             <div className="mt-4 text-center">
//               <Link
//                 href="/forgot-password"
//                 className="text-blue-600 hover:underline text-sm"
//               >
//                 Forgotten password?
//               </Link>
//             </div>
//           </CardContent>
//           <Separator className="my-4" />
//           <CardFooter className="flex justify-center">
//             <Link
//               href={"/register"}
//               className="text-blue-600 hover:underline text-sm"
//             >
//               Create New Account
//             </Link>
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   );
// };
"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValues, loginSchema } from "@/validation";
import Link from "next/link";
import { Login as LoginActions } from "./actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { LoadingButton } from "@/components/LoadingButton";
import { Separator } from "@/components/ui/separator";
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Make sure to install react-icons

export const LoginForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await LoginActions(values);
      if (error) setError(error);
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Welcome Back</CardTitle>
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
                      <Input placeholder="Enter your username" {...field} className="rounded-full" />
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
                      <Input type="password" placeholder="Enter your password" {...field} className="rounded-full" />
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
              <LoadingButton type="submit" className="w-full rounded-full" loading={isPending}>
                Log In
              </LoadingButton>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <Button variant="outline" className="w-full rounded-full" onClick={() => {}}>
              <FaGoogle className="mr-2" /> Continue with Google
            </Button>
            <Button variant="outline" className="w-full rounded-full" onClick={() => {}}>
              <FaGithub className="mr-2" /> Continue with GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
          Don&#39;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};