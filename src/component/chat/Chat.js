import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';
import IncomingMessage from './IncomingMessage';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import './Chat.css';
import { FcAdvance } from "react-icons/fc";

var stomp = null;
function Chat() {
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState(null);
    const [chatThread, setChatThread] = useState([]);
    const [message, setMessage ] = useState({
        sender: null,
        message: null,
        datetime: null
    });

    const onChangeName = (e) => {
        setUser(e.target.value);
    }

    const onRegister = () => {
        let Sock = new SockJS('https://chatserver-lzop.onrender.com/ws')
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
        if(stomp && message.message){
            const mes = {
                sender: message.sender,
                message: message.message,
                datetime: new Date()
            }
            stomp.send('/app/message',{}, JSON.stringify(mes));
            setMessage({...message, message: ""});
        }
    }

    const onChangeMessage = (e) => {
        setMessage({...message, message: e.target.value});
    }

    return ( 
    <div className='containerBox'>
        { connected ? 
        <div>
            <Label className='chatroomStyle'>
                Public Chatroom
            </Label>
        <div className="bg-light border containerBox">
            { chatThread.map(e => 
                        <IncomingMessage
                            key={e.sender + e.message}
                            message={e}
                            user={user}
                        />
                    )
            }       
            
        </div>
        <div className='sendingText'>
            < Input type='text' bsSize="lg" onChange={onChangeMessage} value={message.message}/>
            <Button color="primary" onClick={onSend}>Send</Button>
        </div>
        </div>
    : 
        <div className='containerBoxRegister'>
            < Input type='text' bsSize="sm" onChange={onChangeName} className='registerTxtStyle' placeholder='Please type your name to continue'/>
            <FcAdvance size={50} onClick={onRegister} className='buttonRegisterStyle'/>
        </div>

        }
    </div>
    )
}

export default Chat;