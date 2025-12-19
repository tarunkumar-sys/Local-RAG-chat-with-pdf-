import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Setting from "./_components/setting/page";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="bg-slate-100 h-screen">
      <Setting />
    </div>
  );
};

export default DashboardLayout;
