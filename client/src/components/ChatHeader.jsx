import React from 'react'
import { useCookies } from 'react-cookie'

const ChatHeader = props => {
  const [cookies, setCookie, removeCookies] = useCookies(['user'])
  const user = props.user 
  const logout = () => {
    removeCookies('UserId', cookies.UserId)
    removeCookies('AuthToken', cookies.AuthToken)
    window.location.reload()
  }
  return (
    <div className="chat-container-header">
        <div className="flex items-center pl-5 text-white">
            <div className="img-container">
                <img src={user ? user.url[0] : ""} alt="" />
            </div>
            <h3>{user ? user.first_name : "Username"}</h3>
        </div>
        <i className="logout" onClick={logout}>Log Out</i>
    </div>
  )
}

export default ChatHeader