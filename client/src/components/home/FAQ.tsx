import { useState } from 'react';

const faqs = [
  {
    q: 'How long does plagiarism removal take?',
    a: 'Most plagiarism removal orders are completed within 48 hours. For larger documents (100+ pages), it may take 3–5 business days. We always communicate the timeline upfront.',
  },
  {
    q: 'Is my document kept confidential?',
    a: 'Absolutely. We maintain strict confidentiality for all documents. We never share, publish, or reuse your work. You can request an NDA agreement for additional assurance.',
  },
  {
    q: 'What file formats do you accept?',
    a: 'We accept PDF, DOC, DOCX, and TXT files up to 20MB. For larger files, please contact us directly and we will arrange a secure transfer method.',
  },
  {
    q: 'Do you guarantee the plagiarism percentage?',
    a: 'Yes. For plagiarism removal, we guarantee reducing your similarity score to below 10%. If we do not achieve this, we will revise the document at no additional cost.',
  },
  {
    q: 'Which citation styles do you support?',
    a: 'We support all major styles including APA (6th & 7th edition), MLA, Chicago/Turabian, Harvard, Vancouver, IEEE, and many journal-specific styles. Just mention your requirement.',
  },
  {
    q: 'How do I pay for the service?',
    a: 'After submitting your request, our team will review it and send you a quotation. We accept UPI, NEFT/IMPS, PayPal, and all major credit/debit cards through a secure payment gateway.',
  },
  {
    q: 'Can I get a sample report before ordering?',
    a: 'Yes, we can provide a sample plagiarism report for a small portion of your document (up to 2 pages) so you can evaluate our quality before placing a full order.',
  },
  {
    q: 'Do you offer discounts for bulk orders?',
    a: 'Yes! We offer significant discounts for bulk orders (10+ documents), institutional orders, and repeat customers. Contact us to discuss a custom pricing plan.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f]">Frequently Asked Questions</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Everything you need to know about our services. Can't find your answer? Feel free to contact us.</p>
        </div>

        {/* FAQ Grid — two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-4 items-start">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#1e3a5f] border-[#1e3a5f] shadow-xl'
                    : 'bg-white border-gray-200 shadow-sm hover:border-[#1e3a5f] hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                      isOpen ? 'bg-amber-400 text-[#1e3a5f]' : 'bg-[#1e3a5f]/10 text-[#1e3a5f]'
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`font-semibold text-sm md:text-base leading-snug ${isOpen ? 'text-white' : 'text-[#1e3a5f]'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                    isOpen ? 'bg-white/20 rotate-180' : 'bg-gray-100'
                  }`}>
                    <svg className={`w-3.5 h-3.5 ${isOpen ? 'text-amber-400' : 'text-[#1e3a5f]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="ml-10">
                      <div className="w-8 h-px bg-amber-400 mb-3" />
                      <p className="text-blue-100 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
