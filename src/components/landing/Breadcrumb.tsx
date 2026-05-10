import Link from "next/link";

const Breadcrumb = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-40 flex items-center justify-center bg-primaryColor">
      <div className="text-center">
        <p className="text-white text-3xl md:text-4xl font-bold">{title}</p>
        <p className="text-white text-sm md:text-base mt-2">
          <Link href="/">Home</Link> <span className="mx-2">/</span> {title}
        </p>
      </div>
    </div>
  );
};

export default Breadcrumb;
