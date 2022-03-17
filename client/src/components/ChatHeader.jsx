import React from 'react'

const ChatHeader = () => {
  return (
    <div className="chat-container-header">
        <div className="flex items-center p-5 text-white">
            <div className="img-container">
                <img src="" alt="" />
            </div>
            <h3>Username</h3>
        </div>
        <i className="log-out-icon"></i>
    </div>
  )
}

export default ChatHeader