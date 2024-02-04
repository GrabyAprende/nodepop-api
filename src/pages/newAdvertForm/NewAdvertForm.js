import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getTags, createAdvert } from "./service";

const NewAdvertForm = () => {
  // Esta es la utilidad de react-router para navegar por nuestra aplicacion
  const navigate = useNavigate();

  // Definimos el estado inicial del componente
  const [state, setState] = useState({
    name: "",
    sale: true,
    tags: [],
    price: 0,
  });

  const [allTags, setAllTags] = useState([]); // allTags seran todos los tags que vengan desde la API
  const [isButonDisabled, setIsButtonDisabled] = useState(true); // isButonDisabled nos dirá si el botón está disponible o no

  // Cada vez que state cambie, vamos a checkear si el botón esta disponible o no
  useEffect(() => {
    if (state.name && state.tags.length > 0 && state.price > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [state]); // <- este [state] es la dependencia que hara que se renderice otra vez el componente cada vez que state cambie

  // Solo la primera vez que el componente renderice, vamos a traernos los tags de la API
  useEffect(() => {
    getTags()
      .then((tags) =>
        setAllTags(() => {
          return tags;
        })
      )
      .catch((err) => console.error(err));
  }, []); // <- este [] es la dependencia que necesitamos para renderizarlo solo la primera vez

  // Aqui esta la logica cuando vamos a crear el anuncio
  const handleSubmit = async (event) => {
    event.preventDefault();

    // FormData nos formatea los datos de formulario para enviarlos a la API correctamente
    const formData = new FormData();

    // Metemos todas las propiedades de state en formData
    formData.append("name", state.name);
    formData.append("sale", state.sale);
    formData.append("tags", state.tags);
    formData.append("price", state.price);
    if (state.photo) {
      // Este es el mas importante, sino hacemos esto, la API se hace la picha un lio
      formData.append("photo", state.photo);
    }

    // Llamamos a la api para crear el anuncio con formData
    createAdvert(formData)
      .then((newAdvert) => navigate(`/adverts/${newAdvert.id}`))
      .catch((err) => console.error({ err }));
  };

  return (
    // La clase container en PicoCSS hace que el contenido tenga margenes a la izquierda y derecha
    <section className="container">
      {/* article en PicoCss nos crea una "tarjeta" */}
      <article>
        <h1>Crea tu anuncio</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="text">Nombre</label>
            <input
              type="text"
              id="text"
              name="nombre"
              placeholder="Introduce nombre de anuncio"
              required
              value={state.name}
              // onChange va a manejar una funcion con el evento generado
              // entonces vamos a usar setState para cambiar el state
              // todos los onChanges en este fichero hacen lo mismo
              onChange={(event) =>
                setState((currentState) => {
                  return {
                    // Con esta destructuracion, mantenemos el estado actual
                    ...currentState,
                    // Solo modificamos la propiedad que nos interesa, en este caso "name" con el valor del evento
                    name: event.target.value,
                  };
                })
              }
            />
          </fieldset>

          <fieldset>
            <legend>
              <strong>Tipo de anuncio</strong>
            </legend>
            <label htmlFor="radio-buy">
              <input
                type="radio"
                id="radio-buy"
                name="radio"
                value="radio-buy"
                checked={!state.sale}
                required
                onChange={() =>
                  setState((currentState) => {
                    return {
                      ...currentState,
                      // En este caso, no seteamos nada del evento, porque ya sabemos
                      // que si este esta activo, sale sera falso (en el caso de abajo verdadero)
                      sale: false,
                    };
                  })
                }
              />
              Compra
            </label>
            <label htmlFor="radio-sell">
              <input
                type="radio"
                id="radio-sell"
                name="radio"
                value="radio-sell"
                checked={state.sale}
                required
                onChange={() =>
                  setState((currentState) => {
                    return {
                      ...currentState,
                      sale: true,
                    };
                  })
                }
              />
              Venta
            </label>
          </fieldset>

          <fieldset>
            <legend>
              <strong>Tags</strong>
            </legend>
            {allTags.map((tag) => {
              return (
                <label htmlFor={`checkbox-${tag}`} key={`checkbox-${tag}`}>
                  <input
                    type="checkbox"
                    id={`checkbox-${tag}`}
                    name={`checkbox-${tag}`}
                    onChange={(event) =>
                      setState((currentState) => {
                        const isChecked = event.target.checked;

                        return {
                          ...currentState,
                          tags: isChecked
                            ? // Si esta checkeado, simplement añadimos el tag a nuestro tags de state
                              [...currentState.tags, tag]
                            : // pero si no esta checkeado lo eliminamos haciendo un filtro de todos los tags, menos este
                              // para que nos de un array con todos los tags, menos este.
                              currentState.tags.filter((filteredTag) => {
                                return filteredTag !== tag;
                              }),
                        };
                      })
                    }
                  />
                  {tag}
                </label>
              );
            })}
          </fieldset>

          <fieldset>
            <label htmlFor="text">Precio en Euros</label>
            <input
              type="text"
              id="text"
              name="precio"
              placeholder="100"
              required
              value={state.price === 0 ? "" : state.price}
              onChange={(event) =>
                setState((currentState) => {
                  return {
                    ...currentState,
                    price: event.target.value,
                  };
                })
              }
            />
          </fieldset>

          <fieldset>
            <label htmlFor="file">
              Añade foto
              <input
                type="file"
                onChange={(event) =>
                  setState((currentState) => {
                    return {
                      ...currentState,
                      // event.target.files[0] cuando solo queremos el primer fichero de los seleccionados
                      photo: event.target.files[0],
                    };
                  })
                }
              />
            </label>
          </fieldset>

          <button type="submit" disabled={isButonDisabled}>
            Crear anuncio
          </button>
        </form>
      </article>
    </section>
  );
};

export default NewAdvertForm;
