import React, { useState } from 'react'
import Login from '../../components/Login_form'
import SignUp from '../../components/SignUp_form'
import './index.css'

const Auth = () => {

    const [formTab, setFormTab] = useState('Sign up')

    const handleClick = (el) => {
        let { textContent } = el.target
        let authTabChildren = Array.from(document.getElementsByClassName('auth-tab')[0].children)
        authTabChildren.forEach(child => {
            if (child.textContent === textContent) {
                child.classList.add('active-tab')
                setFormTab(textContent)
            }
            else {
                child.classList.remove('active-tab')
            }
        })
    }

    return (
        <div id='auth'>
            <div className='auth-img-container'>
                <img src="https://media.istockphoto.com/id/1358049777/photo/financial-analyst-working-on-a-computer-with-multi-monitor-workstation-with-real-time-stocks.jpg?b=1&s=612x612&w=0&k=20&c=B2mDo_W0yb6mcWc89HvehhZCtmpMX9Z-5WnNdy86x6c=" alt="" />
            </div>
            {/* <div className='auth-div-container'> */}
            <div className='auth-div'>
                <div className='auth-tab'>
                    <div onClick={(event) => handleClick(event)} className='left active-tab'>Sign up</div>
                    <div onClick={(event) => handleClick(event)} className='right'>Sign in</div>
                </div>
                {formTab === 'Sign up' ? <SignUp /> : <Login />}


            </div>
            {/* </div> */}

        </div>
    )
}

export default Auth