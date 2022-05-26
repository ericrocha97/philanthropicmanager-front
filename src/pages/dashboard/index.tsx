import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

type member = {
  id: string;
  name: string;
  CID: string;
  address: string;
  CEP: string;
  phone: string;
  birthday: string;
  level: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<member[]>([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get("/members");
      setData(data);
    }

    fetchData();
  }, []);
  return (
    <div className="vh-100 bg-secondary bg-gradient">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center">
          <p>Dashboard</p>
          <p>
            Welcome <strong>{user?.member?.name || "User"}</strong>
          </p>
          {data.map((member) => (
            <ul key={member.id}>
              <li>
                <strong>Name:</strong> {member.name}
              </li>
              <li>
                <strong>CID:</strong> {member.CID}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
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
