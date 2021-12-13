import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Users from './components/Users';
import ModalDialogue from './components/modal/ModalDialogue';
import { authenticated, navigateTo } from './internal/state-management';
import './assets/styles/app.scss'

const App = () => {

    let [isAuthenticated, setIsAuthenticated] = useState(authenticated);

    window.addEventListener('authentication-success', e => {
      setIsAuthenticated(e.detail.authenticated);
      navigateTo('/users');
    });

    return (
        <React.Fragment>
            {
              isAuthenticated ?
              <Users /> : <Login />
            }
            <ModalDialogue />
        </React.Fragment>
    )
};

export default App;
