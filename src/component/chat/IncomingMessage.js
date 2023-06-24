import { Alert, Badge, ToastBody, Label } from 'reactstrap';
import React, { useState } from 'react';
import './IncomingMessage.css';


function IncomingMessage(props) {
    const timestamp = new Date(props.message.datetime);
    console.log(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const time = timestamp.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});  

    return (  
        <div className={props.message.sender === props.user ? "messageBoxSent" : 'messageBoxReceived'}>
                <Alert color={props.message.sender === props.user ? "primary" : 'secondary'} 
                    className={props.message.sender === props.user ? "messageSent" : 'messageReceived'} >
                    {props.message && props.message.message}
                    <Badge color={props.message.sender === props.user ? "primary" : 'secondary'} className='sender'>
                        {props.message && props.message.sender}
                    </Badge>
                    <Label for="exampleEmail" className='dateStyle'>
                        {time}
                    </Label>
                </Alert>
                
        </div>
    );
}

export default IncomingMessage;