import React from 'react';
import { authenticated, navigateTo, openModal } from '../internal/state-management';
import '../assets/styles/user.scss'

const User = props => {

    console.log(props);
    const {
      selectedUser,
      dropUser
    } = props;

    !authenticated && navigateTo('/login');

    const moveBack = () => {
      navigateTo('/users');
      
      setTimeout(() => {
        dropUser();
      }, 300);
    }
    
    return (
      <div className='user-route route'>
        <div className='back-button'
          onClick={() => moveBack()
        }>Back</div>

        <div className='details'>
          <div
            className='user-avatar'
            style={{
              backgroundImage: `url(${selectedUser.avatar})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className='field'> 
            <span className='property'>ID:</span>
            { selectedUser.id } 
          </div>
          <div className='field'> 
            <span className='property'>Email:</span> 
            { selectedUser.email } 
          </div>
          <div className='field'> 
            <span className='property'>First Name:</span>
            { selectedUser.first_name } 
          </div>
          <div className='field'> 
            <span className='property'>Last Name:</span>
            { selectedUser.last_name } 
          </div>
        </div>

        <div className='action-buttons'>
          <button
            onClick={() => openModal({type: 'edit', ...selectedUser})}
          >Edit</button>
          <button
            onClick={() => openModal({type: 'delete', ...selectedUser})}
          >Delete</button>
        </div>
      </div>
    )
};

export default User;