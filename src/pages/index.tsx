import type { NextPage } from "next";
import Login from "./login/login";

const Home: NextPage = () => {
  return (
    <section className="vh-100 bg-secondary bg-gradient">
      <Login />
    </section>
  );
};

export default Home;
