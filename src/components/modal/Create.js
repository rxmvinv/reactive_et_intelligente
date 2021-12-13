import React, { useState } from 'react';
import { createUser } from '../../internal/api';
import { openModal } from '../../internal/state-management'
import '../../assets/styles/create.scss'

const Create = props => {
    console.log(props);

    const error = {
      name: '',
      job: ''
    }

    const [credentials, setCredentials] = useState({
      name: '',
      job: ''
    });
  
    const changeField = (field,value) => setCredentials(
      {
        ...credentials,
        [field]: value
      }
    );
  
    const tryToCreate = () => {
      error.name = (credentials.name.length < 3) ? 
        'Length must be more than 3 symbols' : '';
      error.job = (credentials.job.length < 3) ? 
        'Length must be more than 3 symbols' : '';

      ((error.name.length <= 0) 
        && (error.job.length <= 0)) && createUser(credentials);

      setCredentials({name: '', job: ''});
      openModal({type: ''});
    }

    return (
      <div className='modal-form create'>
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
          <button onClick={() => openModal({type: ''})} >Cancel</button>
        </div>
      </div>
    )
};

export default Create;