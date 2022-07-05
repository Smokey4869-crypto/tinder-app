import React, { useState } from 'react'

import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import MatchDisplay from './MatchDisplay'

const ChatContainer = props => {
  const user = props.user

  const [ clickedUser, setClickedUser] = useState(null)

  return (
    <div className="chat-container">
        <ChatHeader user={user}/>
        <div>
            <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
            <button className="option" disabled={!clickedUser}>Messages</button>
            <button className="option">Likes You</button>
        </div>
        {!clickedUser && <MatchDisplay matches={user.matches} setClickedUser={setClickedUser} />}
        {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  )
}

export default ChatContainer