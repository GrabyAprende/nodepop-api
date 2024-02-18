//creamos un método para obtener los ultimos anuncios por este cliente
import client from "../../api/cliente";

const advertURL = "/v1/adverts";

const getAdvertUrl = (type, tag) => {
  // Inicializamos url con advertUrl
  let url = advertURL;

  if (type) {
    // Si tipo es compra, iniciamos los parametros con ?
    if (type === "compra") {
      url = `${url}?sale=false`;
    } else if (type === "venta") {
      url = `${url}?sale=true`;
    }
  }

  if (tag) {
    // Si hay type, empezara por el prefijo & y sino hay iniciamos los parametros con ?
    if (type) {
      url = `${url}&tags=${tag}`;
    } else {
      url = `${url}?tags=${tag}`;
    }
  }

  return url;
};

//otro método para que me devuelva la promesa
export const getLatestAdverts = (type, tag) => {
  return client.get(getAdvertUrl(type, tag));
};

//luego hacer la llamada desde mi componente(fichero)
