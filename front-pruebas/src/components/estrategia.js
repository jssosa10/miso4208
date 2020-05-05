import React, { useState, useEffect } from 'react';
import contentEditable from './contentEditable';
import Pruebas from './pruebas';
import Dispositivos from './dispositivos';
import VersionesList from './versionesList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlayArrow from '@material-ui/icons/PlayArrow'
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const API_APPS = "http://localhost:9000/estrategias/";
const API_PRUEBAS = "http://localhost:9000/e2e/web";

function Estrategia(props){
    const [estrategia, setEstrategia] = useState({});
    const [hovered, setHovered] = useState(-1);
    const [updates, setUpdates] = useState(0);
    const [pruebas, setPruebas] = useState([]);
    const [dispositivos, setDispositivos] =useState([]);
    const [versiones, setVersiones] = useState([]);

    async function fetchData() {
        console.log("el appid = "+props.id);
        const res = await fetch(API_APPS+"one/"+props.id);
        res
          .json()
          .then(res => {setEstrategia(res[0])});
    }

    const create_body = (name_prueba) => {
        return JSON.stringify(
          {
            "app": props.name,
            "version": name_prueba
          }
        );
      }

      async function upload(name_prueba){
        const res = await fetch(API_PRUEBAS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: create_body(name_prueba)
        }).then(d => {
          console.log(d);
        })
     }

     const submit = (name_prueba)=>{
         console.log(name_prueba)
         upload(name_prueba);
     } 

    useEffect(() => {
        fetchData();
    }, [props, updates]);


    async function update_name(id, name) {
        const res = await fetch(API_APPS+"/"+id+"/"+name, {
          method: 'PUT',
        }).then(d => {
         console.log(d);
        });
    }

    const EditableName = contentEditable('h1');
    const save = (new_name) => {
        update_name(props.id, new_name);
        setUpdates(updates+1);
    }
    const run = ()=>{
        console.log(props.name);
        console.log(versiones);
        console.log(pruebas);
        console.log(dispositivos);
        for (let x of pruebas){
            submit(x.name);
        }
    }
    const style = {cursor:(hovered===1?'pointer':'')}
    return(
        <div style={{textAlign:'center'}}>
            <div style= {style} elevation={0} onMouseEnter={()=>setHovered(1)} onMouseLeave={()=>setHovered(-1)}>
                <EditableName value={estrategia.name} onSave={save} />
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
                <Button variant="contained" color="secondary">
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
                                control={<Switch/>}
                                label="VRT"
                            />
                        </FormGroup>
                        </Grid>
                        <Grid item key = {1} xs = {1}>
                            <Button variant="contained" color="primary" onClick={run}>
                                <PlayArrow /> 
                            </Button>
                        </Grid>
                </Grid>
            </Grid>
            <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="stretch"
            spacing={1}>
                <Grid item key = {1} xs={4}>
                    {typeof estrategia.id === 'undefined'?<span />:<Pruebas EstrategiaId={estrategia.id} name={props.name} update={(ll)=>{setPruebas(ll);console.log(ll)}}/>}
                </Grid>
                <Grid item key={2} xs = {4}>
                    {typeof estrategia.id === 'undefined'?<span/ >:<Dispositivos tipo={props.tipo} update={(ll)=>{setDispositivos(ll);console.log(ll)}} />}
                </Grid>
                <Grid item key={3} xs={4}>
                   <VersionesList appId={props.appId} update={(ll)=>{setVersiones(ll);console.log(ll)}} />
                </Grid>
            </Grid>
        </div>
    )
}
export default Estrategia;