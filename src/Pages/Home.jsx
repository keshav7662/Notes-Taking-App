import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Title from '../Components/Title';
import addGroup from '../assets/addGroup.png';
import bgImg from '../assets/backgroundImg.png';
import AddNotes from '../Components/AddNotes';
import NotesChat from '../Components/NotesChat';
import Lock from '../assets/Lock.svg'
const Home = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [displayPoster, setDisplayPoster] = useState(true);
    const [showChatContainer, setShowChatContainer] = useState(false)
    const handleCreateGroupClick = () => {
        setPopupOpen(true);
    };
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('groups'));
        if (data) {
            setGroups(data);
        }
    }, [])

    const closePopupHandler = () => {
        if (isPopupOpen) {
            setPopupOpen(false);
        }
    }

    return (
        <>
            <div className={`${styles.container} ${isPopupOpen ? styles['background-opacity'] : ''}`} onClick={closePopupHandler}>
                <div className={`${styles['notes-title']} ${showChatContainer ? styles['hidden'] : styles['block']}`}>
                    <h2>Pocket Notes</h2>
                    <div className={styles.groups}>
                        <button onClick={handleCreateGroupClick}>
                            <img src={addGroup} alt="" />
                            <span>Create Notes Group</span>
                        </button>
                        <div className={styles['created-groups']}>
                            {groups.map((group, index) => (
                                <Title
                                    key={index}
                                    titleData={group}
                                    selectedTitle={selectedTitle}
                                    setSelectedTitle={setSelectedTitle}
                                    setDisplayPoster={setDisplayPoster}
                                    setShowChatContainer={setShowChatContainer}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`${styles['notes-details']} ${showChatContainer ? styles['block'] : styles['hidden']}`}>ar
                    {
                        displayPoster ? (
                            <div className={styles['poster-container']}>
                                <div className={styles['notes-poster']}>
                                    <img src={bgImg} alt="" />
                                    <h3>Pocket Notes</h3>
                                    <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                                    <div className={styles['encryption-text']}>
                                        <img src={Lock} alt="" />
                                        <p>end-to-end encrypted</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            null
                        )
                    }
                    {
                        selectedTitle ?

                            (
                                <div className={`${styles['chat-container']}`}>
                                    <div className={styles['notes-chat']} >
                                        <NotesChat selectedTitle={selectedTitle} setShowChatContainer={setShowChatContainer} />
                                    </div>
                                </div>)
                            :
                            (null)
                    }

                </div>
            </div >

            {isPopupOpen && (
                <AddNotes groups={groups} setGroups={setGroups} setPopupOpen={setPopupOpen} />
            )
            }
        </>
    );
};

export default Home;
