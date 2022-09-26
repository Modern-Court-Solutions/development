import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";
// import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GavelIcon from "@mui/icons-material/Gavel";
import SettingsIcon from "@mui/icons-material/Settings";
import TodayIcon from "@mui/icons-material/Today";
import WorkIcon from "@mui/icons-material/Work";
import Link from "next/link";
import Router from "next/router";

const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  Router.push("/admin/authentication/login");
};

const SidebarRoutes = () => {
  return (
    <div className="w-full h-screen flex flex-col ">
      <Link href="/admin/dashboard" className="">
        <div className="sideBarContainer">
          <DashboardIcon className="sideBarIcon" />
          <span className="sideBarText"> Dashboard</span>
        </div>
      </Link>
      <Link href="/admin/cases" className="">
        <div className="sideBarContainer">
          <WorkIcon className="sideBarIcon" />
          <span className="sideBarText"> Cases </span>
        </div>
      </Link>
      <Link href="/admin/calendar" className="">
        <div className="sideBarContainer">
          <TodayIcon className="sideBarIcon" />
          <span className="sideBarText"> Calendar </span>
        </div>
      </Link>
      <Link href="/admin/attorney" className="">
        <div className="sideBarContainer">
          <PeopleIcon className="sideBarIcon" />
          <span className="sideBarText"> Attorneys </span>
        </div>
      </Link>
      <Link href="/admin/judge" className="">
        <div className="sideBarContainer">
          <GavelIcon className="sideBarIcon" />
          <span className="sideBarText"> Judges </span>
        </div>
      </Link>
      <Link href="/admin/staff" className="">
        <div className="sideBarContainer">
          <AccountBoxIcon className="sideBarIcon" />
          <span className="sideBarText"> Staff </span>
        </div>
      </Link>
      <Link href="/admin/archived-cases" className="">
        <div className="sideBarContainer">
          <LayersIcon className="sideBarIcon" />
          <span className="sideBarText"> Archived Cases </span>
        </div>
      </Link>
      <Link href="/admin/reports" className="">
        <div className="sideBarContainer">
          <BarChartIcon className="sideBarIcon" />
          <span className="sideBarText"> Reports </span>
        </div>
      </Link>

      <Link href="/admin/settings" className="">
        <div className="sideBarContainer">
          <SettingsIcon className="sideBarIcon" />
          <span className="sideBarText"> Settings </span>
        </div>
      </Link>
      <div onClick={logout} className="border border-y-gray-900">
        <div className="sideBarContainer hover:bg-gray-300">
          <ExitToAppIcon className="sideBarIcon" />
          <span className="sideBarText"> Logout </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarRoutes;
