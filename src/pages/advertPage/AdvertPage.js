//Detalle del anuncio cuyo id es recogido de la URL. Mostrará la foto del
//anuncio o un placeholder en su lugar si no existe foto.
//o Si el anuncio no existe deberia redirigirnos al NotFoundPage.
//o Botón para poder borrar el anuncio. Antes de borrar mostar una
//confirmación al usuario (algo más elaborado que un window.confirm,
//jugando con el estado de React). Tras el borrado debería redireccionar
//al listado de anuncios.
///api/v1/adverts/:id o GET: Devuelve un único anuncio por Id. o DELETE: Borra un anuncio por Id.

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteAdvert, getAdvert } from "./service";
import { Advert } from '../../components/Advert'

function AdvertPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [advert, setAdvert] = useState(null);

    useEffect(() => {
        getAdvert(params.id)
            .then((advertFromApi) => setAdvert(advertFromApi))
            .catch(error => {
                if (error.status === 404) {
                    navigate('/404')
                }
        });
    }, [navigate, params.id]);

    async function handleDelete() {
        try {
            await deleteAdvert(params.id)
            navigate('/adverts')
        } catch (err) {
            console.error(err)
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
                <a role="button" href={`/adverts`}>Volver a Anuncios</a>
                </div>
            </Advert>
        </section>
    )}           
export default AdvertPage;