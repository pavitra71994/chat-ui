import { Alert, Badge, ToastBody, Label } from 'reactstrap';
import React, { useState } from 'react';
import './IncomingMessage.css';


function IncomingMessage(props) {
    return (  
        <div className={props.message.sender === props.user ? "incomingMessageBoxSent" : 'incomingMessageBoxReceived'}>
                <Alert color={props.message.sender === props.user ? "primary" : 'secondary'} className='message'>
                    {props.message && props.message.message}
                    <Badge color={props.message.sender === props.user ? "primary" : 'secondary'} className='sender'>
                        {props.message && props.message.sender}
                    </Badge>
                </Alert>
                
        </div>
    );
}

export default IncomingMessage;