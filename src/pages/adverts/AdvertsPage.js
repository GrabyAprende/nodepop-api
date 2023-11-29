//importamos la función getLatestAdverts para hacer la llamada al service.
import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";

function AdvertsPage()  {
    const [adverts, setAdverts] = useState([]) //aqui definimos el estado donde se almacena los anuncios que nos llegue de la peticion
    
    //para que no sea un bucle infinito usamos useEffect y le pasamos dos parametros
    useEffect(() => {
        //aquí hacemos la llamada al método get(service)que devuelve una promesa o el resultado del get
        getLatestAdverts().then(adverts => setAdverts(adverts) ).catch(err => console.error(err))//luego definimos un estado para que se guarden los anuncios
    }, [])
    
    return (
        <div>
            <ul>
                {adverts.map(advert => (
                <li key={advert.id}>
                    <span>{advert.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}




export default AdvertsPage