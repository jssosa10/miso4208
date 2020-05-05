import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const API_APPS = "http://localhost:9000/versiones/";

function VersionesList(props){
    const [versiones, setDispositivos] = useState([]);
    const [updates, setUpdates] = useState(0);
    const [checked, setChecked]  = useState([])
    const [using, setUsing] = useState([]);

    async function fetchData() {
        console.log(props.tipo);
        const res = await fetch(API_APPS+props.appId);
        res
        //console.log(res);
          .json()
          .then(res => setDispositivos(res));
    }

    useEffect(() => {
        fetchData();
    }, [props, updates]);

    const sacar = (version)=>{
        let filterDisp = using.filter((disp)=>disp.id!==version.id);
        let filterCheck = checked.filter((val)=>val!==version.id);
        setChecked([...filterCheck]);
        setUsing([...filterDisp]);
        props.update([...filterDisp]);
    }
    const meter = (version)=>{
        using.push(version);
        checked.push(version.id);
        setChecked([...checked]);
        setUsing([...using]);
        props.update([...using]);
        console.log(checked);
    }

    const updates_lista = (version)=>{
        let inLista = checked.indexOf(version.id);
        console.log(inLista);
        if(inLista!==-1){
            sacar(version);
        }
        else{
            meter(version);
        }
    }

    const create_dispositivo = version =>  { return(
        <FormControlLabel
            control={<Checkbox checked={checked.indexOf(version.id)!==-1} onChange={(ev)=>updates_lista(version)}/>}
            label={version.nombre}
        />)
    };
    return(
        
        <div>
            <Paper>
            <h2>versiones</h2>
            <div className="border">
            <FormControl component="fieldset">
                <FormGroup>
                {versiones.map(version => create_dispositivo(version))}
             </FormGroup>
            </FormControl>
            </div>
            </Paper>
           
        </div>
    );
}

export default VersionesList;