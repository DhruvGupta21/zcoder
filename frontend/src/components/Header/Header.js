import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import { Avatar } from '@mui/material';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Header() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful
        }).catch((error) => {
            // An error happened
            console.error("Error signing out:", error);
        });
    };

    const handleLogoCLick = () => {
        navigate("/");
    }

    return (
        <header>
            <div className='header-container'>
                <div className='header-left'>
                    <p onClick={handleLogoCLick}>
                        <img
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png'
                            alt='Logo' />
                    </p>
                    <h3>Products</h3>
                </div>
                <div className='header-middle'>
                    <div className='header-search-container'>
                        <SearchIcon />
                        <input type='text' placeholder='Search' />
                    </div>
                </div>
                <div className='header-right'>
                    <div className='header-right-container'>
                        <span onClick={handleSignOut}><Avatar src={user?.photo} /></span>
                        <InboxIcon />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header