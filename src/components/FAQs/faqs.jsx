import React, { useState } from 'react';
import './faqs.css';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is the purpose of this LMS app?',
      answer: 'Our LMS app helps you manage and deliver online courses, training materials, and educational content with ease.',
    },
    {
      question: 'How do I create an account?',
      answer: 'Just hit "Sign Up" on the homepage, enter your details, and follow the quick steps to get started.',
    },
    {
      question: 'Can I reset my password?',
      answer: 'Yep! Click "Forgot Password" on the login page and follow the instructions to reset it.',
    },
  ];

  return (
    <div className="faq-wrapper">
      <h2 className="faq-heading">Got Questions? We’ve Got Answers!</h2>
      <div className="faq-accordion">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-card ${activeIndex === index ? 'expanded' : ''}`}
          >
            <div
              className="faq-header"
              onClick={() => handleToggle(index)}
            >
              <span className="faq-question">{faq.question}</span>
              <span className="faq-toggle">
                {activeIndex === index ? '−' : '+'}
              </span>
            </div>
            <div className={`faq-content ${activeIndex === index ? 'visible' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;