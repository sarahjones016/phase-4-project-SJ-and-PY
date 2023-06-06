import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => onLogout());
    }
  
    return (
      <header>
        <nav>
          <ul className="nav-bar">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='products'>Wines</Link></li>
            <li><Link to='cart'>Cart</Link></li>
            <li><Link to='create-account'>Create Accout</Link></li>
            <li><Link to='login'>Login</Link></li>
            <li>
                {user ? (
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : null}
            </li>
          </ul>
        </nav>
        
      </header>
    );
  }

export default Header