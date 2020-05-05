import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const API_APPS = "http://localhost:9000/estrategias/";

function Estrategias(props){
    const [estrategias, setEstrategias] = useState([]);
    const [updates, setUpdates] = useState(0);
    const [hovered, setHovered] = useState(-1);

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

    async function postData() {
        const res = await fetch(API_APPS+props.appId, {
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
  
      const createEstrategia = () => {
        postData();
      };

    const create_estrategia = estrategia =>  { 
        const style = {cursor:(estrategia.id===hovered?'pointer':''),backgroundColor:(estrategia.id===hovered?'#DCE1E8':'white')}
    return(
    <Grid item key = {estrategia.id} xs={12}>
      <Paper style= {style} elevation={2} onMouseEnter={()=>setHovered(estrategia.id)} onMouseLeave={()=>setHovered(-1)}>

        <h3 style={{padding:"20px"}} onClick={() => props.handleChange(estrategia.id)}>{estrategia.name}</h3>
      
      </Paper>
    </Grid>)
    };
    return(
        
        <div>
            <Paper elevation={2}>
            <h2>Estrategias</h2>
            <div className="border">
            <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={0}>
                {estrategias.map(estrategia => create_estrategia(estrategia))}
            </Grid>
            </div>
            <div style={{textAlign:"center", margin:"10px"}}>
                <Fab color="primary" onClick = {createEstrategia} >
                    <AddIcon />
                </Fab>
            </div>
            </Paper>
        </div>
    );
}

export default Estrategias;