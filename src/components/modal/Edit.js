import React, {useState} from 'react';
import { editUser } from '../../internal/api';
import { openModal } from '../../internal/state-management'
import '../../assets/styles/edit.scss'

const Edit = props => {
    
    console.log(props);

    const [credentials, setCredentials] = useState({
      name: props?.name,
      job: props?.job
    });
  
    const changeField = (field,value) => setCredentials(
      {
        ...credentials,
        [field]: value
      }
    );

    const error = {
      name: '',
      job: ''
    }
  
    const tryToEdit = () => {
      error.name = (credentials.name.length < 3) ? 
        'Length must be more than 3 symbols' : '';
      error.job = (credentials.job.length < 3) ? 
        'Length must be more than 3 symbols' : '';

      ((error.name.length <= 0) 
        && (error.job.length <= 0)) && editUser({...credentials, id: props.id});

      setCredentials({name: '', job: ''});
      openModal({type: ''});
    }

    return (
      <div className='modal-form edit'>
        <div className='header'>Edit User</div> 
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
          <span className='label-text'>Name:</span>
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
          <button onClick={() => tryToEdit()} >Edit</button>
          <button onClick={() => openModal({type: ''})} >Cancel</button>
        </div>
      </div>
    )
};

export default Edit;