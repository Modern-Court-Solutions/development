import CourtCaseCard from "../../../components/partials/CourtCaseCard";
import { getData } from "../../../functions/getData";

type Props = {
  cases: Case[];
  jwt: string;
};

const CourtCasesView = ({ cases, jwt }: Props) => {
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
    return {
      redirect: {
        permanent: false,
        destination: "/admin/authentication/login",
      },
    };
  }
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
      cases: courtCases.results,
      jwt: jwt,
    },
  };
}
