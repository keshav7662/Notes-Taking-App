import React, { useState } from 'react';
import styles from './AddNotes.module.css';
const AddNotes = (props) => {
    const [color,setColor] = useState('');
    const [name,setName] = useState('');
    const [error,setError] = useState('');

    const changeColor = (getColor) => {
        setColor(getColor);
    }
    const changeName = (e) => {
        const getName = e.target.value;
        setName(getName);
    }
    const submitForm = () => {
        if(name != '' && color != '') {
            const formdata = {};
            formdata.name = name;
            formdata.color = color;
            props.setGroups([...props.groups,formdata])
            props.setPopupOpen(false);
            localStorage.setItem('groups',JSON.stringify([...props.groups,formdata]))
            setError(false);
        } else {
            setError(true);
        }
    }
    return (

        <>
        
            <div className={styles['popup-form']}>

                <h3>Create New Notes group</h3>
                <div className={styles['notes-name']}>
                    <label htmlFor="group-name"><h3>Group Name</h3></label>
                    <input type="text"
                        placeholder='Enter your group name......'
                        onChange={changeName}
                    />
                </div>
                {error ? <span style={{ color: 'red' }}>Required!</span> : ''}
                <div className={styles['notes-color']}>
                    <h3>Choose Color</h3>
                    <div className={styles['color-options']}>
                        <button className={styles['color-button']} style={{ backgroundColor: '#B38BFA' }}
                            onClick={() => changeColor('#B38BFA')}></button>
                        <button className={styles['color-button']} style={{ backgroundColor: '#FF79F2' }}
                            onClick={() => changeColor('#FF79F2')}></button>
                        <button className={styles['color-button']} style={{ backgroundColor: '#43E6FC' }}
                            onClick={() => changeColor('#43E6FC')}></button>
                        <button className={styles['color-button']} style={{ backgroundColor: '#F19576' }}
                            onClick={() => changeColor('#F19576')}></button>
                        <button className={styles['color-button']} style={{ backgroundColor: '#0047FF' }}
                            onClick={() => changeColor('#0047FF')}></button>
                        <button className={styles['color-button']} style={{ backgroundColor: '#6691FF' }}
                            onClick={() => changeColor('#6691FF')}></button>
                    </div>
                </div>
                {error ? <span style={{ color: 'red' }}>Required!</span> : ''}
                <div className={styles['create-btn']}>
                    <button
                        onClick={submitForm}>Create</button>
                </div>
            </div>
        </>
    )
}

export default AddNotes
