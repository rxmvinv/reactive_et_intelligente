import React, { useState } from 'react';
import { authenticated, navigateTo } from '../internal/state-management';
import { signIn } from '../internal/api';
import '../assets/styles/login.scss'

const Login = () => {

    authenticated && navigateTo('/users');

    const [credentials, setCredentials] = useState({
      email: '',
      password: ''
    });

    const [error, setError] = useState({
      email: '',
      password: ''
    });

    const changeField = (field,value) => setCredentials(
      {
        ...credentials,
        [field]: value
      }
    );

    const trySignIn = () => {
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(credentials.email) ?
        setError({
          ...error,
          email: '' 
        }) :
        setError({
          ...error,
          email: 'Email is not valid' 
        });
      
      /^[A-Za-z]\w{7,14}$/.test(credentials.password) ?
        setError({
          ...error,
          password: ''
        }) : 
        setError({
          ...error,
          password: `Length between 7 and 14 symbols. 
          Only digits, letters and undersore allowed`
        });

      ((error.email.length <= 0) 
        && (error.password.length <= 0) &&
        ((credentials.email.length > 0) && 
        (credentials.password.length > 0))
      ) && signIn(credentials);
    }
    
    return (
      <div className='login-form route'>
        <div className='header'>Sign In</div>
        <label>
          <span className='label-text'>Email:</span>
          <input 
            type="text" 
            name="email" 
            onInput={(ev) => changeField(
              ev.target.name,
              ev.target.value
            )}
          />
          <span className='error'>{error.email}</span>
        </label>
        <label>
          <span className='label-text'>Password:</span>
          <input 
            type="password" 
            name="password" 
            onInput={(ev) => changeField(
              ev.target.name,
              ev.target.value
            )}
          />
          <span className='error'>{error.password}</span>
        </label>

        <button
          onClick={() => trySignIn()}
        >confirm</button>
      </div>
    )
};

export default Login;