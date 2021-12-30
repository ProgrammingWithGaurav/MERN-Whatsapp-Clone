
import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        console.log(response.data);
        setMessages(response.data);
      })
  }, [])

  useEffect(() => {
    let pusher = new Pusher('6116801065b3e3115d27', {
      cluster: 'ap2'
    });

    let channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])
  return (
    <div className='app'>
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  )
}

export default App
