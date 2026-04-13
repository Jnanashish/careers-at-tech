const BlogLoadingSkeleton = () => {
  return (
    <div className="blog-root animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-blue-bg py-12 lg:py-16 px-6 lg:px-20 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-10 w-32 bg-grey-border rounded mx-auto mb-4" />
          <div className="h-5 w-64 bg-grey-border rounded mx-auto mb-8" />
          <div className="h-12 w-full max-w-lg bg-white rounded-full mx-auto border border-grey-border" />
        </div>
      </div>

      <div className="px-6 lg:px-20 pb-16">
        {/* Category pills skeleton */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-20 bg-grey-border rounded-full" />
          ))}
        </div>

        {/* Featured post skeleton */}
        <div className="rounded-[14px] border border-grey-border mb-8 lg:grid lg:grid-cols-2">
          <div className="aspect-[16/9] lg:aspect-auto lg:min-h-[320px] bg-grey-border rounded-t-[14px] lg:rounded-l-[14px] lg:rounded-tr-none" />
          <div className="p-6 lg:p-8 space-y-4">
            <div className="h-5 w-20 bg-grey-border rounded-full" />
            <div className="h-8 w-3/4 bg-grey-border rounded" />
            <div className="h-4 w-full bg-grey-border rounded" />
            <div className="h-4 w-2/3 bg-grey-border rounded" />
          </div>
        </div>

        {/* Post grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-[14px] border border-grey-border overflow-hidden">
              <div className="aspect-[16/9] bg-grey-border" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-16 bg-grey-border rounded-full" />
                <div className="h-5 w-3/4 bg-grey-border rounded" />
                <div className="h-4 w-full bg-grey-border rounded" />
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-grey-border rounded" />
                  <div className="h-3 w-16 bg-grey-border rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogLoadingSkeleton;
