import CurrentCourtCases from "../../../components/partials/CurrentCourtCases";
import { courtCases } from "../../../data/courtCases";

type Props = {
  cases: Case[];
};

const Dashboard = ({ cases }: Props) => {
  return (
    <div className="w-full h-full flex items-center flex-col">
      <h1 className="py-6 text-3xl -ml-16">Current Cases</h1>
      <div className="w-fit max-h-[76vh] pr-6 flex flex-col items-center overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-400">
        <CurrentCourtCases cases={cases} />
      </div>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(context: any) {
  return {
    props: {
      cases: courtCases,
    },
  };
}
