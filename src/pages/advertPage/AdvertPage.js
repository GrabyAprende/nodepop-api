import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteAdvert, getAdvert } from "./service";
import { Advert } from "../../components/Advert";
import { useDispatch } from "react-redux";
import { removeAdvert } from "../../store/actions/adsActions";

function AdvertPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    getAdvert(params.id)
      .then((advertFromApi) => setAdvert(advertFromApi))
      .catch((error) => {
        if (error.status === 404) {
          navigate("/404");
        }
      });
  }, [navigate, params.id]);

  async function handleDelete() {
    try {
      await deleteAdvert(params.id);
      dispatch(removeAdvert(params.id));
      navigate("/adverts");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="container">
      <h1>Detalle del anuncio</h1>
      <Advert advertData={advert}>
        <div>
          <button onClick={handleDelete}>Borrar</button>
        </div>
        <div>
          <a role="button" href={`/adverts`}>
            Volver a Anuncios
          </a>
        </div>
      </Advert>
    </section>
  );
}
export default AdvertPage;
