import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import "./Apps.css";


const API_APPS = "http://localhost:3003/apps";

function Apps(props) {
    const [apps, setApps] = useState([]);
    const [updates, setUpdates] = useState(0);

    async function fetchData() {
        const res = await fetch(API_APPS);
        res
        //console.log(res);
          .json()
          .then(res => setApps(res));
    }

    async function postData() {
      const res = await fetch(API_APPS, {
        method: 'POST'
      })
      res
        .json()
        .then(res => {
          setUpdates(updates+1);
        })
    };

    const createApp = () => {
      postData();
    };
    useEffect(() => {
        fetchData();
    }, [props, updates]);

    const create_app = app =>  { return(
      <li>
        <span>
          <h3>{app.name}</h3>
            <Fab variant="contained" color="secondary" onClick={() => props.handleChange(app.id)}>
              <EditIcon />
            </Fab>
        </span>
      </li>)
    };

    return(
        <div className="apps">
          <h1>Aplicaciones</h1>
          <div className="column">
          <ul>
            {apps.map(app => create_app(app))}
          </ul>
          </div>
          <div className="rr">
            <Fab variant="contained" color="primary" onClick = {createApp} >
                <AddIcon />
            </Fab>
          </div>
        </div>
    );

}

export default Apps;