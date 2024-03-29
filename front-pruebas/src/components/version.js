import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const API_APPS = "http://localhost:9000/versiones";
const API_UPLOAD = "http://localhost:9000/upload/apk";

function Version(props){
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [file, setFile] = useState({});

    const open = props.version!==0;

    async function fetchData() {
      const res = await fetch(API_APPS+'/one/'+props.version);
      res
        .json()
        .then(res => {console.log(res);setName(res[0].nombre)});
     }

    useEffect(() => {
      fetchData();
    }, [props]);
    

    const create_body = () => {
      return JSON.stringify(
        {
          "name": name,
          "link": link
        }
      );
    }
    async function update() {
      const res = await fetch(API_APPS+"/"+props.version, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: create_body()
      }).then(d => {
       console.log(d);
      });
    }
    async function upload(){
      const data = new FormData();
      data.append('apk', file);
      const res = await fetch(API_UPLOAD+`?app=${props.name}&version=${name}&type=mobile`, {
        method: 'POST',
        body: data
      }).then(d => {
        console.log(d);
      })
    }


  async function deleteData() {
    const res = await fetch(API_APPS+"/"+props.version, {
      method: 'DELETE'
    }).then(res => {
        //console.log(res);
        //props.handleBack();
      })
  };

    const web = () => {
      return (
        <form>
        <label>
          Nombre:
          <input type="text" value={name} onChange={updateName}/>
        </label>
        <label>
          Enlace:
          <input type="text" onChange={updateLink}/>
        </label>
        </form>
      );
    }

    const updateName = (event) =>{
      setName(event.target.value);
      console.log(event.target.value);
    }
    const updateLink = (event)=>{
      setLink(event.target.value);
    }

    const deleteV = ()=>{
      deleteData();
    }

    const save = ()=>{
      if(web!==1){
        upload();
      }
      update();
      props.close();
    }

    const mobile = () => {
      return(
      <form>
        <label>
          Nombre:
          <input type="text" value={name} onChange={updateName}/>
        </label>
        <label>
          Enlace:
          <input type="text" onChange={updateLink} />
        </label>
        <label>
          APK:
          <input type="file" onChange={(ev)=>{setFile(ev.target.files[0])}}/>
        </label>
        </form>)
    }

    return (
      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Editar Versión</DialogTitle>
        <div>
        {props.web===1?web():mobile()}
        <Button variant="contained" color="primary" onClick={save}>Guardar</Button>
        <Button variant="contained" color="secondary" onClick={props.close}>Salir</Button>
        <Button variant="contained" color="secondary" onClick={()=>{deleteV();props.close()}}>Borrar</Button>
        </div>
        
      </Dialog>
    );
}

export default Version;