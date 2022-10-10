import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";

type pageProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: pageProps) => {
  const route = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.asPath) setTimeout(() => setLoading(false), 100);
  }, [route.asPath]);

  if (loading) {
    return (
      <div className="w-screen h-screen text-3xl justify-center items-center">
        Loading...
      </div>
    );
  }
  if (route.asPath === "/admin/authentication/login") {
    return <div className="h-screen w-screen">{children}</div>;
  }
  if (route.asPath !== "/admin/authentication/login" && !loading) {
    return (
      <div className="h-screen w-screen overflow-hidden">
        <div className="h-16 absolute">
          <Navbar username={"Rob"} />
        </div>
        <div className="bg-slate-200 flex content h-full">
          <Sidebar />
          {children}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Layout;
