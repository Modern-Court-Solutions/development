import "../styles/globals.css";
import GlobalCssPriority from "../components/GlobalCssPriority";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <GlobalCssPriority>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </GlobalCssPriority>
  );
}

export default MyApp;
