import React from 'react';

const Loader = () => {
  const dotStyle = {
    height: '20px',
    width: '20px',
    marginRight: '10px',
    borderRadius: '10px',
    backgroundColor: '#b3d4fc',
    animation: 'pulse 1.5s infinite ease-in-out',
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(0.8);
              background-color: #b3d4fc;
              box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
            }
            50% {
              transform: scale(1.2);
              background-color: #6793fb;
              box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
            }
            100% {
              transform: scale(0.8);
              background-color: #b3d4fc;
              box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
            }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div style={{ ...dotStyle, animationDelay: '-0.3s' }} />
        <div style={{ ...dotStyle, animationDelay: '-0.1s' }} />
        <div style={{ ...dotStyle, animationDelay: '0.1s' }} />
        <div style={{ ...dotStyle, animationDelay: '0.3s' }} />
        <div style={{ ...dotStyle, animationDelay: '0.5s', marginRight: '0' }} />
      </div>
    </>
  );
};

export default Loader;
