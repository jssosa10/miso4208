import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


const API_APPS = "http://localhost:3003/apps";

function Versiones(props){
    const [versiones, setVersiones] = useState([]);
    const [updates, setUpdates] = useState(0);

    async function fetchData() {
        const res = await fetch(API_APPS);
        res
        //console.log(res);
          .json()
          .then(res => setVersiones(res));
    }

    useEffect(() => {
        fetchData();
    }, [props, updates]);

    const create_versione = version =>  { return(
        <li>
          <span>
            <h3>{version.name}</h3>
              <Fab variant="contained" color="secondary" onClick={() => console.log("OK")}>
                <EditIcon />
              </Fab>
          </span>
        </li>)
    };
    return(
        
        <div className="half">
            <h2>Versiones</h2>
            <div className="border">
            <ul>
                {versiones.map(version => create_versione(version))}
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

export default Versiones;