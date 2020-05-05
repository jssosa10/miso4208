import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField  from '@material-ui/core/TextField';


const API_APPS = "http://localhost:9000/pruebas";
const API_UPLOAD = "http://localhost:9000/upload/script";

function Prueba(props){
    const [name, setName] = useState("");
    const [tipo, setTipo] = useState(-1);
    const [file, setFile] = useState({});

    const open = props.prueba!==0;

    async function fetchData() {
      const res = await fetch(API_APPS+'/one/'+props.prueba);
      res
        .json()
        .then(res => {console.log(res);setName(res[0].name);setTipo(res[0].tipo)});
     }

    useEffect(() => {
      fetchData();
    }, [props]);
    
    const create_body = () => {
      return JSON.stringify(
        {
          "name": name,
          "tipo": tipo
        }
      );
    }
    async function update() {
      const res = await fetch(API_APPS+"/"+props.prueba, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: create_body()
      }).then(d => {
       console.log(d);
      });
    }
    async function upload(){
       const data = new FormData();
       data.append('script', file);
       const res = await fetch(API_UPLOAD+`?app=${props.name}&version=${name}&type=e2e`, {
         method: 'POST',
         body: data
       }).then(d => {
         console.log(d);
       })
    }


  async function deleteData() {
    const res = await fetch(API_APPS+"/"+props.prueba, {
      method: 'DELETE'
    }).then(res => {
        //console.log(res);
        //props.handleBack();
      })
  };

    const updateName = (event) =>{
      setName(event.target.value);
      console.log(event.target.value);
    }

    const deleteP = ()=>{
      deleteData();
    }

    const save = ()=>{
      upload();
      update();
      props.close();
    }

    const form = () => {
      return(
      <form>
        <label>
          Nombre:
          <input type="text" value={name} onChange={updateName}/>
        </label>
        <Autocomplete
            id="combo-box-demo"
            //value={tiposPruebas.filter(v=>v.id===tipo)[0].name}
            options={tiposPruebas}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={(e, v) => { setTipo(v.id) }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />
        <label>
          File:
          <input type="file" onChange={(ev)=>{setFile(ev.target.files[0])}}/>
        </label>
        </form>)
    }

    return (
      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Editar Prueba</DialogTitle>
        <div>
        {form()}
        <Button variant="contained" color="primary" onClick={save}>Guardar</Button>
        <Button variant="contained" color="secondary" onClick={props.close}>Salir</Button>
        <Button variant="contained" color="secondary" onClick={()=>{deleteP();props.close()}}>Borrar</Button>
        </div>
        
      </Dialog>
    );

   
}
const tiposPruebas = [
    {id:0, name: "Random"},
    {id:1, name: "E2E"},
    {id:2, name: "BDT"},
    {id:3, name: "Mutation"}
]

export default Prueba;