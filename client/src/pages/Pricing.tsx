import { Link } from 'react-router-dom';

const pricingCategories = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'AI & Plagiarism Reduction',
    badge: 'Most Popular',
    badgeColor: 'bg-amber-100 text-amber-700',
    accentColor: 'border-[#1e3a5f]',
    iconBg: 'bg-[#1e3a5f]/10 text-[#1e3a5f]',
    items: [
      { label: 'Based on pages & % level', icon: '📄' },
      { label: '₹90 – ₹240 / page', icon: '💰' },
      { label: 'Faster delivery = extra charge', icon: '⚡' },
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Reports(AI + Plag)',
    badge: 'Fixed Pricing',
    badgeColor: 'bg-[#1e3a5f]/10 text-[#1e3a5f]',
    accentColor: 'border-amber-500',
    iconBg: 'bg-amber-100 text-amber-600',
    items: [
      { label: '1 to 40 pages → ₹179', icon: '📋' },
      { label: '41–70 pages → ₹229', icon: '📋' },
      { label: '70 Above pages→ ₹299', icon: '📋' },
    ],
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#1e3a5f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-white/20">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            Starting Range
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Pricing</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Transparent, affordable pricing with no hidden fees. Final cost depends on document size and urgency.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingCategories.map(({ icon, title, badge, badgeColor, accentColor, iconBg, items }) => (
            <div
              key={title}
              className={`bg-white rounded-2xl border-2 ${accentColor} shadow-sm hover:shadow-lg transition-shadow p-8`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1e3a5f]">{title}</h3>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}>
                  {badge}
                </span>
              </div>

              <ul className="space-y-4">
                {items.map(({ label, icon: itemIcon }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="text-lg">{itemIcon}</span>
                    <span className="text-gray-700 font-medium">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-4xl mx-auto mt-8 space-y-4">
          {/* WhatsApp CTA */}
          <div className="bg-[#1e3a5f] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-base mb-1">
                  Looking for a custom quote on other services?
                </p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  We offer a wide range of academic services beyond what's listed above — including writing assistance,
                  data analysis, document formatting, proofreading and more. Pricing for these varies based on your specific
                  requirements. Reach out to us directly on WhatsApp and our team will get back to you with a
                  personalised quote within a few hours.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/919149797692"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
            <svg className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-amber-800 text-sm leading-relaxed">
              Prices shown are starting ranges. Exact cost is confirmed after reviewing your document.
              Bulk orders and repeat customers may be eligible for discounts — reach out via WhatsApp or the contact form.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-5 text-sm">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/submit"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3 rounded-xl transition-colors shadow-lg hover:shadow-amber-500/30"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Submit Your Document
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f]/5 font-semibold px-7 py-3 rounded-xl transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
