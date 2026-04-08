const PostLoadingSkeleton = () => {
  return (
    <div className="blog-root animate-pulse px-6 lg:px-20 py-8">
      {/* Breadcrumbs */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 w-12 bg-grey-border rounded" />
        <div className="h-4 w-4 bg-grey-border rounded" />
        <div className="h-4 w-12 bg-grey-border rounded" />
        <div className="h-4 w-4 bg-grey-border rounded" />
        <div className="h-4 w-32 bg-grey-border rounded" />
      </div>

      {/* Category pill */}
      <div className="h-6 w-20 bg-grey-border rounded-full mb-4" />

      {/* Title */}
      <div className="h-10 w-3/4 bg-grey-border rounded mb-4 max-w-3xl" />

      {/* Meta row */}
      <div className="flex gap-4 mb-8">
        <div className="h-8 w-8 bg-grey-border rounded-full" />
        <div className="h-4 w-24 bg-grey-border rounded self-center" />
        <div className="h-4 w-20 bg-grey-border rounded self-center" />
        <div className="h-4 w-16 bg-grey-border rounded self-center" />
      </div>

      {/* Cover image */}
      <div className="aspect-[21/9] rounded-[14px] bg-grey-border mb-10 max-w-5xl" />

      {/* Content */}
      <div className="max-w-3xl space-y-4">
        <div className="h-4 w-full bg-grey-border rounded" />
        <div className="h-4 w-full bg-grey-border rounded" />
        <div className="h-4 w-5/6 bg-grey-border rounded" />
        <div className="h-4 w-full bg-grey-border rounded" />
        <div className="h-4 w-3/4 bg-grey-border rounded" />
        <div className="h-6 w-48 bg-grey-border rounded mt-6" />
        <div className="h-4 w-full bg-grey-border rounded" />
        <div className="h-4 w-full bg-grey-border rounded" />
        <div className="h-4 w-2/3 bg-grey-border rounded" />
      </div>
    </div>
  );
};

export default PostLoadingSkeleton;
