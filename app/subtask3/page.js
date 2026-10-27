'use client';

import { isOdd, useNumberValue } from '../shell';

export default function Subtask3() {
  const value = useNumberValue();

  if (!isOdd(value)) {
    return null;
  }

  return <div>Subtask3, protected information</div>;
}
