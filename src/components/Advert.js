export const Advert = ({ advertData, children }) => {
 return (
    <article key={advertData?.id}>
        <h2>{advertData?.name}</h2>
        <img src={advertData?.photo} alt={advertData?.name} />
        <div>
            Precio: {advertData?.price} €
        </div>
        <div>Tipo: { advertData?.sale === true ? 'Venta' : 'Compra'  }</div>
        <div>{advertData?.tags.join(', ')}</div>
        {children}
    </article>
 )
}