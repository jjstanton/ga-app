import React from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'

const Reauthenticate = () => (
    <Modal trigger={ <button type="button" className='ui large fluid blue google button'>Reauthenticate Account</button>} centered={false}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>We've found the following gravatar image associated with your e-mail address.</p>
                <p>Is it okay to use this photo?</p>
            </Modal.Description>
        </Modal.Content>
    </Modal>
);

export default Reauthenticate;