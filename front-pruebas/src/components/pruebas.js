import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Prueba  from './prueba'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const API_APPS = "http://localhost:9000/pruebas";

function Pruebas(props){
    const [pruebas, setPruebas] = useState([]);
    const [prueba, setPrueba] = useState(0);
    const [updates, setUpdates] = useState(0);
    const [hovered, setHovered] = useState(-1);

    async function fetchData() {
        const res = await fetch(API_APPS+"/"+props.EstrategiaId);
        res
        //console.log(res);
          .json()
          .then(res => setPruebas(res));
    }

    useEffect(() => {
        fetchData();
        props.update(pruebas);
    }, [props, updates]);

    async function postData() {
        const res = await fetch(API_APPS+"/"+props.EstrategiaId, {
          method: 'POST'
        })
        res
          .json()
          .then(res => {
            setPrueba(res.insertId);
          })
      };
  
      // async function delete
  
      const createVersion = () => {
        postData();
        setUpdates(updates+1);
      };

    const create_version = prueba =>  { 
        const style = {cursor:(prueba.id===hovered?'pointer':''),backgroundColor:(prueba.id===hovered?'#DCE1E8':'white')}
        return(
            <Grid item key = {prueba.id} xs={12}>
                <Paper style= {style} elevation={2} onMouseEnter={()=>setHovered(prueba.id)} onMouseLeave={()=>setHovered(0)}>
                    <h3 style={{padding:"20px"}} onClick={() => setPrueba(prueba.id)}>{prueba.name}</h3>
                </Paper>
            </Grid>
        )
    };
    return(
        
        <div>
            <Paper elevation={2}>
            <h2>Pruebas</h2>
            <div className="border">
            <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={0}>
                {pruebas.map(prueba => create_version(prueba))}
            </Grid>
            </div>
            </Paper>
            <div style={{textAlign:"center", margin:"10px"}}>
                <Fab color="primary" onClick = {createVersion} >
                    <AddIcon />
                </Fab>
            </div>
            {prueba!==0?<Prueba prueba={prueba} name={props.name} close={()=>{setPrueba(0);setUpdates(updates+1);}}/>:<span />}
        </div>
    );
}

export default Pruebas;