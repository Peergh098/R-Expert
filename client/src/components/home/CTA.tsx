import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Elevate Your Research?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Submit your document today and get a free consultation from our expert team. Results
              delivered in as fast as 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                Submit Document Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-blue-300 text-sm mt-6">
              No upfront payment required · Free quote within 2 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
