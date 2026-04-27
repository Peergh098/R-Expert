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
              className="flex items-center justify-between bg-white hover:bg-[#1e3a5f] rounded-xl px-5 py-4 shadow-sm border border-gray-100 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{service.icon}</span>
                <span className="text-[#1e3a5f] group-hover:text-white font-medium text-sm transition-colors">
                  {service.title}
                </span>
              </div>
              <span className="text-xs font-semibold bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white px-3 py-1 rounded-full transition-colors shrink-0 ml-2">
                {service.turnaround}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
