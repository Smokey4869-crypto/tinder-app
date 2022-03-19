import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import Nav from '../components/Nav'

const Onboarding = () => {
  let navigate = useNavigate()
  const [cookies, setCookie, removeCookies] = useCookies(['user'])
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    url: '',
    about: '',
    matches: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:5000/user/update', { formData })
      const success = response.status == 200
      if (success) navigate ('/dashboard')
    } catch(err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    console.log('changed')
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name] : value
    }))
  }

  console.log(formData)

  return (
    <div>
      <Nav
        minimal={true}
        setShowModal={() => { }}
        showModal={false}
      />
      <div className='onboarding'>
        <h2 className='mt-6'>CREATE ACCOUNT</h2>

        <form className='flex justify-center' onSubmit={handleSubmit}>
          <section className='flex flex-col p-5 text-left' style={{width: "600px"}}>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id='first_name'
              name='first_name'
              placeholder='First Name'
              required={true}
              value={formData.first_name}
              onChange={handleChange} />

            <label htmlFor="dob_day">Birthday</label>
            <div className='flex flex-row'>
              <input
                type="number"
                id='dob_day'
                name='dob_day'
                placeholder='DD'
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                type="number"
                id='dob_month'
                name='dob_month'
                placeholder='MM'
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                type="number"
                id='dob_year'
                name='dob_year'
                placeholder='YY'
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <label>Gender</label>
            <div className='flex flex-row'>
              <input
                type="radio"
                id='man-gender-identity'
                name='gender_identity'
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === 'man'} />
              <label htmlFor='man-gender-identity'>Man</label>

              <input
                type="radio"
                id='woman-gender-identity'
                name='gender_identity'
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'} />
              <label htmlFor='woman-gender-identity'>Woman</label>

              <input
                type="radio"
                id='more-gender-identity'
                name='gender_identity'
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === 'more'} />
              <label htmlFor='more-gender-identity'>More</label>
            </div>

            <label htmlFor="show-gender" className='mt-3'>Show gender on my profile</label>
            <input
              type="checkbox"
              id='show-gender'
              name='show_gender'
              value="show-gender"
              onChange={handleChange}
              checked={formData.show_gender === true } />

            <label>Show Me</label>
            <div className='flex flex-row mt-5'>
              <div className=''>
                <input
                  type="radio"
                  id='man-gender-interest'
                  name='gender_interest'
                  value="man"
                  onChange={handleChange}
                  checked={formData.gender_interest === 'man'} />
                <label htmlFor='man-gender-interest'>Man</label>

                <input
                  type="radio"
                  id='woman-gender-interest'
                  name='gender_interest'
                  value="woman"
                  onChange={handleChange}
                  checked={formData.gender_interest === 'woman'} />
                <label  htmlFor='woman-gender-interest'>Woman</label>

                <input
                  type="radio"
                  id='everyone-gender-interest'
                  name='gender_interest'
                  value="everyone"
                  onChange={handleChange}
                  checked={formData.gender_interest === 'everyone'} />
                <label  htmlFor='everyone-gender-interest'>More</label>
              </div>
            </div>

            <label htmlFor="about" className='mt-5'>About Me</label>
            <input 
              type="text"
              id='about'
              name='about'
              required={true}
              placeholder="I love deductive science"
              value={formData.about}
              onChange={handleChange} />
            <input type="submit" />
          </section>

          <section className='flex flex-col p-5 text-left' style={{width: "300px"}}>
            <label htmlFor="about">Profile Picture</label>
            <input 
              type="url"
              name='url'
              id='url'
              onChange={handleChange}
              required={true} />
            <div>
              <img className='w-full' src={formData.url} alt="" />
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Onboarding