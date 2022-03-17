import React, { useState } from 'react'

const AuthModal = props => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    const setShowModal = props.setShowModal
    const isSignUp = props.isSignUp
    const setIsSignUp = props.setIsSignUp

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError("Passwords need to match")
            }
            console.log("make a post request to database")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="auth-modal">
            <div className="float-right" style={{marginTop: "-23px", marginRight: "-15px"}} onClick={handleClick}>&#x2715;</div>   
            <h2>{isSignUp? 'CREATE ACCOUNT' : 'LOG IN' }</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    id='email' 
                    name='email' 
                    placeholder='Email' 
                    required={true} 
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                <input 
                    type="password" 
                    id='password' 
                    name='password' 
                    placeholder='Password' 
                    required={true} 
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                <input 
                    type="password" 
                    id='password-check' 
                    name='password-check' 
                    placeholder='Confirm your password' 
                    required={true} 
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}/>
                    <button className='secondary-btn' type='submit'>Submit</button>
                    <p>{error}</p>
            </form>
            <hr />
            <h2 className='mt-5 font-black'>GET THE APP</h2>

        </div>
    )
}

export default AuthModal