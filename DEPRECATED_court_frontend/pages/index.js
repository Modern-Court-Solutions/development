import Layout from "../components/Layout";

import Dashboard from "../components/Dashboard";

export const getStaticProps = () => {
  const COURT_NAME = process.env.COURT_NAME;
  return {
    props: {
      COURT_NAME,
    },
  };
};

export default function Home({ COURT_NAME }) {
  return (
    <>
      <Layout title="test" COURT_NAME={COURT_NAME}>
        <Dashboard />
      </Layout>
    </>
  );
}
