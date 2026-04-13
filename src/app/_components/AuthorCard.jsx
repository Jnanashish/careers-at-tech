import Image from "next/image";

const AuthorCard = ({ author }) => {
  if (!author) return null;

  return (
    <div className="rounded-[14px] border border-grey-border bg-blue-bg p-6 flex items-start gap-4">
      {author.avatar && (
        <Image
          src={author.avatar}
          alt={author.name}
          width={64}
          height={64}
          className="rounded-full shrink-0"
        />
      )}
      <div>
        <p className="text-sm font-medium text-[#697586] mb-1">Written by</p>
        <p className="text-lg font-semibold text-[#121212] mb-2">
          {author.name}
        </p>
        {author.bio && (
          <p className="text-sm text-grey-light-text leading-relaxed">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
