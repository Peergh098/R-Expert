import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#152844] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-white font-bold text-xl">
                <span className="text-amber-400">Experts</span>
              </span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed">
              India's trusted academic research services platform. Helping researchers achieve
              publication-ready standards since 2018.
            </p>
            <div className="flex space-x-3 mt-5">
              {[
                { label: 'Twitter', href: '#', icon: 'T' },
                { label: 'LinkedIn', href: '#', icon: 'in' },
                { label: 'Facebook', href: '#', icon: 'f' },
              ].map((s) => (
                <Link
                  key={s.label}
                  to={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center text-xs font-bold transition-colors"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                ['Plagiarism Check', '/services/plagiarism-check'],
                ['Plagiarism Removal', '/services/plagiarism-removal'],
                ['Proofreading', '/services/proofreading'],
                ['Citation Formatting', '/services/citation-formatting'],
                ['Thesis Writing', '/services/thesis-writing'],
                ['Document Formatting', '/services/document-formatting'],
              ].map(([name, path]) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="text-blue-200 hover:text-amber-400 text-sm transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                ['Home', '/'],
                ['All Services', '/services'],
                ['Cost Calculator', '/calculator'],
                ['Submit Document', '/submit'],
                ['Contact Us', '/contact'],
                ['Admin Login', '/admin/login'],
              ].map(([name, path]) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="text-blue-200 hover:text-amber-400 text-sm transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">📧</span>
                <div>
                  <p className="text-blue-200 text-sm">Email</p>
                  <a
                    href="mailto:peergh098@gmail.com"
                    className="text-white text-sm hover:text-amber-400 transition-colors"
                  >
                    peergh098@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">📞</span>
                <div>
                  <p className="text-blue-200 text-sm">Phone</p>
                  <a
                    href="tel:+919149797692"
                    className="text-white text-sm hover:text-amber-400 transition-colors"
                  >
                    +91 9149797692
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">💬</span>
                <div>
                  <p className="text-blue-200 text-sm">WhatsApp</p>
                  <a
                    href="https://wa.me/919149797692"
                    className="text-white text-sm hover:text-amber-400 transition-colors"
                  >
                    Chat with us
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">⏰</span>
                <div>
                  <p className="text-blue-200 text-sm">Working Hours</p>
                  <p className="text-white text-sm">Mon–Sat, 9am – 7pm IST</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-300 text-sm">
            © {new Date().getFullYear()} Research Experts. All rights reserved.
          </p>
          <div className="flex space-x-5">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
              <a key={item} href="#" className="text-blue-300 hover:text-white text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
