import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Version  from './version'


const API_APPS = "http://localhost:9000/apps";

function Versiones(props){
    const [versiones, setVersiones] = useState([]);
    const [version, setVersion] = useState(0);
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
        <li key = {version.id}>
          <span>
            <h3>{version.name}</h3>
              <Fab color="secondary" onClick={() => console.log("OK")}>
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
                <Fab color="primary" onClick = {()=>{setVersion(-1)}} >
                    <AddIcon />
                </Fab>
            </div>
            <Version version={version} />
        </div>
    );
}

export default Versiones;