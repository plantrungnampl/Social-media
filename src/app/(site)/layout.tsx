// import { validateRequest } from "@/auth";
// import { redirect } from "next/navigation";
// import SessionProvider from "./sessionProvider";

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await validateRequest();
//   if (!session.user) redirect("/login");
//   return (
//     <SessionProvider value={session}>
//       <div>{children}</div>
//     </SessionProvider>
//   );
// }
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./sessionProvider";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { Rightbar } from "../../components/Rightbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 ml-16 lg:ml-64 mr-64 transition-all duration-300 ease-in-out">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
          <Rightbar />
        </div>
      </div>
    </SessionProvider>
  );
}
