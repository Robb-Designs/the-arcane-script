import { Button } from "./ui/8bit/button";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 absolute top-0 left-0 w-full z-50">
      <h1 className="text-xl font-bold tracking-wider">The Arcane Script</h1>

      <ul className="flex items-center gap-6 text-sm">
        {/* Auth links will go here */}
        <li>
          <Button variant="ghost">Login</Button>
        </li>

        <li>
          <Button>Register</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
