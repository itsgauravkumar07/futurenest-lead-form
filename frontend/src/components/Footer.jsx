function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} FutureNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;