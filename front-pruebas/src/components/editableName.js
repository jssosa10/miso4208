import React, { useState } from 'react';
// import styles from './Complete.css';

function EditableName (props){
    const [state, setState] = useState({
        editing: false
    })

    const toggleEditing = () => {
        setState(prevState => ({editing: !prevState.editing}));
    }
    const handleChange= ({ target }) => {
        props.changeName(target.value);
        //toggleEditing();
    }

    const input = (
        <span>
            <input type="text" defaultValue={props.name} onChange={handleChange}  />
            {/* <i className={styles.OKIcon} onClick={handleChange} />
            <i className={styles.NoIcon} onClick={toggleEditing} /> */}
        </span>
    )

    const name = (
        <span>
            <h1>{props.name}</h1>
            {/* <i className={styles.pencilIcon} onClick={toggleEditing} /> */}
        </span>
    )

    return(
        <span>
    		{ state.editing? input : name }
  		</span>
    );
}
export default EditableName;