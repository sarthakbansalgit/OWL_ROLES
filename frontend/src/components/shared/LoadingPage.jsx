import React, { useEffect, useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Color variables
const colors = {
    mainPurple: '#8A63E6',       // Vibrant but not neon purple
    accentPurple: '#6B46C1',     // Slightly deeper purple
    darkBg: '#12121D',           // Richer dark background
    particleGlow: 'rgba(138, 99, 230, 0.15)', // Subtler glow
    textPrimary: '#E0D6FF',      // Soft purple-white for text
    cubeBorder: '#9D7AFF',       // Lighter cube edges
    cubeFill: 'rgba(26, 18, 45, 0.6)' // Semi-transparent dark purple
};

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    background: ${colors.darkBg};
    color: ${colors.textPrimary};
    font-family: 'Inter', sans-serif;
    overflow: hidden;
  }
`;

// Animations
const cubeFloat = keyframes`
  0% { transform: translateY(0) rotateX(0) rotateY(0); }
  50% { transform: translateY(-30px) rotateX(180deg) rotateY(180deg); }
  100% { transform: translateY(0) rotateX(360deg) rotateY(360deg); }
`;

const textFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const textGlow = keyframes`
  0%, 100% { text-shadow: 0 0 8px ${colors.mainPurple}; }
  50% { text-shadow: 0 0 15px ${colors.mainPurple}, 0 0 20px ${colors.mainPurple}; }
`;

// Styled Components
const CyberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${colors.darkBg};
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  gap: 2rem;
`;

const CyberCube = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  transform-style: preserve-3d;
  animation: ${cubeFloat} 8s ease-in-out infinite;
  margin-top: 4rem;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent 0%, 
      ${colors.particleGlow} 50%, 
      transparent 100%);
    filter: blur(20px);
    z-index: -1;
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(15, 15, 25, 0.4);
    border: 2px solid ${colors.mainPurple};
    backdrop-filter: blur(12px);
    
    &:nth-child(1) { transform: translateZ(60px); }
    &:nth-child(2) { transform: rotateX(180deg) translateZ(60px); }
    &:nth-child(3) { transform: rotateY(90deg) translateZ(60px); }
    &:nth-child(4) { transform: rotateY(-90deg) translateZ(60px); }
    &:nth-child(5) { transform: rotateX(90deg) translateZ(60px); }
    &:nth-child(6) { transform: rotateX(-90deg) translateZ(60px); }
  }
`;

const TitleText = styled.div`
  font-size: 2.5rem;
  color: ${colors.textPrimary};
  letter-spacing: 2px;
  font-weight: 600;
  margin-bottom: 4rem;
  animation: ${textFloat} 3s ease-in-out infinite, ${textGlow} 4s ease-in-out infinite;
  position: relative;
  text-align: center;

  /* Clean shadow for depth instead of glitch effect */
  text-shadow: 0 0 10px ${colors.mainPurple};
`;

const ParticleGrid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at center, 
      ${colors.particleGlow} 0%, 
      transparent 70%);
  background-size: 40px 40px;
  opacity: 0.3;
`;

const LoadingBar = styled.div`
  width: 280px;
  height: 4px;
  background: rgba(155, 155, 155, 0.2);
  border-radius: 4px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, ${colors.mainPurple}, ${colors.accentPurple});
    animation: ${keyframes`
      0% { width: 0%; }
      100% { width: 100%; }
    `} 3s ease-in-out infinite;
    box-shadow: 0 0 8px ${colors.mainPurple};
  }
`;

const StatusText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${colors.textPrimary};
  margin-top: 1rem;
  opacity: 0.8;
  letter-spacing: 1px;
`;

const LoadingPage = () => {
  // Add loading message state for a more dynamic experience
  const [loadingMessage, setLoadingMessage] = useState('Initializing systems...');
  
  useEffect(() => {
    document.body.style.backgroundColor = colors.darkBg;
    
    // Cycle through loading messages
    const messages = [
      'Initializing systems...',
      'Loading resources...',
      'Preparing environment...',
      'Almost ready...'
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setLoadingMessage(messages[currentIndex]);
    }, 2000);
    
    return () => { 
      document.body.style.backgroundColor = '';
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <CyberContainer>
        <ParticleGrid />
        
        <CyberCube>
          {[...Array(6)].map((_, i) => <div key={i} />)}
        </CyberCube>

        <TitleText>OWL ROLES</TitleText>
        
        <LoadingBar />
        <StatusText>{loadingMessage}</StatusText>
      </CyberContainer>
    </>
  );
};

export default LoadingPage;