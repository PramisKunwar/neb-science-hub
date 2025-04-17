
import { Link } from "react-router-dom";
import { AuthStatus } from "./AuthStatus";

export function AuthNav() {
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div className="flex gap-4">
        <Link to="/" className="font-semibold">Home</Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
        <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
      </div>
      <AuthStatus />
    </div>
  );
}
