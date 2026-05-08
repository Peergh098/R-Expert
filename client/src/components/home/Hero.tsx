import { Link } from 'react-router-dom';
import { services } from '../../data/services';


const stats = [
  { num: '98%', label: 'Client Satisfaction' },
  { num: '24hr', label: 'Turnaround Time' },
  { num: '100%', label: 'Confidential' },
];

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-[#1e3a5f] via-[#2d5a8e] to-[#1e3a5f] text-white py-20 lg:pb-18 lg:pt-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* LEFT — Text content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
              Academic <span className="text-amber-400">Sphere</span>
            </h1>

            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              Plagiarism reports, AI detection, proofreading, data analysis & more —
              delivered fast and with guaranteed quality.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                Submit Your Document
              </Link>
              <a
                href="https://wa.me/917898194031"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-3 border-t border-white/20">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-bold text-amber-400">{s.num}</div>
                  <div className="text-blue-200 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Services list */}
          <div className="hidden lg:flex flex-col mt-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                Our Services
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 flex-1 content-start">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-3 bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-2.5 transition-colors duration-200"
                >
                  <span className="text-xs text-blue-100 font-medium leading-snug">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
        {/* Badges — bottom of hero */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-medium px-4 py-2 rounded-full">
            <span>⚡</span>
            <span>Reports delivered in <strong>under 30 minutes</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-sm font-medium px-4 py-2 rounded-full">
            <span>🌟</span>
            <span>Trusted by <strong className="text-white">1,000+</strong> users</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-sm font-medium px-4 py-2 rounded-full">
            <span>🔒</span>
            <span>100% Confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
