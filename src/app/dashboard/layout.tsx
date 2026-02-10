import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Uploads from "./_components/uploads/page";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="bg-slate-100 h-screen">
      <Uploads />
    </div>
  );
};

export default DashboardLayout;
