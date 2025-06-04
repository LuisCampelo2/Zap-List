import { Link } from "react-router-dom";

export const AcctivateAccount = () => {
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
