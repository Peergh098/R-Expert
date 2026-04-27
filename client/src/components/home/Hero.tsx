import { Link } from 'react-router-dom';

const stats = [
  { num: '98%', label: 'Client Satisfaction' },
  { num: '24hr', label: 'Turnaround Time' },
  { num: '100%', label: 'Confidential' },
];

const steps = [
  {
    num: '01',
    title: 'Choose Service',
    desc: 'Browse and select the service that fits your academic need.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Submit Document',
    desc: 'Upload your file and fill in a quick form — under 2 minutes.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Review & Analysis',
    desc: 'Our experts process your document with precision and confidentiality.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Payment Confirmation',
    desc: 'Receive a quote and confirm payment securely before delivery.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Final Delivery',
    desc: 'Get your completed report delivered to your inbox on time.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-[#1e3a5f] via-[#2d5a8e] to-[#1e3a5f] text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — Text content */}
          <div>
            {/* Badge */}
            {/* <div className="inline-flex items-center bg-white/10 text-blue-200 text-xs font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Trusted by 5,000+ Researchers Worldwide
            </div> */}

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
              Expert Academic
              <span className="text-amber-400 block">Research Services</span>
            </h1>

            {/* Subtext */}
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              Plagiarism reports, AI detection, proofreading, data analysis & more —
              delivered fast and with guaranteed quality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-5">
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

          {/* RIGHT — How it works */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="inline-flex items-center bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-2 backdrop-blur-sm">How it works</div>
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-4 items-start relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[18px] top-10 w-px h-8 bg-white/20" />
                )}
                {/* Icon bubble */}
                <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400">
                  {step.icon}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-0.5">{step.title}</div>
                  <div className="text-blue-200 text-xs leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}

            {/* Trust note */}
            <div className="mt-4 bg-amber-400/10 border border-amber-400/25 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 text-amber-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <div className="text-amber-400 font-semibold text-sm">100% Confidential & Secure</div>
                <div className="text-blue-200 text-xs">Your documents are never shared or stored after delivery.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
