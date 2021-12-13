import React from 'react';
import { removeUser } from '../../internal/api';
import { openModal } from '../../internal/state-management'
import '../../assets/styles/delete.scss'

const Delete = props => {
    console.log(props);

    const tryToRemove = id => {
      removeUser(id);
      openModal({type: ''});
    }

    return (
      <div className='modal-form delete'>
        <div className='header'>Delete User</div>
        <div className='content'>
          Are you sure you want to remove selected user?
        </div>
        <div className='action-buttons'>
          <button onClick={() => tryToRemove(props.id)} >Delete</button>
          <button onClick={() => openModal({type: ''})} >Cancel</button>
        </div>
      </div>
    )
};

export default Delete;