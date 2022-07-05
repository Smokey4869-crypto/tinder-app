import React from 'react'
import { useState } from 'react'

import AuthModal from '../components/AuthModal'
import Nav from '../components/Nav'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const authToken = true

    const handleClick = () => {
        console.log("clicked")
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className='overlay'>
            <Nav 
                minimal={false} 
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}/>
            <h1 className='mb-3 mt-32 font-extrabold' style={{ fontSize: "90px", color: "rgba(255,255,255)"}}>Swipe Right&#174;</h1>
            <button className="primary-btn" onClick={handleClick}>
                {
                    !authToken ? "Signout" : "Create Account"
                }
            </button>

            {
                showModal && (
                    <AuthModal 
                        setShowModal={setShowModal}
                        isSignUp={isSignUp}/>
                )
            }
        </div>
    )
}

export default Home