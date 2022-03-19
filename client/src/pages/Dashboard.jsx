import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../components/ChatContainer'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [cookies, setCookie, removeCookies] = useCookies(['user'])
  const [lastDirection, setLastDirection] = useState()

  const userId = cookies.UserId

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/gendered', {
        params: { gender: user?.gender_interest }
      })

      setGenderedUsers(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
    getGenderedUsers()
  }, [user, genderedUsers])


  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:5000/user/addmatch', {
        userId,
        matchedUserId
      })

      getUser()
    } catch (err) {
      console.log(err)
    }
  }

  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  console.log(user)

  return (
    <>
      {
        user && <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {
                genderedUsers && genderedUsers.map((character, index) =>
                  <TinderCard className='swipe' key={index} onSwipe={(dir) => swiped(dir, character.user_id)} onCardLeftScreen={() => outOfFrame(character.first_name)}>
                    <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                      <h3 className='absolute bottom-0 m-3 ml-5 text-white text-3xl'>{character.first_name}</h3>
                    </div>
                  </TinderCard>
                )}
              <div className="swipe-info">
                {
                  lastDirection ? <p>You swiped {lastDirection}</p> : <p></p>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Dashboard