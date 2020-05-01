import React, { useState, useEffect } from 'react';
import contentEditable from './contentEditable';
import Versiones from './versiones';
import Estrategias from './estrategias';

const API_APPS = "http://localhost:9000/apps";

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
            <EditableName  value={app.name} onSave={save} />
            <p>{app.description}</p>
            <div  style={{display: 'flex',alignItems: 'stretch', width: '100%',minHeight:'100%'}}>
					<Estrategias appId={props.id} handleChange={props.handleChange}/>

					<Versiones appId = {props.id}/>
			</div>
        </div>
    )
}
export default App;