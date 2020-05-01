import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const API_APPS = "http://localhost:9000/apps";

function Version(props){
    const open = props.version!==0;
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Editar Versión</DialogTitle>
      </Dialog>
    );
}

export default Version;