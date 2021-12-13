import React, { useEffect, useState } from 'react';
import { authenticated, users,
  navigateTo, openModal } from '../internal/state-management';
import { getUsers } from '../internal/api';
import User from './User';
import '../assets/styles/users.scss'

const Users = () => {

    !authenticated && navigateTo('/login');

    let [selectedUser, setSelectedUser] = useState(null);
    let [contentIsSwitched, setSwitchedContent] = useState('default');

    let [usersList, setUsersList] = useState([]);

    window.addEventListener('users-success', e => {
      setUsersList(e.detail.users);
    });

    useEffect(() => {
      getUsers();
    }, []);

    useEffect(() => {
      (window.location.pathname.split('/')[2] && 
        selectUser(window.location.pathname.split('/')[2]));
    }, [users])

    window.addEventListener('route-navigation', e => {
        setTimeout(() => {
          (e.detail.path.split('/')[0].length <= 0) && 
          setSwitchedContent('default');
        }, 300);
      setUsersList(users);
    });

    const selectUser = (selected) => {
      setSwitchedContent('forward');
      
      setTimeout(() => {
        setSelectedUser(usersList.find(user => user.id === parseInt(selected)));
        window.location.pathname.split('/')[2] ?
          navigateTo(`${selected}`) :
          navigateTo(`users/${selected}`);
      }, 300);
    
    };

    return (
        selectedUser ? 
        <div className={`wrapper ${contentIsSwitched}`}>
          <User
            selectedUser={selectedUser}
            dropUser={() => setSelectedUser(null)}
          />
        </div> : 
        <div className={`users-route route ${contentIsSwitched}`}>
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