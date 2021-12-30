import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarChat.css';

function SidebarChat() {
    return (
        <div className='sidebarChat'>
            <Avatar />
            <div className="sidebarChat__info">
                <h2>Chats</h2>
                <p>Let's Chat 💬</p>
            </div>
        </div>
    )
}

export default SidebarChat
