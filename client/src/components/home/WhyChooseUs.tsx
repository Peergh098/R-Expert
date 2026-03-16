const features = [
  {
    icon: '🎓',
    title: 'PhD-Qualified Experts',
    description:
      'All our editors and writers hold advanced degrees in their respective fields, ensuring domain-specific expertise for your research.',
  },
  {
    icon: '🔒',
    title: '100% Confidential',
    description:
      'Your documents and personal information are completely secure. We sign NDAs and never share your work with third parties.',
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    description:
      'We deliver most services within 24–48 hours. Express options available for urgent deadlines.',
  },
  {
    icon: '✅',
    title: 'Quality Guaranteed',
    description:
      'Not satisfied? We offer unlimited revisions until you are completely happy with the result.',
  },
  {
    icon: '💰',
    title: 'Affordable Pricing',
    description:
      'Transparent, competitive pricing with no hidden fees. Special discounts for bulk and repeat orders.',
  },
  {
    icon: '🌐',
    title: 'All Languages',
    description:
      'We support documents in English, Hindi, and 20+ other languages with native-speaker editors.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <h2 className="section-title">Why Choose Research Experts?</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We combine academic expertise with cutting-edge tools to deliver results that meet the
              highest publication standards — every single time.
            </p>
            <div className="space-y-5">
              {[
                'Over 10,000 documents successfully processed',
                'Serving 50+ countries globally',
                'Partnerships with top universities & journals',
                'ISO-certified quality processes',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-5 hover:bg-[#1e3a5f] hover:text-white group transition-all duration-300"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-[#1e3a5f] group-hover:text-white mb-2 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-blue-100 text-sm leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
