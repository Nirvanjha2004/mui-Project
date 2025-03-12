import React from "react";
import CardComp, { MagicCardDemo, NeonGradientCardDemo } from "./Card";
import Navbar from "./Navbar";
import { DataTableDemo } from "./LeaderBoard";
import { ProfileForm } from "./CreateTest";

function AdminDashboard() {
  return (
    <div>
      {/* <Navbar />
      <div className="flex mt-8 flex-wrap w-full justify-center items-center gap-4">
        <CardComp
          title="Total tests"
          description="2563"
          buttonText="Click Me"
          value="21%"
        />
        <CardComp
          title="Active Users"
          description="2563"
          buttonText="Click Me"
          value="21%"
        />
        <CardComp
          title="Total Referrals"
          description="2563"
          buttonText="Click Me"
          value="21%"
        />
        <CardComp
          title="Avg Completion Time"
          description="2563"
          buttonText="Click Me"
          value="21%"
        />
      </div>
      <div className="m-20 shadow border-2 p-4 rounded-xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Recent LeaderBoard
        </h1>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          Top performers from the last 30 days
        </blockquote>
        <DataTableDemo />
      </div> */}
      <ProfileForm/>
    </div>
  );
}

export default AdminDashboard;
