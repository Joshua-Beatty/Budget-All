import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RiFileList3Line, RiSettings5Line, RiWallet3Line } from "react-icons/ri";
function Tabs({ children,  title  }: { children: any, title: string }) {
  const navigate = useNavigate();

  const tabs = [
    { name: "Budget", link: "/budget", icon: <RiWallet3Line  size={20}/>},
    { name: "Transactions", link: "/transactions", icon: <RiFileList3Line  size={20}/>},
    { name: "Settings", link: "/settings", icon: <RiSettings5Line size={20}/>},
  ];
  return (
    <div className="h-screen no-scrollbar">
      <div className="w-full h-[calc(100vh-10rem)] no-scrollbar">
        <div className="w-11/12 m-auto flex no-scrollbar flex-col justify-center items-center gap-1 pb-20">
            <h1 className="text-5xl font-extrabold mb-2 mt-10">{title}</h1>
          {children}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="h-full max-w-lg grid-cols-4 mx-auto font-medium flex justify-around">
          {tabs.map((x) => (
            <>
              <button
                type="button"
                className="inline-flex flex-grow flex-col items-center justify-center px-5 group"
                onClick={()=>{navigate(x.link)}}
              >
                {x.icon}
                <span className="text-sm text-white">
                  {x.name}
                </span>
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Tabs;
