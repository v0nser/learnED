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
      answer: 'Our LMS app is designed to provide a platform for managing and delivering online courses, training materials, and educational content.',
    },
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button on the homepage, fill in the required information, and follow the instructions to complete the registration process.',
    },
    {
      question: 'Can I reset my password?',
      answer: 'Yes, you can reset your password by clicking on the "Forgot Password" link on the login page. Follow the prompts to reset your password.',
    },
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>

      {faqs.map((faq, index) => (
        <div className="faq-item" key={index}>
          <h3 onClick={() => handleToggle(index)} className={activeIndex === index ? 'active' : ''}>
            {faq.question}
          </h3>
          {activeIndex === index && <p>{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
