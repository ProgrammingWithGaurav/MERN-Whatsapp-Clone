import React from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';

// Icons
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from '../SidebarChat/SidebarChat';
import { useStateValue } from '../../StateProvider';

function Sidebar() {
    const [{user}, dispatch] = useStateValue();
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src={user?.image} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder='Search or start a new chat' />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
