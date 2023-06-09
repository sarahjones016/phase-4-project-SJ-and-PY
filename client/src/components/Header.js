import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { IconContext } from "react-icons";

function Header({ user, onLogout }) {

  const [navButton, setNavButton] = useState(false)
  const [showNavBar, setShowNavBar] = useState(false)

    function handleNavClick() {
        console.log("nav bar has been clicked")
        setShowNavBar(!showNavBar)
        setNavButton(!navButton)
    } 

    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => onLogout());
    }
  
    return (

      <div className='hamburgerMenuDiv'>
            {showNavBar ? <div className='navButtonTwo'>
                <IconContext.Provider className='hamburgerMenuTwo' value={{ size: "25px", color: "black"}}>
                    <RxHamburgerMenu onClick={handleNavClick}/>
                </IconContext.Provider>            
            </div> : <div className='navButton'>
                <IconContext.Provider className='hamburgerMenu' value={{ size: "25px"}}>
                    <RxHamburgerMenu onClick={handleNavClick}/>
                </IconContext.Provider>
            </div>}
            
            {showNavBar ? <div className='navBar'>
                <ul onClick={handleNavClick} className='options'>
                  <li ><Link to='/'>Home</Link></li>
                  <li><Link to='products'>Wines</Link></li>
                  <li><Link to='cart'>Cart</Link></li>
                  <li><Link to='create-account'>Create Account</Link></li>
                  <li><Link to='login'>Login</Link></li>
                  <li>
                      {user ? (
                          <div>
                              <button onClick={handleLogout}>Logout</button>
                          </div>
                      ) : null}
                  </li>
                </ul>
            </div> : null}
            
        </div>
    );
  }

export default Header