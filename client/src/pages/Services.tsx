import { Link } from 'react-router-dom';
import { services } from '../data/services';

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
};

const Services = () => {
  return (
    <>
      {/* Page Header */}
      <div className="bg-[#1e3a5f] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Comprehensive academic research services to help you achieve publication-ready quality.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const colors = colorMap[service.color] || colorMap.blue;
              return (
                <div key={service.id} className="card p-8 flex flex-col group">
                  <div className="flex items-start gap-5 mb-5">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0 ${colors.bg}`}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#1e3a5f] mb-1">{service.title}</h2>
                      <span className={`text-sm font-semibold ${colors.text}`}>{service.price}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-5">{service.description}</p>

                  <div className="mb-5">
                    <h4 className="font-semibold text-[#1e3a5f] text-sm mb-3">Key Features:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Turnaround: <strong className="text-gray-700">{service.turnaround}</strong>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to={`/services/${service.id}`}
                        className={`text-sm font-semibold border ${colors.border} ${colors.text} px-4 py-2 rounded-lg hover:opacity-80 transition-opacity`}
                      >
                        Learn More
                      </Link>
                      <Link
                        to={`/submit?service=${service.id}`}
                        className="bg-[#1e3a5f] hover:bg-[#152844] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
