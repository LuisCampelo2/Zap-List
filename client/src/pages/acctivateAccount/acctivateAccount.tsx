import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export const AcctivateAccount = () => {
  const { token } = useParams();

  useEffect(() => {
    const activateUser = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/activation/${token}`
        );
        
      } catch (error) {
        console.error("Erro na ativação:", error);
      }
    };

    activateUser();
  }, [token]);

  return (
    <>
      <div className="container">
        <div className="card mt-5">
          <div className="card-header">Ativaçao de conta</div>
          <div className="card-footer">
            <div className="row">
              <div className="col-12">Conta ativada com sucesso!</div>
            </div>
            <div className="row">
              <div className="col-12">
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
