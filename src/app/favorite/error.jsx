"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="text-center mt-10">
      <p>Error {error?.message}</p>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
