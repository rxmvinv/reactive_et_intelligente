import React, { useState } from 'react';
import { authenticated, navigateTo, modal } from '../../internal/state-management';
import Create from './Create';
import Edit from './Edit';
import Delete from './Delete';

const ModalDialogue = () => {

    !authenticated && navigateTo('/login');

    const [modalDetails, setModalDetails] = useState(modal);
    const components = {
      create: Create,
      edit: Edit,
      delete: Delete
    }

    window.addEventListener('opened-modal', e => {
      setModalDetails(e.detail.modal);
    });

    function Component(props) {
      const Dialog = components[modalDetails.type];
      return <Dialog {...modalDetails} />;
    }
  
    
    return (
      (authenticated && modalDetails.type) ?
        <Component /> :
        <React.Fragment></React.Fragment>
    )
};

export default ModalDialogue;