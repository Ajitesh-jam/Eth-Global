// src/components/Home.tsx
import React from 'react';
import Card from './Card';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <div className="grid">
        <Card 
          title="Game 1" 
          description="Description for Game 1" 
          imageUrl="https://via.placeholder.com/300" 
        />
        <Card 
          title="Game 2" 
          description="Description for Game 2" 
          imageUrl="https://via.placeholder.com/300" 
        />
      </div>
    </div>
  );
};

export default Home;
