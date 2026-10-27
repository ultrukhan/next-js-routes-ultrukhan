'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

const NumberContext = createContext('');

export function useNumberValue() {
  return useContext(NumberContext);
}

export function isOdd(value) {
  if (value === '') return false;
  const number = Number(value);
  return Number.isInteger(number) && Math.abs(number % 2) === 1;
}

export default function Shell({ children }) {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleProtectedClick = (event) => {
    event.preventDefault();
    if (isOdd(value)) {
      router.push('/subtask3');
    }
  };

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      router.push('/subtask4');
    }
  };

  return (
    <NumberContext.Provider value={value}>
      <div>
        <h1 className="mb-4">React Practical</h1>
        <h2 className="mb-3">The topic {`'Routes'`}</h2>
        <Link
          href="/subtask3"
          onClick={handleProtectedClick}
          className="text-blue-500 underline"
        >
          Show protected information if{' '}
        </Link>
        <input
          type="number"
          className="border w-20"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />{' '}
        is odd
        <div>
          Go to the component programmatically, by checking the box:
          <input type="checkbox" onChange={handleCheckbox} />
        </div>
        {children}
      </div>
    </NumberContext.Provider>
  );
}
