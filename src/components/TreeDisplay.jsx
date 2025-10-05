import React from 'react';

function TreeDisplay({ level }) {
  const stages = ['🌱', '🌿', '🌳', '🌲'];
  return <div>{stages[Math.min(level, stages.length - 1)]}</div>;
}

export default TreeDisplay;
