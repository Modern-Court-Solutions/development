import { useEffect } from "react";
import CourtCaseCard from "../../../components/partials/CourtCaseCard";
import { fetchData } from "../../../lib/loginApi";

type Props = {
  cases: Case[];
  jwt: string;
};

const CourtCasesView = ({ cases, jwt }: Props) => {
  useEffect(() => {
    console.log(cases);
  }, []);
  if (cases && cases.length) {
    return (
      <div className="w-full h-full flex items-center flex-col">
        <h1 className="py-6 text-3xl -ml-16">Current Cases</h1>
        <div className="w-fit max-h-[76vh] pr-6 flex flex-col items-center overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-400">
          <CourtCaseCard cases={cases} />
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

export default CourtCasesView;

export async function getServerSideProps(context: any) {
  const jwt = context.req.cookies.jwt || null;
  if (!jwt) {
    console.log("redirecting");
    return {
      redirect: {
        permanent: false,
        destination: "/admin/authentication/login",
      },
    };
  }
  const courtCases = await fetchData(
    `http://127.0.0.1:8000/basic_court/api/cases/?status=3`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${jwt}`,
      },
    }
  );

  console.log(courtCases);
  return {
    props: {
      cases: courtCases.results,
      jwt: jwt,
    },
    revalidate: process.env.REVALIDATE_SECONDS,
  };
}
