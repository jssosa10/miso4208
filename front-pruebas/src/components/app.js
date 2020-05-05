import React, { useState, useEffect } from 'react';
import contentEditable from './contentEditable';
import Versiones from './versiones';
import Estrategias from './estrategias';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const API_APPS = "http://localhost:9000/apps";

function App(props){
    const [app, setApp] = useState({});
    const [updates, setUpdates] = useState(0);
    const [hovered, setHovered] = useState(-1);
    const [web, setWeb] = useState(1);

    async function fetchData() {
        console.log("el appid = "+props.id);
        const res = await fetch(API_APPS+'/'+props.id);
        res
          .json()
          .then(res => {console.log(res);setApp(res[0]);setWeb(res[0].tipo);props.updateTipo(res[0].tipo); props.updateName(res[0].name)});
    }

    useEffect(() => {
        fetchData();
        console.log(app);
    }, [props, updates]);


    async function deleteData() {
        const res = await fetch(API_APPS+"/"+props.id, {
          method: 'DELETE'
        }).then(res => {
            //console.log(res);
            props.handleBack();
          })
      };
    
    async function update_name(id, name) {
        const res = await fetch(API_APPS+"/"+id+"/"+name, {
          method: 'PUT',
        }).then(d => {
         console.log(d);
        });
    }

    async function update_tipo(id, tipo) {
        const res = await fetch(API_APPS+"/tipo/"+id+"/"+tipo, {
          method: 'PUT',
        }).then(d => {
         console.log(d);
        });
    }
    const updateTipo =  (event) =>{
        const w = (event.target.checked?1:0)
        setWeb(w);
        props.updateTipo(w);
        update_tipo(app.id,w);
        //setApp(app);
    }
    const deleteApp = ()=>{
        deleteData();
    }
    const EditableName = contentEditable('h1');
    const save = (new_name) => {
        update_name(props.id, new_name);
        props.updateName(new_name);
        //setUpdates(updates+1);
        app.name = new_name;
    }
    const style = {cursor:(hovered===1?'pointer':'')}
    return(
        
        <div style={{textAlign:'center'}}>
            <div style= {style} elevation={0} onMouseEnter={()=>setHovered(1)} onMouseLeave={()=>setHovered(-1)}>
                <EditableName value={app.name} onSave={save} />
            </div>
            <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}>
                <Grid item key = {1} xs={1}>
                <Button variant="contained" style = {{backgroundColor: '#33a2ff'}} onClick={props.handleBack}>
                        <ArrowBackIcon /> 
                </Button>
                </Grid>
                <Grid item key = {2} xs={1}>
                <Button variant="contained" color="secondary" onClick={deleteApp}>
                        <DeleteIcon /> 
                </Button>
                </Grid>
                <Grid key = {3} item xs = {10}
                    container
                    justify="flex-end"
                    alignItems="flex-end"
                    direction="row"
                    spacing={0}>
                        <Grid item key = {1} xs = {1}>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Switch checked={web} onChange={updateTipo}/>}
                                label="Web"
                            />
                        </FormGroup>
                        </Grid>
                </Grid>
            </Grid>
            <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="stretch"
            spacing={1}>
                <Grid item key = {1} xs={6}>
					<Estrategias appId={props.id} handleChange={props.handleChange}/>
                </Grid>
                <Grid item key={2} xs = {6}>
					<Versiones appId = {props.id} name={app.name} web={web}/>
                </Grid>
            </Grid>
        </div>
    )
}
export default App;