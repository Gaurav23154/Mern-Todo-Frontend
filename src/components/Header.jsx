import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-purple-600">TaskTracker</h1>
      <nav className="flex gap-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-purple-600">Dashboard</Link>
        <Link to="/login" className="text-gray-700 hover:text-purple-600">Login</Link>
        <Link to="/signup" className="text-gray-700 hover:text-purple-600">Signup</Link>
      </nav>
    </header>
  );
}
