import React from 'react'

const Login = () => {
    return (
        <>
            <form className='auth form'>
                <div>
                    <label>
                        Email
                    </label>
                    <input type='email' className='txt-pw input' placeholder='Email...' />
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input type='password' className='txt-pw input' placeholder='Password...' />
                </div>
                <button className='log-in btn' type='submit'>Login</button>
            </form>
        </>
    )
}

export default Login