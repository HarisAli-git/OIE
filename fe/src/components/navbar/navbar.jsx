import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-900 text-white">
      <div className="text-xl font-bold">Tradeindata</div>
      <div className="space-x-6 hidden md:flex">
        <Link href="#">Company Data</Link>
        <Link href="#">Product Data</Link>
        <Link href="#">Bill Of Lading</Link>
        <Link href="#">Countries Covered</Link>
        <Link href="#">Pricing</Link>
      </div>
      <div className="space-x-4">
        <Link href="#">Login</Link>
        <button className="bg-orange-600 px-4 py-2 rounded-full font-semibold">Free Trial</button>
      </div>
    </nav>
  );
}