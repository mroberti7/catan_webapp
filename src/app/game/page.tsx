'use client';

import Game from '@/app/game';
import { Suspense } from 'react';

const GamePage = () => {
  return (
    <Suspense>
      <Game />
    </Suspense>
  );
};

export default GamePage;
