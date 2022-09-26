import { useState } from "react";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setSidebarOpen(true);
      }}
      onMouseLeave={() => {
        setSidebarOpen(false);
      }}
      className="  h-full overflow-x-hidden border-r-1 border-gray-300 shadow-xl"
    >
      <div className="flex flex-col w-16 hover:w-64 h-full bg-gray-200 transition-all duration-500 ">
        <div className="flex  justify-center h-full min-h-[676px] border-b">
          <SidebarRoutes />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
