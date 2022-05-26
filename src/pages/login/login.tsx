import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn, error } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    await signIn(data);
  }

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
            <form className="card-body p-5 text-center" onSubmit={handleSubmit(handleSignIn)}>
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Philanthropic Manager</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                <div className="form-floating mb-4">
                  <input
                    {...register("username")}
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    required
                  />
                  <label className="text-black" htmlFor="username">
                    Username
                  </label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    required
                  />
                  <label className="text-black" htmlFor="password">
                    Password
                  </label>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button className="btn btn-outline-light btn-lg px-5" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
