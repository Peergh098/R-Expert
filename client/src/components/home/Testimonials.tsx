const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    role: 'PhD Scholar, IIT Delhi',
    text: 'Research Experts helped reduce my thesis plagiarism from 32% to just 6% while keeping all my original ideas intact. Absolutely remarkable service!',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Rahul Verma',
    role: 'MSc Student, Mumbai University',
    text: 'The proofreading team caught errors my advisors had missed for months. The track-changes document was incredibly thorough. Worth every rupee.',
    rating: 5,
    avatar: 'RV',
  },
  {
    name: 'Dr. Anitha Kumar',
    role: 'Associate Professor, Bangalore',
    text: 'I\'ve used Research Experts for over 15 journal papers now. Their citation formatting is flawless and they always deliver before the deadline.',
    rating: 5,
    avatar: 'AK',
  },
  {
    name: 'Mohamed Hassan',
    role: 'Research Scholar, Egypt',
    text: 'Excellent service from India that serves international researchers too. My document was handled professionally with great communication.',
    rating: 5,
    avatar: 'MH',
  },
  {
    name: 'Sunita Patel',
    role: 'PhD Candidate, Gujarat',
    text: 'The thesis writing assistance team helped me structure my literature review perfectly. My supervisor approved it without any major revisions!',
    rating: 5,
    avatar: 'SP',
  },
  {
    name: 'James Wilson',
    role: 'Post-Doctoral Researcher, UK',
    text: 'Surprisingly fast and professional. I used the document formatting service for a Springer journal submission and it was accepted on first review.',
    rating: 5,
    avatar: 'JW',
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#152844]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied researchers who trust us with their academic work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
            >
              <StarRating count={t.rating} />
              <p className="text-blue-100 mt-4 mb-5 leading-relaxed text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-blue-300 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
