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

    const [signedState, setSignedState] = useState('');

    const changeField = (field,value) => setCredentials(
      {
        ...credentials,
        [field]: value
      }
    );

    const trySignIn = () => {

        setError({

          password: /^[A-Za-z]\w{7,14}$/.test(credentials.password) ? '' : 
                  `Length between 7 and 14 symbols. 
                  Only digits, letters and undersore allowed`,

          email: /\S+@\S+\.\S+/.test(credentials.email) ? '' : 'Email is not valid' 
        
        });

      if ((error.email.length <= 0) 
        && (error.password.length <= 0) &&
        ((credentials.email.length > 0) && 
        (credentials.password.length > 0))
      ) {
        setSignedState('default');
        setTimeout(() => signIn(credentials), 300)
      }
    }
    
    return (
      <div className={`login-form route ${signedState}`}>
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