import React, {useState} from 'react'

const ChatDisplay = () => {
  return (
    <div>
        <Chat/>
        <ChatInput/>
    </div>
  )
}

export default ChatDisplay

const Chat = () => {
    return (
        <div className="chat-display">

        </div>
    )
}

const ChatInput = () => {
    const [textarea, setTextarea] = useState()
    return (
        <div className="p-5 flex flex-col">
            <textarea 
                value={textarea}
                onChange={(e) => {setTextarea(e.target.value)}}></textarea>
            <button className="secondary-btn">Submit</button>
        </div>
    )
}