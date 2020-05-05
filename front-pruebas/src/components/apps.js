import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "./Apps.css";


const API_APPS = "http://localhost:9000/apps";

function Apps(props) {
    const [apps, setApps] = useState([]);
    const [hovered, setHovered] = useState(-1);
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
          //console.log(res);
          setUpdates(updates+1);
          props.handleChange(res.insertId);
        })
    };

    // async function delete

    const createApp = () => {
      postData();
    };


    
    useEffect(() => {
        fetchData();
    }, [props, updates]);
    const create_app = app =>  { 
      const style = {cursor:(app.id===hovered?'pointer':''),backgroundColor:(app.id===hovered?'#DCE1E8':'white')}
      return(
      <Grid item key = {app.id} xs={12}>
        <Paper style= {style} elevation={2} onMouseEnter={()=>setHovered(app.id)} onMouseLeave={()=>setHovered(-1)}>

          <h3 style={{padding:"20px"}} onClick={() => props.handleChange(app.id)}>{app.name}</h3>
        
        </Paper>
      </Grid>)
    };
    const style = {
      padding: '1em',
      overflowY: 'scroll'}
    return(
        <div style={{textAlign:'center'}}>
          <h1 >Aplicaciones</h1>
          <div className='column'>
          <Grid
            container
            direction="column">
            {apps.map(app => create_app(app))}
          </Grid>
          </div>
          <div style={{textAlign:"center", margin:"10px"}}>
            <Fab  color="primary" onClick = {createApp} >
                <AddIcon />
            </Fab>
          </div>
        </div>
    );

}

export default Apps;