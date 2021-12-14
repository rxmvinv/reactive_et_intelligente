import React, { useState } from 'react';
import { createUser } from '../../internal/api';
import { openModal } from '../../internal/state-management'
import '../../assets/styles/create.scss'

const Create = props => {

    const [error, setError] = useState({
      name: '',
      job: ''
    });

    const [credentials, setCredentials] = useState({
      name: '',
      job: ''
    });

    const [isReleasing, setIsReleasing] = useState('');
  
    const changeField = (field,value) => setCredentials(
      {
        ...credentials,
        [field]: value
      }
    );
  
    const tryToCreate = () => {
      const errorMessage = 'Length must be more than 3 symbols';
      setError({
        ...error,
        name: (credentials.name.length < 3) ? errorMessage : '',
        job: (credentials.job.length < 3) ? errorMessage : '' 
      });

      if (
        (error.name.length <= 0) 
        && (error.job.length <= 0) &&
        ((credentials.name.length > 0) && 
        (credentials.job.length > 0))
      ) { 
        createUser(credentials);
        setCredentials({name: '', job: ''});
        openModal({type: ''});
      }
    }

    const smoothlyClose = () => {
      setIsReleasing('released');
      setTimeout(() => openModal({type: ''}), 300);
    }

    return (
      <div className={`modal-form create ${isReleasing}`}>
        <div className='header'>Create New User</div>
        <label>
          <span className='label-text'>Name:</span>
          <input 
            type="text" 
            name="name" 
            onInput={(ev) => changeField(
              ev.target.name,
              ev.target.value
            )}
          />
          <span className='error'>{error.name}</span>
        </label>
        <label>
          <span className='label-text'>Job:</span>
          <input 
            type="text" 
            name="job" 
            onInput={(ev) => changeField(
              ev.target.name,
              ev.target.value
            )}
          />
          <span className='error'>{error.job}</span>
        </label>
        <div className='action-buttons'>
          <button onClick={() => tryToCreate()} >Create</button>
          <button onClick={() => smoothlyClose()} >Cancel</button>
        </div>
      </div>
    )
};

export default Create;