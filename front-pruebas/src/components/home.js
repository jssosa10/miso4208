import React, { useState, useEffect } from 'react';
import Apps from './apps';
import App from './app';
import Estrategia from './estrategia'


function Home(){
    const [appId, setAppId] = useState(0);
    const [tipoApp, setTipoApp] = useState(0);
    const [appName, setAppName] = useState("");
    const handleChangeApp = id => {
        setAppId(id);
    };
    const [estrategiaId, setEstrategiaId] = useState(0);
    const handleChangeEstrategia = id => {
        setEstrategiaId(id);
    };
    const render = () =>{
        if(appId===0)
            return <Apps key={1} handleChange={handleChangeApp} />;
        else if(estrategiaId===0)
            return <App key={1} id={appId} updateName={(name)=>setAppName(name)} updateTipo={(tipo)=>{setTipoApp(tipo)}} handleChange={handleChangeEstrategia} handleBack={()=>{setAppId(0)}}/>;
        else
            return <Estrategia key={1} name = {appName} id={estrategiaId} tipo={tipoApp} appId={appId} handleBack={()=>{setEstrategiaId(0)}}/>
    }
    return(
        <div>
            {render()}
        </div>
    );
}

export default Home;