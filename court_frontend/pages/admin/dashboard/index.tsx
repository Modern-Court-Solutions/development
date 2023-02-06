import useSWR from "swr";
import CourtCaseCard from "../../../components/partials/CourtCaseCard";
import { getData } from "../../../functions/getData";

type Props = {
  initialData: Case[];
  jwt: string;
  url: string;
};

const Dashboard = ({ initialData, jwt, url }: Props) => {
  const { data: cases, error: casesError } = useSWR(
    url,
    async () => await getData(url, jwt),
    {
      initialData,
      revalidateOnFocus: true,
      refreshInterval: 10000,
    }
  );

  if (cases && cases.results) {
    return (
      <div className="w-full h-full flex items-center flex-col">
        <h1 className="py-6 text-3xl -ml-16">Current Cases</h1>
        <div className="w-fit max-h-[76vh] pr-6 flex flex-col items-center overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-400">
          <CourtCaseCard cases={cases.results} />
        </div>
      </div>
    );
  }
  if (casesError) {
    return (
      <div className="w-full h-full flex items-center flex-col">
        <h1 className="py-6 text-3xl -ml-16">Current Cases</h1>
        <div className="w-fit max-h-[76vh] pr-6 flex flex-col items-center overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-400">
          <p className="text-2xl text-red-500">Error: {casesError}</p>
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
  if (!jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/authentication/login",
      },
    };
  }

  const key = "/api/cases/getDashboardCases";

  const courtCases = await getData(
    `${process.env.DB_URL}/cases/?status=3`,
    jwt
  );
  if (!courtCases)
    return {
      redirect: {
        permanent: false,
        destination: "/admin/authentication/login",
      },
    };
  return {
    props: {
      initialData: courtCases,
      jwt: jwt,
      url: key,
    },
  };
}
