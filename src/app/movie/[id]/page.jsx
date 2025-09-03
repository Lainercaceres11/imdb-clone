export default async function Movie({ params }) {
  const id = await params.id;

  return <div>{id}</div>;
}
