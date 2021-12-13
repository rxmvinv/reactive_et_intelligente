import React, { useEffect, useState } from 'react';
import { authenticated, users, 
  navigateTo, openModal } from '../internal/state-management';
import { getUsers } from '../internal/api';
import User from './User';
import '../assets/styles/users.scss'

const Users = () => {

    !authenticated && navigateTo('/login');

    let [selectedUser, setSelectedUser] = useState(null);

    let [usersList, setUsersList] = useState([]);

    window.addEventListener('users-success', e => {
      setUsersList(e.detail.users);
    });

    useEffect(() => {
      getUsers();
    }, []);

    window.addEventListener('route-navigation', e => {
      setUsersList(users);
    });

    const selectUser = (selected) => {
      setSelectedUser(usersList.find(user => user.id === selected));
      navigateTo(`users/${selected}`);
    };

    return (
        selectedUser ? 
        <User
          selectedUser={selectedUser}
          dropUser={() => setSelectedUser(null)}
        /> : 
        <div className='users-route route'>
          <div className='header'>Users</div>
          <button 
            className='create-new'
            onClick={() => openModal({type: 'create'})}
          >create new user</button>
          <div className='users-list'>
            { 
              usersList.map((user, indx) => 
              <div
                key={indx + 'user-item-list'}
                className='user-item'
              >
                <div
                  className='user-avatar'
                  onClick={() => selectUser(user.id)}
                  style={{
                    backgroundImage: `url(${user.avatar})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div className='details'>
                  <div className='field'>
                    <span className='property'>Index:</span> {indx}
                  </div>
                  <div className='field'>
                    <span className='property'>ID:</span> { user.id }
                  </div>
                  <div className='field'>
                    <span className='property'>Email:</span> { user.email }
                  </div>
                  <div className='field'>
                    <span className='property'>Firs Name:</span> { user.first_name }
                  </div>
                  <div className='field'>
                    <span className='property'>Last Name:</span> { user.last_name }
                  </div>
                </div>

                <div className='action-buttons'>
                  <button
                    onClick={() => openModal({type: 'edit'})}
                  >Edit</button>
                  <button
                    onClick={() => openModal({type: 'delete'})}
                  >Delete</button>
                </div>
              </div>)
            }
          </div>
        </div> 
    )
};

export default Users;