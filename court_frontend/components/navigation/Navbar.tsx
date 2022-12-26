import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  username: string;
};

const Navbar = ({ username }: Props) => {
  const route = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    try {
      setTitle(route.asPath.split("/")[2].replace("-", " "));
    } catch (e) {
      route.replace("/admin/dashboard");
    }
  }, [route]);

  return (
    <div className=" h-full flex items-center bg-blue-600 text-white text-3xl tracking-wider shadow-2xl border-b border-blue-300">
      <h1 className="hidden md:block absolute left-4 text-2xl">
        {process.env.NEXT_PUBLIC_COURT_NAME}
      </h1>
      <div className="w-screen z-10 flex justify-center">
        <h3 className="capitalize">{title}</h3>
      </div>
      {username && (
        <div className="hidden sm:block z-10 right-4 absolute text-lg">
          <span>{username}</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
