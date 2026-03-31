export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white p-4 rounded-lg shadow">
      <div className="bg-gray-300 h-40 w-full rounded-md"></div>
      <div className="h-4 bg-gray-300 mt-3 rounded"></div>
      <div className="h-4 bg-gray-200 mt-2 w-1/2 rounded"></div>
      <div className="h-8 bg-gray-300 w-full mt-4 rounded"></div>
    </div>
  );
}
