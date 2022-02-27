import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Siepomaga live</title>
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
