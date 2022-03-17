import React from 'react'

import logo from '../images/tinder-logo-white.jpg'
import colorLogo from '../images/tinder-logo-color.png'

const Nav = props => {

    // const authToken = props.authToken
    const showModal = props.showModal
    const minimal = props.minimal 

    const authToken = false

    const handleClick = () => {
        props.setShowModal(true)
        props.setIsSignUp(false)
    }

    return (
        <nav className='w-full flex justify-between mb-2 pt-3'>
            <div className="w-40 ml-4">
                <img src={minimal ? colorLogo : logo} alt="" className='w-full' />
            </div>
            {
                !authToken && !minimal && <button className='nav-btn' onClick={handleClick} disabled={showModal}>Log in</button>
            }
        </nav>
    )
}

export default Nav