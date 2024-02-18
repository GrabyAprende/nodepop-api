//importamos la función getLatestAdverts para hacer la llamada al service.
import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
//import { getTags } from "../newAdvertForm/service";
import { Advert } from "../../components/Advert";
import "./AdvertsStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { setAdverts } from "../../store/actions/adsActions";
import { selectAds, selectTags } from "../../store/selectors/adsSelector";
import {
  getIsLogged,
  getIsLoading,
} from "../../store/selectors/sessionSelectors";

function AdvertsPage() {
  const dispatch = useDispatch();

  const adverts = useSelector(selectAds); //aqui definimos el estado donde se almacena los anuncios que nos llegue de la peticion
  const tags = useSelector(selectTags); //aqui definimos el estado donde se almacena los anuncios que nos llegue de la peticion
  const isLogged = useSelector(getIsLogged);
  const isLoading = useSelector(getIsLoading);
  const [type, setType] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    if (isLogged) {
      getLatestAdverts(type, selectedTag)
        .then((adverts) => dispatch(setAdverts(adverts)))
        .catch((err) => console.error(err));
    }
  }, [type, selectedTag, dispatch, isLogged]);

  const filterByType = (event) => {
    const typeFromEvent = event.target.value;
    setType(typeFromEvent);
  };

  const filterByTag = (event) => {
    const tagFromEvent = event.target.value;
    setSelectedTag(tagFromEvent);
  };

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    // La clase container en PicoCSS hace que el contenido tenga margenes a la izquierda y derecha
    <section className="container">
      <h1>Anuncios</h1>

      <label htmlFor="select-type">Tipo de anuncio</label>
      <select id="select-type" name="select-type" onChange={filterByType}>
        <option value="">Todos</option>
        <option value="compra">Compra</option>
        <option value="venta">Venta</option>
      </select>

      <label htmlFor="select-tag">Tipo de anuncio</label>
      <select id="select-tag" name="select-tag" onChange={filterByTag}>
        <option value="">Todos</option>
        {tags.map((tag) => {
          return (
            <option key={`option-${tag}`} value={tag}>
              {tag}
            </option>
          );
        })}
      </select>

      {/* La clase "-adverts-grid" en PicoCSS nos hace un -adverts-grid automaticamente */}
      <div className="grid adverts-grid">
        {adverts.length === 0 ? (
          // Cuando no haya anuncios, ponemos esto
          <article>
            <div>No hay aún anuncios, ¿Quieres crear uno?</div>
            <a role="button" href={"/adverts/new"}>
              Crea tu anuncio
            </a>
          </article>
        ) : (
          /* Aqui vamos a recorrer todos nuestros anuncios */
          adverts.map((advert) => {
            return (
              // article en PicoCss nos crea una "tarjeta"
              <Advert key={advert.id} advertData={advert}>
                {/* Ponemos la direccion dinamica, dependiendo del id de advert */}
                <a role="button" href={`/adverts/${advert.id}`}>
                  Ir al anuncio
                </a>
              </Advert>
            );
          })
        )}
      </div>
    </section>
  );
}

export default AdvertsPage;
