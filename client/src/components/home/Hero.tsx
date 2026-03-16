import { Link } from 'react-router-dom';

const stats = [
  { num: '10K+', label: 'Documents Processed' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '24hr', label: 'Turnaround Time' },
];

const quickServices = [
  { service: 'Plagiarism Check', time: '24 hrs', icon: '🔍' },
  { service: 'Plagiarism Removal', time: '48 hrs', icon: '✏️' },
  { service: 'Proofreading', time: '24 hrs', icon: '📝' },
  { service: 'Thesis Writing', time: '7+ days', icon: '📚' },
  { service: 'Citation Formatting', time: '24 hrs', icon: '📋' },
];

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-[#1e3a5f] via-[#2d5a8e] to-[#1e3a5f] text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center bg-white/10 text-blue-200 text-sm px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Trusted by 10,000+ Researchers Worldwide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Expert Academic
              <span className="text-amber-400 block">Research Services</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              Professional plagiarism checking, removal, proofreading, and thesis writing. Elevate
              your research to publication-ready standards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
              >
                Submit Your Document
              </Link>
              <Link
                to="/services"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                View Services
              </Link>
            </div>
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-bold text-amber-400">{s.num}</div>
                  <div className="text-blue-200 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-5">Quick Service Lookup</h3>
              <div className="space-y-2.5">
                {quickServices.map((item) => (
                  <div
                    key={item.service}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/15 rounded-lg p-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-white font-medium text-sm">{item.service}</span>
                    </div>
                    <span className="text-amber-300 text-xs font-semibold bg-amber-500/20 px-2.5 py-1 rounded-full">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/submit"
                className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl font-semibold mt-6 transition-colors shadow-lg"
              >
                Get Started Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
