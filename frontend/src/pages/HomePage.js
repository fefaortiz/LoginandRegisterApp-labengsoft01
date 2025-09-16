import React from 'react';
import welcomeImage from '../assets/myapp-image.png'; 

function HomePage() {
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    textAlign: 'center'
  };

  const imageStyle = {
    maxWidth: '50%',   
    height: 'auto',    
    borderRadius: '10px' 
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ marginTop: '200px' }}>Welcome to the Application!</h1>
      <p style={{ marginTop: '1px' }}>You have successfully logged in.</p>
      
      <img src={welcomeImage} alt="Welcome" style={imageStyle} />
    </div>
  );
}

export default HomePage;