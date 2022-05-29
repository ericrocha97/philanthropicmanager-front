import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Menu from "../../components/menu";
import { Container, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Menu />
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center">
          <Col>
            <p>Dashboard</p>
            <p>
              Welcome <strong>{user?.member?.name || "User"}</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "philanthropicManager.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
