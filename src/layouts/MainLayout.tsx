import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}
