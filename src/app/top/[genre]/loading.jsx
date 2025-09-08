export default function Loading() {
  const skeletons = new Array(10).fill(null);

  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4 animate-pulse">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="rounded-lg sm:border sm:border-slate-400 sm:m-2 overflow-hidden"
        >
          <div className="w-full sm:h-36 bg-gray-300 dark:bg-gray-700" />

          <div className="p-2 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
