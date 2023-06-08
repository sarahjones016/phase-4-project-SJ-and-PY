import React from 'react'
import './Home.css';
import wine from '../wine.mp4'

function Home() {
return (
  <div id='main' className='main'>
    <div className='overlay'></div>
        <video src={wine} autoPlay loop muted />
        <div className='content'>
            <div className='textContent'>
              <h1 className='homepageName'>ReciPlease</h1>
              <h3 className='homepageTitle'>Natural Wines</h3>
            </div> 
        </div>
  </div>
)
  
}

export default Home