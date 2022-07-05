import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MatchDisplay = props => {

  const setClickedUser = props.setClickedUser
  const matches = props.matches
  const [matchesProfile, setMatchesProfile] = useState(null)
  const matchedUserIds = matches.map(({ user_id}) => user_id)

  const getMatches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/matches', {
        params: {
          userIds: JSON.stringify(matchedUserIds)
        }
      })

      setMatchesProfile(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  // console.log(matchesProfile)

  useEffect(() => {
    getMatches()
  })

  return (
    <div className="match-display">
      {
        matchesProfile?.map((item, index) => (
          <div className="match-display-card" 
            key={index} 
            onClick={() => setClickedUser(item)}>
              <img src={item.url} style={{width: '100%'}}/>
          </div>
        ))
      }
    </div>
  )
}

export default MatchDisplay

