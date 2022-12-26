import { useEffect } from "react";
import CurrentCourtCases from "../../../components/partials/CurrentCourtCases";
import { fetchData } from "../../../lib/loginApi";

type Props = {
  cases: Case[];
};

const Dashboard = ({ cases }: Props) => {
  useEffect(() => {
    console.log("cases", cases);
  }, []);
  if (cases && cases.length) {
    return (
      <div className="w-full h-full flex items-center flex-col">
        <h1 className="py-6 text-3xl -ml-16">Current Cases</h1>
        <div className="w-fit max-h-[76vh] pr-6 flex flex-col items-center overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-400">
          <CurrentCourtCases cases={cases} />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-center flex-col">
      <h1 className="py-6 text-3xl -ml-16">Current Cases</h1>
      <div className="w-fit max-h-[76vh] pr-6 flex flex-col items-center overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-400">
        <p className="text-2xl">No Cases</p>
      </div>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(context: any) {
  const jwt = context.req.cookies.jwt || null;
  const courtCases = await fetchData(
    "http://127.0.0.1:8000/basic_court/api/cases/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${jwt}`,
      },
    }
  );
  return {
    props: {
      cases: courtCases,
    },
  };
}
