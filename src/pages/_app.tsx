import "../styles/globals.css";
import type { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
