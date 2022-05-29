import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Col, Table } from "react-bootstrap";

import { FinancialTypeData, FinancialTypeMapper } from "../../models/financialType";
import { api } from "../../services/api";

import Menu from "../../components/menu";
import FinancialMapper from "../../mappers/financialMapper";

export default function Financial() {
  const [data, setData] = useState<FinancialTypeMapper[]>([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [total, setTotal] = useState(0);

  const formatValue = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  useEffect(() => {
    let dataFinancial: FinancialTypeData[] = [];
    async function fetchData() {
      const { data } = await api.get("/financial-entries");
      dataFinancial = data as FinancialTypeData[];
      setData(FinancialMapper(dataFinancial));

      let credit = 0;
      let debit = 0;

      dataFinancial.map((item) => {
        if (item.type === "credit") {
          credit = credit + Number(item.value);
        } else {
          debit = debit + Number(item.value);
        }
        setTotalDebit(debit);
        setTotalCredit(credit);
        setTotal(credit - debit);
      });
    }

    fetchData();
  }, []);

  return (
    <>
      <Menu />
      <Container className="mt-3 h-100 ">
        <Row
          className="p-4 mb-5 justify-content-center align-items-center bg-dark bg-gradient text-light"
          style={{ borderRadius: "1rem" }}>
          <Col>
            <Row className="align-items-center mb-4">
              <Col>
                <h2 className="fw-bold text-uppercase text-center">balance</h2>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col>
                <p className="text-center">Total Proventos:</p>
              </Col>
              <Col>
                <p className="text-center">{formatValue(totalCredit)}</p>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col>
                <p className="text-center">Total Descontos:</p>
              </Col>
              <Col>
                <p className="text-center">{formatValue(totalDebit)}</p>
              </Col>
            </Row>
            <Row>
              <hr></hr>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col>
                <p className="text-center">Saldo Atual:</p>
              </Col>
              <Col>
                <p className="text-center">{formatValue(total)}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Table hover>
            <tbody>
              {data.map((item) => {
                return (
                  <tr
                    onClick={() => {
                      alert("abrir item: " + item.id);
                    }}
                    key={item.id}
                    className={item.type === "debit" ? "bg-danger" : "bg-success"}>
                    <td>
                      <Row className="d-flex justify-content-between">
                        <Col className="text-center">
                          <p>Valor do lançamento:</p>
                        </Col>
                        <Col className="text-center">
                          <p>{formatValue(Number(item.value))}</p>
                        </Col>
                      </Row>
                      <Row className="d-flex justify-content-between">
                        <Col className="text-center">
                          <p>Data do lançamento:</p>
                        </Col>
                        <Col className="text-center">
                          <p>{item.date}</p>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
