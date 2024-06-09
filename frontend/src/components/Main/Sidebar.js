import React from 'react'
import PublicIcon from '@mui/icons-material/Public'
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <div className='sidebar-options'>
          <div className='sidebar-option'>
            <Link to='/calendar'>Calendar</Link>
          </div>
          <div className='sidebar-option'>
            <Link to='/profile'>PROFILE</Link>
            <div className='link'>
              <div className='link-tag'>
                <PublicIcon />
                <Link>Question</Link>
              </div>
              <div className='tags'>
                <p>Tags</p>
                <p>Users</p>
              </div>
            </div>
          </div>
          <div className='sidebar-option'>
            <p>COLLECTIVES</p>
            <div className='link'>
              <div className='link-tag'>
                <StarIcon />
                <Link>Explore Collectives</Link>
              </div>
            </div>
          </div>
          <div className='sidebar-option'>
            <p>Find A Job</p>
            <div className='link'>
              <div className='link-tag'>
                <Link>Job</Link>
              </div>
              <div className='link-tag'>
                <Link>Companies</Link>
              </div>
            </div>
          </div>
          <div className='sidebar-option'>
            <p>Chat Rooms</p>
            <div className='link'>
              <div className='link-tag'>
                <SendIcon />
                <Link>Join a room</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar