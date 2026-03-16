import { useParams, Link, Navigate } from 'react-router-dom';
import { services } from '../data/services';
import type { ServiceId } from '../types';

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find((s) => s.id === serviceId);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      {/* Header */}
      <div className="bg-[#1e3a5f] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6 transition-colors">
            ← Back to Services
          </Link>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
              {service.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
              <p className="text-blue-200 mt-1">{service.price} · Turnaround: {service.turnaround}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl p-7 shadow-sm">
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">About This Service</h2>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              <div className="bg-white rounded-xl p-7 shadow-sm">
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-5">What's Included</h2>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-7 shadow-sm">
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-5">Deliverables</h2>
                <ul className="space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-gray-700">
                      <span className="text-amber-500">📦</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-[#1e3a5f] rounded-xl p-6 text-white sticky top-24">
                <h3 className="text-lg font-bold mb-4">Order This Service</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Starting Price</span>
                    <span className="font-bold">{service.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Turnaround</span>
                    <span className="font-bold">{service.turnaround}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Revisions</span>
                    <span className="font-bold">Unlimited</span>
                  </div>
                </div>
                <Link
                  to={`/submit?service=${service.id as ServiceId}`}
                  className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Order Now
                </Link>
                <Link
                  to="/contact"
                  className="block w-full text-center border border-white/30 hover:bg-white/10 text-white py-3 rounded-xl font-semibold transition-colors mt-3"
                >
                  Ask a Question
                </Link>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h4 className="font-bold text-amber-800 mb-2">Need it fast?</h4>
                <p className="text-amber-700 text-sm">
                  We offer express delivery options. Contact us to discuss urgent timelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
