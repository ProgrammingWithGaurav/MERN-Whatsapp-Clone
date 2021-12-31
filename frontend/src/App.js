import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import Login from './components/Login/Login';
import { useStateValue } from './StateProvider';
import { auth } from 'firebase';
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from 'react-router-dom';

function App() {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, [])


  useEffect(() => {
    auth().onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: {
            name: authUser.displayName,
            image: authUser.photoURL
          }
        })
      } else {
        if (user === null) {
          const username = prompt('Type your username to join', 'Your name');
          if (username) {
            dispatch({
              type: 'SET_USER',
              user: {
                name: username
              }
            })
          }
        }
      }
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
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/' >
          <div className='app'>
            <div className="app__body">
              <Sidebar />
              <Chat messages={messages} />
            </div >
          </div >
        </Route>
      </Switch>
    </Router>
  )
}

export default App
