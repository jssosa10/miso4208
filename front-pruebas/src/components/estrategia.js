import React, { useState, useEffect } from 'react';
import EditableName from './editableName';
import Versiones from './versiones';
import Pruebas from './pruebas';
import Dispositivos from './dispositivos';

const API_APPS = "http://localhost:3003/estrategias/one/";

function Estrategia(props){
    const [estrategia, setEstrategia] = useState({});
    const [updates, setUpdates] = useState(0);

    async function fetchData() {
        console.log("el appid = "+props.id);
        const res = await fetch(API_APPS+props.id);
        res
          .json()
          .then(res => {setEstrategia(res[0])});
    }

    useEffect(() => {
        fetchData();
    }, [props, updates]);

    const changeName = (newName)=>{
        setEstrategia({name: newName})
    }

    return(
        <div className="centrado">
            <EditableName changeName={changeName} name={estrategia.name} />
            <div  style={{display: 'flex',alignItems: 'stretch', width: '100%',minHeight:'100%'}}>
					{typeof estrategia.id === 'undefined'?<span />:<Pruebas EstrategiaId={estrategia.id} />}
                    {typeof estrategia.id === 'undefined'?<span/ >:<Dispositivos tipo={estrategia.web} />}
			</div>
        </div>
    )
}
export default Estrategia;