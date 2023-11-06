import React, { useEffect, useState } from 'react'
import styles from './NotesChat.module.css'
import nextButton from '../assets/nextButton.png'
import backButton from '../assets/backButton.svg'
const NotesChat = ({ selectedTitle, setShowChatContainer }) => {

    const fullName = selectedTitle.name;
    const shortName = selectedTitle.name.substring(0, 2).toUpperCase();
    const backgroundColor = selectedTitle.color;
    const [chatData, setChatData] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [triggerEffect, setTriggerEffect] = useState(0);

    const getCurrentDateTime = () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateTimeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString(undefined, options);
        const formattedTime = currentDate.toLocaleTimeString(undefined, dateTimeOptions);

        return {
            time: formattedTime,
            date: formattedDate,
        };
    };

    const dataChangeHandler = (e) => {
        e.preventDefault();
        setChatData(e.target.value);
    }
    const handleEnterKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton();
        }
    };

    useEffect(() => {
        const storedChatMessages = JSON.parse(localStorage.getItem(`chatData_${fullName}`));
        if (storedChatMessages) {
            setChatMessages(storedChatMessages);
        } else {
            setChatMessages([]);
        }
    }, [fullName, triggerEffect]);

    const sendButton = () => {
        if (chatData) {
            const currentTime = getCurrentDateTime();
            const newChatMessage = { chatData, currentTime, fullName };
            const updatedChatMessages = [...chatMessages, newChatMessage];
            localStorage.setItem(`chatData_${fullName}`, JSON.stringify(updatedChatMessages));
            setChatMessages(updatedChatMessages);
            setChatData('');
            setTriggerEffect((prevTrigger) => prevTrigger + 1);
        }
    };

    const backPage = () => {
        setShowChatContainer(false)
    }
    return (
        <>
            <nav>
                <div className={styles.titles} >
                    <div className={styles['back-btn']} onClick={backPage}>
                        <img src={backButton} alt="" />
                    </div>
                    <div className={styles['short-name']} style={{ backgroundColor }}>{shortName}</div>
                    <div className={styles['full-name']}><h4>{fullName}</h4></div>
                </div>
            </nav>
            <section className={styles['chat-area']}>
                {chatMessages.map((message, index) => (
                    <div className={styles['sent-notes']}>
                        <div className={styles['date-time']}>
                            <span>{message.currentTime.time}</span>
                            <span>{message.currentTime.date}</span>
                        </div>
                        <div className={styles['notes-message']}>
                            <p key={index}>{message.chatData}</p>
                        </div>
                    </div>

                ))}
            </section>

            <div className={styles['text-area']}>
                <textarea
                    name="chatData"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Enter Your text here...."
                    onChange={dataChangeHandler}
                    onKeyDown={handleEnterKey}
                    value={chatData}
                ></textarea>
                <div className={styles['next-button']} onClick={sendButton}>
                    <img src={nextButton} alt="" />
                </div>

            </div>
        </>
    )
}

export default NotesChat
