import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';



const API_APPS = "http://localhost:3003/estrategias/";

function Estrategias(props){
    const [estrategias, setEstrategias] = useState([]);
    const [updates, setUpdates] = useState(0);

    async function fetchData() {
        console.log(props);
        const res = await fetch(API_APPS+props.appId);
        res
        //console.log(res);
          .json()
          .then(res => setEstrategias(res));
    }

    useEffect(() => {
        fetchData();
    }, [props, updates]);

    const create_estrategia = estrategia =>  { return(
        <li>
          <span>
            <h3>{estrategia.name}</h3>
              <Fab variant="contained" color="secondary" onClick={() => props.handleChange(estrategia.id)}>
                <EditIcon />
              </Fab>
          </span>
        </li>)
    };
    return(
        
        <div className="half">
            <h2>Estrategias</h2>
            <div className="border">
            <ul>
                {estrategias.map(estrategia => create_estrategia(estrategia))}
            </ul>
            </div>
            <div className="rr">
                <Fab variant="contained" color="primary" onClick = {console.log("Agregar")} >
                    <AddIcon />
                </Fab>
            </div>
        </div>
    );
}

export default Estrategias;