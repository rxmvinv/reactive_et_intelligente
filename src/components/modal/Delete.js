import React, { useState } from 'react';
import { removeUser } from '../../internal/api';
import { openModal } from '../../internal/state-management'
import '../../assets/styles/delete.scss'

const Delete = props => {

    const [isReleasing, setIsReleasing] = useState('');

    const tryToRemove = id => {
      removeUser(id);
      openModal({type: ''});
    }

    const smoothlyClose = () => {
      setIsReleasing('released');
      setTimeout(() => openModal({type: ''}), 300);
    }

    return (
      <div className={`modal-form delete ${isReleasing}`}>
        <div className='header'>Delete User</div>
        <div className='content'>
          Are you sure you want to remove selected user?
        </div>
        <div className='action-buttons'>
          <button onClick={() => tryToRemove(props.id)} >Delete</button>
          <button onClick={() => smoothlyClose()} >Cancel</button>
        </div>
      </div>
    )
};

export default Delete;