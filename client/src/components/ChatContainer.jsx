import React, { useState } from 'react'

import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import MatchDisplay from './MatchDisplay'

const ChatContainer = props => {
  const user = props.user

  const [ userToChat, setUserToChat] = useState(null)

  const handleClick = (value) => {
    setUserToChat(value)
  }

  return (
    <div className="chat-container">
        <ChatHeader user={user}/>
        <div>
            <button className="option" onClick={handleClick(null)}>Matches</button>
            <button className="option" disabled={!userToChat}>Messages</button>
            <button className="option">Likes You</button>
        </div>
        {!userToChat && <MatchDisplay matches={user.matches} setUserToChat={handleClick} />}
        {userToChat && <ChatDisplay user={user} userToChat={userToChat} />}
    </div>
  )
}

export default ChatContainer