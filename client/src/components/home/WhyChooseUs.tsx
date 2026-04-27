const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default WhyChooseUs;
