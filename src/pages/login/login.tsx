import { useContext } from "react";
import { Container, Row, Col, Card, Form, FloatingLabel, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn, error, isLoading } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    await signIn(data);
  }

  return (
    <Container className="py-5 h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xl={5} lg={6} md={8} sm={12}>
          <Card style={{ borderRadius: "1rem" }} bg="dark" text="light">
            <Card.Body className="p-5 text-center">
              <div className="mb-md-3 mt-md-4 pb-5">
                <Form onSubmit={handleSubmit(handleSignIn)}>
                  <Card.Title className="fw-bold mb-2 text-uppercase">Philanthropic Manager</Card.Title>
                  <Card.Text className="text-white-50 mb-5">Please enter your login and password!</Card.Text>
                  <FloatingLabel controlId="username" label="Username" className="mb-4 text-black">
                    <Form.Control
                      {...register("username")}
                      name="username"
                      type="text"
                      required
                      placeholder="Username"
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="password" label="Password" className="mb-4 text-black">
                    <Form.Control
                      {...register("password")}
                      name="password"
                      type="password"
                      required
                      placeholder="Password"
                    />
                  </FloatingLabel>
                  {error && <Card.Text className="text-danger text-center">{error}</Card.Text>}
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Button variant="outline-light" size="lg" disabled={isLoading} className="px-5" type="submit">
                      {isLoading ? (
                        <Spinner animation="border" size="sm" role="status"></Spinner>
                      ) : (
                        <span role="status" aria-hidden="true">
                          Login
                        </span>
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
