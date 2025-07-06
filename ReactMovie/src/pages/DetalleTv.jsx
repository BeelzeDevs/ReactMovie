import { useParams } from "react-router-dom";

function DetalleTv (){
    const {id} = useParams();

    return (
        <h2>Detalle Tv Show: {id}</h2>
    );
}

export default DetalleTv;