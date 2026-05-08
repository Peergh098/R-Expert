import { Link } from 'react-router-dom';
import { services } from '../../data/services';

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Quick Service Lookup</h2>
          <p className="section-subtitle mx-auto">
            Comprehensive research support services trusted by students, scholars, and professionals
            across India and worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col bg-white hover:bg-[#1e3a5f] rounded-xl px-5 py-4 shadow-sm border border-gray-100 transition-all duration-300 group"
            >
              {/* Title row */}
              <div className="flex items-center justify-between">
                <div className=''>
                <span className="text-2xl shrink-0">{service.icon}</span>
                <span className="text-[#1e3a5f] group-hover:text-white font-medium text-sm transition-colors leading-snug">
                  {service.title}
                </span>
                </div>

                <Link
                  to="/submit"
                  className="text-xs font-semibold text-white bg-[#1e3a5f] group-hover:bg-amber-500 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Get Started
                </Link>
              </div>

              {/* Turnaround + Button row */}
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
