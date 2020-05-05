import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Version  from './version'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const API_APPS = "http://localhost:9000/versiones";

function Versiones(props){
    const [versiones, setVersiones] = useState([]);
    const [version, setVersion] = useState(0);
    const [updates, setUpdates] = useState(0);
    const [hovered, setHovered] = useState(-1);

    async function fetchData() {
        const res = await fetch(API_APPS+"/"+props.appId);
        res
        //console.log(res);
          .json()
          .then(res => setVersiones(res));
    }

    useEffect(() => {
        fetchData();
    }, [props, updates]);

    async function postData() {
        const res = await fetch(API_APPS+"/"+props.appId, {
          method: 'POST'
        })
        res
          .json()
          .then(res => {
            setVersion(res.insertId);
          })
      };
  
      // async function delete
  
      const createVersion = () => {
        postData();
        setUpdates(updates+1);
      };

    const create_version = version =>  { 
        const style = {cursor:(version.id===hovered?'pointer':''),backgroundColor:(version.id===hovered?'#DCE1E8':'white')}
        return(
            <Grid item key = {version.id} xs={12}>
                <Paper style= {style} elevation={2} onMouseEnter={()=>setHovered(version.id)} onMouseLeave={()=>setHovered(0)}>
                    <h3 style={{padding:"20px"}} onClick={() => setVersion(version.id)}>{version.nombre}</h3>
                </Paper>
            </Grid>
        )
    };
    return(
        
        <div>
            <Paper elevation={2}>
            <h2>Versiones</h2>
            <div className="border">
            <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={0}>
                {versiones.map(version => create_version(version))}
            </Grid>
            </div>
            <div style={{textAlign:"center", margin:"10px"}}>
                <Fab color="primary" onClick = {createVersion} >
                    <AddIcon />
                </Fab>
            </div>
            {version!==0?<Version version={version} web = {props.web} name={props.name} close={()=>{setVersion(0);setUpdates(updates+1);}}/>:<span />}
            </Paper>
        </div>
    );
}

export default Versiones;