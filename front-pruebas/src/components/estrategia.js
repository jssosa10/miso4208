import React, { useState, useEffect } from 'react';
import contentEditable from './contentEditable';
import Versiones from './versiones';
import Pruebas from './pruebas';
import Dispositivos from './dispositivos';

const API_APPS = "http://localhost:9000/estrategias/";

function Estrategia(props){
    const [estrategia, setEstrategia] = useState({});
    const [updates, setUpdates] = useState(0);

    async function fetchData() {
        console.log("el appid = "+props.id);
        const res = await fetch(API_APPS+"one/"+props.id);
        res
          .json()
          .then(res => {setEstrategia(res[0])});
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
    }

    return(
        <div className="centrado">
            <EditableName onSave={save} value={estrategia.name} />
            <div  style={{display: 'flex',alignItems: 'stretch', width: '100%',minHeight:'100%'}}>
					{typeof estrategia.id === 'undefined'?<span />:<Pruebas EstrategiaId={estrategia.id} />}
                    {typeof estrategia.id === 'undefined'?<span/ >:<Dispositivos tipo={estrategia.web} />}
			</div>
        </div>
    )
}
export default Estrategia;