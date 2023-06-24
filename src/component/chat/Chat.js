import React, { useState } from 'react';
import { Button, Container, Input, Label } from 'reactstrap';
import IncomingMessage from './IncomingMessage';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import './Chat.css';

var stomp = null;
function Chat() {
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState(null);
    const [chatThread, setChatThread] = useState([]);
    const [message, setMessage ] = useState({
        sender: null,
        message: null
    });

    const onChangeName = (e) => {
        setUser(e.target.value);
    }

    const onRegister = () => {
        let Sock = new SockJS('http://localhost:8080/ws')
        stomp = over(Sock);
        stomp.connect({}, onConnected, onError);
        setMessage({...message, sender: user});

    }

    const onConnected = () => {
        setConnected(true);
        stomp.subscribe('/chatroom/public', onMessageReceived);
    }

    const onMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        chatThread.push(payloadData);
        setChatThread([...chatThread])

        console.log(chatThread);
    }

    const onError = (err) => {
        console.log(err);
    }

    const onSend = () => {
        if(stomp){
            const mes = {
                sender: message.sender,
                message: message.message
            }
            stomp.send('/app/message',{}, JSON.stringify(mes));
            setMessage({...message, message: ""});
        }
    }

    const onChangeMessage = (e) => {
        setMessage({...message, message: e.target.value});
    }

    return ( <div>
        { connected ? 
        <div className="bg-light border containerBox">
            { chatThread.map(e => 
                        <IncomingMessage
                            key={e.sender + e.message}
                            message={e}
                            user={user}
                        />
                    )
            }       
            <div className='sendingText'>
                < Input bsSize="lg" onChange={onChangeMessage} value={message.message}/>
                <Button color="primary" onClick={onSend}>Send</Button>
            </div>
        </div>
    : 
    <div>
        < Input bsSize="lg" onChange={onChangeName}/>
        <Button color="primary" onClick={onRegister}>Register</Button>
    </div>

        }
    </div>)
}

export default Chat;