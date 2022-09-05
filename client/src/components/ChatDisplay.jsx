import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChatDisplay = props => {
    const user = props.user
    const userToChat = props.userToChat

    const userId = user?.user_id
    const userToChatId = userToChat?.user_id

    const [userMessages, setUserMessages] = useState(null)
    const [userToChatMessages, setUserToChatMessages] = useState(null)

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/messages', {
                params: {
                    userId: userId, correspondingUserId: userToChatId
                }
            })

            setUserMessages(response.data)
        } catch(err) {
            console.log(err)
        }        
    }

    const getUserToChatMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/messages', {
                params: {
                    userId: userToChatId, correspondingUserId: userId
                }
            })

            setUserToChatMessages(response.data)
        } catch(err) {
            console.log(err)
        }        
    }

    useEffect(() => {
        getUsersMessages()
        getUserToChatMessages()
    }, [userMessages, userToChatMessages])

    const allMessages = []

    userMessages.forEach(m => {
        const formattedMsg = {}
        formattedMsg['name'] = user?.first_name
        formattedMsg['img'] = user?.url
        formattedMsg['message'] = m.message
        formattedMsg['timestamp'] = m.timestamp
        allMessages.push(formattedMsg)
    }) 

    
    userToChatMessages.forEach(m => {
        const formattedMsg = {}
        formattedMsg['name'] = userToChat?.first_name
        formattedMsg['img'] = userToChat?.url
        formattedMsg['message'] = m.message
        formattedMsg['timestamp'] = m.timestamp
        allMessages.push(formattedMsg)
    }) 

    console.log('userMessages', userMessages)
    console.log('formattedMsg', allMessages)

    //display messsages are shown in antichronical order
    const displayMessages = allMessages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    return (
        <div>
            <Chat displayMessages={displayMessages}/>
            <ChatInput />
        </div>
    )
}

export default ChatDisplay

const Chat = props => {
    const displayMessages = props.displayMessages
    return (
        <div className="chat-display">
            { 
                displayMessages?.map((item, index) => (
                    <div key={index} className="chat-display-item">
                        <img className='img-container' src={item.img} alt={item.first_name + ' profile'} />
                        <p>{item.name}</p>
                        <div>
                            <p>{item.message}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const ChatInput = () => {
    const [textarea, setTextarea] = useState()

    const handleChange = (value) => {
        setTextarea(value)
    }
    return (
        <div className="p-5 flex flex-col">
            <textarea
                value={textarea}
                onChange={(e) => handleChange(e.target.value)}></textarea>
            <button className="secondary-btn">Submit</button>
        </div>
    )
}