'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function Subtask2Content() {
  const searchParams = useSearchParams();
  const queryList = Array.from(searchParams.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join(', ');

  return <div>Subtask2, query parameters: {queryList}</div>;
}

export default function Subtask2() {
  return (
    <Suspense fallback={null}>
      <Subtask2Content />
    </Suspense>
  );
}
