import "../styles/globals.css";
import type { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { AuthProvider } from "../contexts/AuthContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <>
        <Head>
          <title>Philanthropic Manager</title>
        </Head>
        <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    </AuthProvider>
  );
}

export default MyApp;
