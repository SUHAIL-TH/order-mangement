import React from 'react';
import exampleImage from '../assets/abstract-digital-grid-black-background.jpg';

function Home() {
  return (
    <>
     
      <div
        style={{
          height: '100vh', // Full viewport height
          backgroundImage: `url(${exampleImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{  padding: '20px', borderRadius: '8px' }}>
          <h1 style={{fontWeight:'bolder',color:"red"}}>Welcome to Home</h1>
          <button
            style={{
              fontWeight:'bolder',
              padding: '10px 20px',
              fontSize: '16px',
              color: 'white',
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
