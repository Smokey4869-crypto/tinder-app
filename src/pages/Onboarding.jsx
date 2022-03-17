import React, { useState } from 'react'

import Nav from '../components/Nav'

const Onboarding = () => {

  const [formData, setFormData] = useState({
    user_id: '',
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    email: '',
    url: 'https://i.imgur.com/JkTM3xq.jpeg',
    about: '',
    matches: ''
  })

  const handleSubmit = () => {

  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
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
          <section className='flex flex-col p-5 text-left'>
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
                name='gender-identity'
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === 'man'} />
              <label>Man</label>

              <input
                type="radio"
                id='woman-gender-identity'
                name='gender-identity'
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'} />
              <label>Woman</label>

              <input
                type="radio"
                id='more-gender-identity'
                name='gender-identity'
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === 'more'} />
              <label>More</label>
            </div>

            <label htmlFor="show-gender" className='mt-3'>Show gender on my profile</label>
            <input
              type="checkbox"
              id='show-gender'
              name='show-gender'
              onChange={handleChange}
              checked={formData.show_gender} />

            <label>Show Me</label>
            <div className='flex flex-row mt-5'>
              <div className=''>
                <input
                  type="radio"
                  id='man-gender-interest'
                  name='gender-interest'
                  value="man"
                  onChange={handleChange}
                  checked={formData.gender_interest === 'man'} />
                <label>Man</label>

                <input
                  type="radio"
                  id='woman-gender-interest'
                  name='gender-interest'
                  value="woman"
                  onChange={handleChange}
                  checked={formData.gender_interest === 'woman'} />
                <label>Woman</label>

                <input
                  type="radio"
                  id='more-gender-interest'
                  name='gender-interest'
                  value="everyone"
                  onChange={handleChange}
                  checked={formData.gender_interest === 'everyone'} />
                <label>More</label>
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

          <section className='flex flex-col p-5 text-left'>
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