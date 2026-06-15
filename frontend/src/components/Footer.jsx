function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-900">
              FutureNest
            </h3>

            <p className="text-sm text-slate-600 mt-1">
              Connecting buyers, sellers, landlords and tenants.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-green-600 transition"
            >
              WhatsApp
            </a>

            <a
              href="tel:+919999999999"
              className="text-slate-600 hover:text-green-600 transition"
            >
              Call Us
            </a>

            <a
              href="mailto:contact@futurenest.com"
              className="text-slate-600 hover:text-green-600 transition"
            >
              Email
            </a>

          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
          © {currentYear} FutureNest. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;