import React, { useState, useEffect } from 'react';
import './Testimonials.css';
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      id: 1,
      text: "I am very much satisfied by this Maigreat Group portal, and thankful to Maigreat Group Support team.",
      name: "Rahul",
      location: "DELHI"
    },
    {
      id: 2,
      text: "Excellent service and professional approach. Found my dream home within a week!",
      name: "Priya Sharma",
      location: "MUMBAI"
    },
    {
      id: 3,
      text: "The team was very helpful and guided us through every step of the property buying process.",
      name: "Amit Kumar",
      location: "BANGALORE"
    },
    {
      id: 4,
      text: "Great experience! The property listings are accurate and the support team is responsive.",
      name: "Sneha Patel",
      location: "PUNE"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <p className="testimonials-subtitle">Our Testimonial</p>
          <h2 className="testimonials-title">Clients Feedback</h2>
        </div>

        <div className="testimonial-card">
          <div className="quote-icon">❝</div>
          <p className="testimonial-text">
            {testimonials[currentIndex].text}
          </p>
          <div className="testimonial-author">
            <h4 className="author-name">{testimonials[currentIndex].name}</h4>
            <p className="author-location">{testimonials[currentIndex].location}</p>
          </div>

          <div className="testimonial-navigation">
            <button 
              onClick={prevTestimonial} 
              className="nav-btn prev-btn"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial} 
              className="nav-btn next-btn"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
