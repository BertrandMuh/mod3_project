import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/app_context';
import { getUserFromSession, logIn } from '../serverCall';
// import { getUserFromSession, logIn } from '../../functions/useful-functions';
import './index.css'

const Login = () => {
    let { setUser } = useContext(AppContext);
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [error, setError] = useState("");
    const navigate = useNavigate()
    //   const [disabled, setDisabled] = useState(true);

    // useEffect(() => {
    //     setDisabled(formState.email && formState.password ? false : true);
    // }, [formState])

    // useEffect(() => {
    //   let autoLogin = async () => {
    //     await logIn({ email: "s@d", password: "0000" });
    //     // get session info (user)
    //     let user = await getUserFromSession()
    //     setUser(user);
    //   }
    //   autoLogin()
    // }, [])

    const handleChange = (event) => {
        let { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        // LOGIN
        // make a call to the server with this info and authenticate!
        e.preventDefault();
        await logIn(formState);
        // get session info (user)
        let user = await getUserFromSession()
        setUser(user);
        if (user) {
            navigate('/trading-avenue.com')
        }
    }

    return (
        <>
            <form autoComplete='off' className='auth form' onSubmit={(evt) => handleSubmit(evt)}>
                <div>
                    <label>
                        Email
                    </label>
                    <input type='email' name='email' className='txt-pw input' placeholder='Email...' onChange={(evt) => handleChange(evt)} />
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input type='password' name='password' className='txt-pw input' placeholder='Password...' onChange={(evt) => handleChange(evt)} />
                </div>
                <button className='log-in btn' type='submit'>Sign in</button>
            </form>
        </>
    )
}

export default Login