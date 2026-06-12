import logo from "../assets/logo.webp";

function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="h-16 flex items-center">

          <img
            src={logo}
            alt="FutureNest"
            className="h-10 w-auto object-contain"
          />

        </div>

      </div>
    </header>
  );
}

export default Navbar;