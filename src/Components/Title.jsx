import React, { useState } from 'react'
import styles from './Title.module.css'
const Title = ({ titleData,selectedTitle,setSelectedTitle, setDisplayPoster, setShowChatContainer }) => {

  const shortName = titleData.name.substring(0, 2).toUpperCase();
  const fullName = titleData.name;
  const backgroundColor = titleData.color;
  
  const setTitle = () => {
    setSelectedTitle(titleData);
    setDisplayPoster(false);
    setShowChatContainer(true);
  }
  const selected = titleData === selectedTitle ? '#F7ECDC':''
  return (
    <>
      <div className={styles.titles} onClick={setTitle} style={{backgroundColor:selected}}>
        <div className={styles['short-name']} style={{ backgroundColor }}>{shortName}</div>
        <div className={styles['full-name']}><h4>{fullName}</h4></div>
      </div>

    </>
  )
}

export default Title
