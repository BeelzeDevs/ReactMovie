import { useParams } from 'react-router-dom';

function DetalleMovie(){
    const { id } = useParams();

    return <h2>Detalle de película ID: {id}</h2>;
}

export default DetalleMovie;