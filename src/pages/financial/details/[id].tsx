import React, { useEffect, useState } from "react";
import { FinancialTypeMapper } from "../../../models/financialType";
import { FinancialDetailsMapper } from "../../../mappers/financialMapper";
import { GetServerSideProps } from "next";
import { getAPIClient } from "../../../services/axios";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import Menu from "../../../components/menu";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Modal } from "react-bootstrap";
import Router from "next/router";
import { api } from "../../../services/api";

interface FinancialDetailsProps {
  financialDetails: FinancialTypeMapper;
}

export default function FinancialDetails({ financialDetails }: FinancialDetailsProps) {
  const { register, handleSubmit } = useForm();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleEditSave(data: any) {
    await api.put(
      `/financial-entries/`,
      {
        description: data.description,
        type: data.type,
        date: data.date,
        value: data.value
      },
      {
        params: {
          id: financialDetails.id
        }
      }
    );
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  async function handleDelete() {
    await api.delete(`/financial-entries/`, {
      params: {
        id: financialDetails.id
      }
    });
    handleSendBack();
  }

  function handleSendBack() {
    Router.push("/financial/");
  }

  useEffect(() => {
    setDescription(financialDetails.description);
    setType(financialDetails.type);
    setDate(financialDetails.date);
    setValue(financialDetails.value);
  }, [financialDetails]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You will delete this record</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm that you want to delete this record!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Menu />
      <Container className="mt-3 h-100 ">
        <Row className="justify-content-center align-items-center h-100">
          <Col xl={10} lg={10} md={10} sm={10}>
            <Card style={{ borderRadius: "1rem" }} bg="dark" text="light">
              <Card.Body className="px-5 text-center">
                <Card.Title className="fw-bold my-2 " style={{ fontSize: "1.8rem" }}>
                  Financial Details
                </Card.Title>
                <div className="mt-4 pb-4 px-5">
                  <Form onSubmit={handleSubmit(handleEditSave)}>
                    <FloatingLabel controlId="description" label="Description" className="mb-4 text-black">
                      <Form.Control
                        {...register("description")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        type="text"
                        required
                        disabled={!isEditing}
                        placeholder="Description"
                      />
                    </FloatingLabel>
                    <FloatingLabel controlId="type" label="Type" className="mb-4 text-black">
                      <Form.Select
                        {...register("type")}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        disabled={!isEditing}>
                        <option>Select one of the options</option>
                        <option value="debit">Debit</option>
                        <option value="credit">Credit</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="date" label="Date" className="mb-4 text-black">
                      <Form.Control
                        {...register("date")}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        name="date"
                        type="date"
                        required
                        placeholder="Date"
                        disabled={!isEditing}
                      />
                    </FloatingLabel>
                    <FloatingLabel controlId="value" label="Value R$" className="mb-4 text-black">
                      <Form.Control
                        {...register("value")}
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        name="value"
                        type="number"
                        min="1"
                        step="any"
                        required
                        placeholder="Value"
                        disabled={!isEditing}
                      />
                    </FloatingLabel>

                    {/*error && <Card.Text className="text-danger text-center">{error}</Card.Text>*/}
                    <Container className="pt-3">
                      <Row>
                        <Col>
                          <Button
                            variant="outline-success"
                            size="lg"
                            className="px-5"
                            disabled={!isEditing}
                            type="submit">
                            <span role="status" aria-hidden="true">
                              Salvar
                            </span>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-warning"
                            size="lg"
                            className="px-5"
                            type="button"
                            onClick={handleEdit}>
                            <span role="status" aria-hidden="true">
                              Editar
                            </span>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-danger"
                            size="lg"
                            className="px-5"
                            type="button"
                            onClick={handleShow}>
                            <span role="status" aria-hidden="true">
                              Deletar
                            </span>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-light"
                            size="lg"
                            className="px-5"
                            type="button"
                            onClick={handleSendBack}>
                            <span role="status" aria-hidden="true">
                              Voltar
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;
  const apiClient = getAPIClient(ctx);
  const { ["philanthropicManager.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const { data } = await apiClient.get(`/financial-entries/${id}`);

  const financialDetails = FinancialDetailsMapper(data);

  return {
    props: {
      financialDetails
    }
  };
};
