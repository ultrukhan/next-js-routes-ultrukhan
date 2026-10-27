export default async function Subtask1({ params }) {
  const { parameter } = await params;
  return <div>Subtask1, parameter: {parameter}</div>;
}
