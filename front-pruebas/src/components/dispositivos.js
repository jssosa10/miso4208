import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const API_APPS = "http://localhost:9000/dispositivos/";

function Dispositivos(props){
    const [dispositivos, setDispositivos] = useState([]);
    const [updates, setUpdates] = useState(0);
    const [checked, setChecked]  = useState([])
    const [using, setUsing] = useState([]);

    async function fetchData() {
        console.log(props.tipo);
        const res = await fetch(API_APPS+props.tipo);
        res
        //console.log(res);
          .json()
          .then(res => setDispositivos(res));
    }

    useEffect(() => {
        fetchData();
    }, [props, updates]);

    const sacar = (dispositivo)=>{
        let filterDisp = using.filter((disp)=>disp.id!==dispositivo.id);
        let filterCheck = checked.filter((val)=>val!==dispositivo.id);
        setChecked([...filterCheck]);
        setUsing([...filterDisp]);
        props.update([...filterDisp]);
    }
    const meter = (dispositivo)=>{
        using.push(dispositivo);
        checked.push(dispositivo.id);
        setChecked([...checked]);
        setUsing([...using]);
        props.update([...using]);
        console.log(checked);
    }

    const updates_lista = (dispositivo)=>{
        let inLista = checked.indexOf(dispositivo.id);
        console.log(inLista);
        if(inLista!==-1){
            sacar(dispositivo);
        }
        else{
            meter(dispositivo);
        }
    }

    const create_dispositivo = dispositivo =>  { return(
        <FormControlLabel
            control={<Checkbox checked={checked.indexOf(dispositivo.id)!==-1} onChange={(ev)=>updates_lista(dispositivo)}/>}
            label={dispositivo.name}
        />)
    };
    return(
        
        <div>
            <Paper>
            <h2>Dispositivos</h2>
            <div className="border">
            <FormControl component="fieldset">
                <FormGroup>
                {dispositivos.map(dispositivo => create_dispositivo(dispositivo))}
             </FormGroup>
            </FormControl>
            </div>
            </Paper>
           
        </div>
    );
}

export default Dispositivos;