import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="mb-4">React Practical</h1>
      <h2 className="mb-3">The topic {`'Routes'`}</h2>
      <Link href="/" className="text-blue-500 underline">Show protected information if </Link>
      <input type="number" className="border w-20" /> is odd
      <div>
        Go to the component programmatically, by checking the box:
        <input type="checkbox"></input>
      </div>
    </div>
  );
}
