import React, { useState, useEffect } from 'react';
import EditableName from './editableName';
import Versiones from './versiones';
import Estrategias from './estrategias';

const API_APPS = "http://localhost:3003/apps";

function App(props){
    const [app, setApp] = useState({});
    const [updates, setUpdates] = useState(0);

    async function fetchData() {
        console.log("el appid = "+props.id);
        const res = await fetch(API_APPS+'/'+props.id);
        res
          .json()
          .then(res => {console.log(res);setApp(res[0])});
    }

    useEffect(() => {
        fetchData();
        console.log(app);
    }, [props, updates]);

    const changeName = (newName)=>{
        setApp({name: newName})
    }

    return(
        <div className="centrado">
            <EditableName changeName={changeName} name={app.name} />
            <p>{app.description}</p>
            <div  style={{display: 'flex',alignItems: 'stretch', width: '100%',minHeight:'100%'}}>
					<Estrategias appId={props.id} handleChange={props.handleChange}/>

					<Versiones appId = {props.id}/>
			</div>
        </div>
    )
}
export default App;