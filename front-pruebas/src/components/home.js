import React, { useState, useEffect } from 'react';
import Apps from './apps';
import App from './app';
import Estrategia from './estrategia'


function Home(){
    const [appId, setAppId] = useState(0);
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
            return <App key={1} id={appId}  handleChange={handleChangeEstrategia}/>;
        else
            return <Estrategia key={1} id={estrategiaId} appId={appId}/>
    }
    return(
        <div>
            {render()}
        </div>
    );
}

export default Home;