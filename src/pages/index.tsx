import type { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { Container } from "react-bootstrap";
import Login from "./login/login";

const Home: NextPage = () => {
  return (
    <Container>
      <Login />
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "philanthropicManager.token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
