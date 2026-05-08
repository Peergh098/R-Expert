const reasons = [
  { title: 'Manual Review', desc: 'Every document is reviewed by a human expert, not just automated tools.' },
  { title: 'Fast Delivery', desc: 'Get your results within the agreed turnaround — no delays, no excuses.' },
  { title: 'Confidential Work', desc: 'Your files and data are kept strictly private and never shared.' },
  { title: 'Accurate Reports', desc: 'Plagiarism and AI-detection reports you can trust for submission.' },
  { title: 'Affordable Pricing', desc: 'Transparent, competitive rates with no hidden fees.' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We combine academic expertise with cutting-edge tools to deliver results that meet the
            highest publication standards — every single time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
