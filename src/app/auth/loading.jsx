const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[#071E22] p-6 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="h-8 w-1/3 bg-[#173f40] rounded-lg"></div>

        {/* Card Skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-40 rounded-2xl bg-[#0F3D3E]"></div>
          <div className="h-40 rounded-2xl bg-[#0F3D3E]"></div>
        </div>

        {/* Large Content Skeleton */}
        <div className="space-y-4 mt-6">
          <div className="h-6 w-full bg-[#173f40] rounded"></div>
          <div className="h-6 w-5/6 bg-[#173f40] rounded"></div>
          <div className="h-6 w-2/3 bg-[#173f40] rounded"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="h-60 bg-[#0F3D3E] rounded-2xl"></div>
          <div className="h-60 bg-[#0F3D3E] rounded-2xl"></div>
          <div className="h-60 bg-[#0F3D3E] rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
