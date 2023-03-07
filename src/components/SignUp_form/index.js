// import axios from 'axios'
import React, { useState } from 'react'
import { signUp } from '../serverCall';
import './index.css'

const SignUp = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    // console.log(userData);


    const handleChange = (el) => {
        const { name, value } = el.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await signUp(userData)
        console.log(response.data);

    }
    return (
        <>
            <form autoComplete='off' className='auth form' onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label>
                        Name
                    </label>
                    <input type='text' name='name' className='txt-pw input' placeholder='Name...' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>
                        Email
                    </label>
                    <input type='email' name='email' className='txt-pw input' placeholder='Email...' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input type='password' name='password' className='txt-pw input' placeholder='Password...' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>
                        Confirm Password
                    </label>
                    <input type='password' name='confirmPassword' className='txt-pw input' placeholder='Confirm password...' onChange={(e) => handleChange(e)} />
                </div>
                <div id='terms' >
                    <input id='checkbox' type="checkbox" />
                    <label>I agree to the <strong>Terms of User</strong></label>
                </div>

                <label className='error'>
                    {

                    }
                </label>
                <button className='sign-up btn' type='submit'>Sign Up</button>
            </form>
        </>
    )
}

export default SignUp