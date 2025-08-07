import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { activate } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store/store";


export const AcctivateAccount = () => {
  const { token } = useParams();
   const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch((activate({
      token: token
    })))
  }, [dispatch,token]);

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
