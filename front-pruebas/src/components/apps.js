import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


const API_APPS = "http://localhost:3000/apps";

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
          console.log(res);
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
      <ExpansionPanel key = {app.id}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          id={app.id}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs>
    <h3>{app.name}</h3>
            </Grid>
            <Grid item xs>
              <Fab variant="contained" color="secondary" onClick={() => props.handleChange(app)}>
              <EditIcon />
              </Fab>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {app.description}
        </ExpansionPanelDetails>
      </ExpansionPanel>)
    };

    return(
        <div>
          {apps.map(app => create_app(app))}
          <Fab variant="contained" color="primary" onClick = {createApp} >
              <AddIcon />
          </Fab>
        </div>
    );

}

export default Apps;