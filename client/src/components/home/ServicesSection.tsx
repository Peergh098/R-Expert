import { Link } from 'react-router-dom';
import { services } from '../../data/services';

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  amber: 'bg-amber-100 text-amber-600',
  indigo: 'bg-indigo-100 text-indigo-600',
};

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Our Academic Services</h2>
          <p className="section-subtitle mx-auto">
            Comprehensive research support services trusted by students, scholars, and professionals
            across India and worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service) => (
            <div
              key={service.id}
              className="card p-7 flex flex-col group hover:border-[#1e3a5f] border border-transparent"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 ${
                  colorMap[service.color] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{service.shortDesc}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-[#1e3a5f] font-semibold text-sm">{service.price}</span>
                <Link
                  to={`/services/${service.id}`}
                  className="text-amber-500 hover:text-amber-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/services" className="btn-outline inline-block">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
