import React, { useState, useEffect } from 'react';


const API_APPS = "http://localhost:9000/dispositivos/";

function Dispositivos(props){
    const [dispositivos, setDispositivos] = useState([]);
    const [updates, setUpdates] = useState(0);

    async function fetchData() {
        console.log(props.tipo);
        const res = await fetch(API_APPS+props.tipo);
        res
        //console.log(res);
          .json()
          .then(res => setDispositivos(res));
    }

    useEffect(() => {
        fetchData();
    }, [props, updates]);

    const create_dispositivo = dispositivo =>  { return(
        <li key  = {dispositivo.id}>
            <label><input type="checkbox" /> {dispositivo.name}</label>
        </li>)
    };
    return(
        
        <div className="Third">
            <h2>Dispositivos</h2>
            <div className="border">
            <ul>
                {dispositivos.map(dispositivo => create_dispositivo(dispositivo))}
            </ul>
            </div>
        </div>
    );
}

export default Dispositivos;