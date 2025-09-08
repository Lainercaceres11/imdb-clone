export default function Loading() {
  return (
    <div className="w-full animate-pulse">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <div className="rounded-lg w-full md:w-96 h-56 bg-gray-300"></div>

        <div className="p-2 flex-1">
          <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>

          <div className="h-10 bg-gray-300 rounded-lg w-32 mt-4"></div>
        </div>
      </div>
    </div>
  );
}
