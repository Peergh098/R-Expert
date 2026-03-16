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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about our services.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[#1e3a5f] text-sm md:text-base">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-[#1e3a5f] shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
