import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div className="container container-home">
        <h1>O que gostaria hoje?</h1>
        <div className="row row-home">
          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Hortifruti`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Hortifruti.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Hortifruti</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Carnes`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Carnes.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Carnes</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Peixes`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Peixes.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Peixes</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Massas`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Massas.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Massas</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Laticinios e ovos`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Laticinios e ovos.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Laticinios e ovos</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Padaria`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Padaria.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Padaria</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Temperos e especiarias`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Temperos e especiarias.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Temperos e especiarias</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Alimentos não pereciveis`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Alimentos não pereciveis.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Alimentos não pereciveis</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Doces e guloseimas`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Doces e guloseimas.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Doces e guloseimas</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Bebidas`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Bebidas.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Bebidas</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Material de higiene`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Material de higiene.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Material de higiene</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Material de limpeza`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Material de limpeza.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Material de limpeza</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Itens pra cachorro`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Itens pra cachorro.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Itens pra cachorro</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-3 container">
            <div className="card card-home">
              <Link to={`/products?category=Outros`}>
                <div className="card-body">
                  <img
                    className="imgs-category-home"
                    src={`/imgs/Outros.png`}
                    alt=""
                  />
                </div>
                <div className="card-footer">
                  <p>Outros</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
