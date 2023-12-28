import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LiveClassIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="8" />
  </svg>
);

const LiveClassSectionContainer = styled.div`
  background-color: #f9f9f9;
  padding: 60px 0;
  text-align: center;
`;

const LiveClassHeading = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const LiveClassDescription = styled.p`
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 30px;
`;

const LiveClsBtn = styled.button`
  background-color: #4caf50;
  color: #fff;
  font-size: 1.4rem;
  padding: 18px 40px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: #fff;
    margin-right: 10px;
  }

  &:hover {
    background-color: green;
  }
`;

const LiveClassSection = () => {
  return (
    <LiveClassSectionContainer>
      <LiveClassHeading>Live Class Feature</LiveClassHeading>
      <LiveClassDescription>
        Join our live classes and engage in real-time learning with expert instructors.
      </LiveClassDescription>
      <Link to="/liveclass">
        <LiveClsBtn style={{ display: 'flex', margin:'0 auto' }}>
          <LiveClassIcon /> Join Live Class
        </LiveClsBtn>
      </Link>
    </LiveClassSectionContainer>
  );
};

export default LiveClassSection;
