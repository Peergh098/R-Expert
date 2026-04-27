import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#152844] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Top Row: Brand + Services */}
        <div className="flex flex-col lg:flex-row gap-10 mb-6">

          {/* Brand */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center space-x-2 mb-3">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-white font-bold text-xl">
                <span className="text-amber-400">Experts</span>
              </span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
              India's trusted academic research services platform. Helping researchers achieve
              publication-ready standards since 2018.
            </p>
            <div className="flex space-x-3 mt-4">
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
          <div className="flex-1 bg-white/5 rounded-2xl px-6 py-5">
            <h3 className="font-semibold text-amber-400 uppercase tracking-wide text-xs mb-4">Services</h3>
            <ul className="grid grid-rows-4 grid-flow-col gap-x-8 gap-y-2">
              {[
                ['Plagiarism Report', '/services/plagiarism-report'],
                ['AI Detection Report', '/services/ai-detection-report'],
                ['Drillbit Report', '/services/drillbit-report'],
                ['AI Content Reduction', '/services/ai-content-reduction'],
                ['Writing Assistance', '/services/writing-assistance'],
                ['Data Analysis', '/services/data-analysis'],
                ['Document Formatting', '/services/document-formatting'],
                ['Proofreading & Editing', '/services/proofreading'],
                ['Grammar Enhancement', '/services/grammar-enhancement'],
                ['Reference Formatting', '/services/reference-formatting'],
                ['Presentation Design', '/services/presentation-design'],
                ['Reviewer Comments Revision', '/services/reviewer-comments-revision'],
              ].map(([name, path]) => (
                <li key={name}>
                  <Link to={path} className="text-blue-200 hover:text-amber-400 text-xs transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-white/5 rounded-2xl px-6 py-5">
          <h3 className="font-semibold text-amber-400 uppercase tracking-wide text-xs mb-4">Contact</h3>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">📧</span>
              <a href="mailto:peergh098@gmail.com" className="text-blue-200 hover:text-amber-400 text-sm transition-colors">
                peergh098@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">📞</span>
              <a href="tel:+919149797692" className="text-blue-200 hover:text-amber-400 text-sm transition-colors">
                +91 9149797692
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">💬</span>
              <a href="https://wa.me/919149797692" className="text-blue-200 hover:text-amber-400 text-sm transition-colors">
                WhatsApp Us
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">⏰</span>
              <span className="text-blue-200 text-sm">Mon–Sat, 9am – 7pm IST</span>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-300 text-sm">
            © {new Date().getFullYear()} Research Experts. All rights reserved.
          </p>
          <div className="flex space-x-5 items-center">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
              <a key={item} href="#" className="text-blue-300 hover:text-white text-xs transition-colors">
                {item}
              </a>
            ))}
            <Link to="/admin/login" className="text-white/20 hover:text-white/60 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
