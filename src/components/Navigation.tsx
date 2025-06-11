import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center text-xl font-bold text-gray-800"
            >
              Mason Ball
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              href="/about"
              className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/education"
              className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-900"
            >
              Education
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-900"
            >
              Business
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
