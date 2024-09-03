// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Home, Bell, MessageCircle, Menu } from "lucide-react";

// const sidebarItems = [
//   { icon: Home, label: "Home", href: "/" },
//   { icon: Bell, label: "Notifications", href: "/notifications" },
//   { icon: MessageCircle, label: "Messages", href: "/messages" },
// ];

// export function Sidebar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="fixed bottom-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg"
//         onClick={toggleSidebar}
//       >
//         <Menu size={24} />
//       </button>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition duration-200 ease-in-out z-50 w-64 bg-white shadow-lg md:sticky md:top-16 md:h-[calc(100vh-4rem)]`}
//       >
//         <nav className="px-4 py-6">
//           <ul className="space-y-2">
//             {sidebarItems.map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
//                     pathname === item.href ? "bg-gray-100" : ""
//                   }`}
//                 >
//                   <item.icon className="w-6 h-6 mr-3 text-gray-500" />
//                   <span className="text-gray-700">{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </>
//   );
// }
"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Bell, MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="fixed left-0 flex flex-col w-16 lg:w-64 bg-white shadow-lg transition-all duration-300 ease-in-out h-[calc(100vh-4rem)]">
      <nav className="flex-1  px-2 py-4 lg:px-4 ">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                        pathname === item.href ? "bg-gray-100" : ""
                      }`}
                    >
                      <item.icon className="w-6 h-6 text-gray-500" />
                      <span className="hidden lg:block ml-3 text-gray-700">
                        {item.label}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="lg:hidden">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
