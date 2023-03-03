import React from 'react'
import Login from '../../components/Login_form'
import SignUp from '../../components/SignUp_form'
import './index.css'

const Auth = () => {
    const retrunForm = (el) => {
        if (el.target.textContent === 'Sign up') {
            el.target.style.color = 'red'
            // el.
        }
    }
    return (
        <div id='auth'>
            <div className='auth-img-container'>
                <img src="https://media.istockphoto.com/id/1358049777/photo/financial-analyst-working-on-a-computer-with-multi-monitor-workstation-with-real-time-stocks.jpg?b=1&s=612x612&w=0&k=20&c=B2mDo_W0yb6mcWc89HvehhZCtmpMX9Z-5WnNdy86x6c=" alt="" />
            </div>
            <div className='auth-div-container'>
                <div className='auth-div'>
                    <div className='auth-tab'>
                        <div onClick={(event) => retrunForm(event)} className='active-tab'>Sign up</div>
                        <div onClick={(event) => retrunForm(event)} className=''>Sign in</div>
                    </div>
                    <SignUp />
                    {/* <Login /> */}
                </div>
            </div>

        </div>
    )
}

export default Auth