import React from 'react';

const Contact = () => {
  const [status, setStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');

    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/habtamugetachew101@gmail.com", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('Oops! There was a problem sending your message.');
      }
    } catch (error) {
      setStatus('Oops! There was a problem sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-light">
      <div className="container">
        <h2 className="section-title reveal">Get In <span>Touch</span></h2>
        
        <div className="contact-modern-container">
          
          <div className="contact-info-card reveal fade-left">
            <h3 className="contact-heading"><i className="fas fa-paper-plane"></i> Let's Talk</h3>
            <p className="contact-paragraph">
              Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
              I'm always open to new challenges and collaborations.
            </p>
            
            <div className="contact-details-grid">
              <div className="contact-item-box">
                <div className="contact-icon-wrapper">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-item-text">
                  <h4>Location</h4>
                  <p>Addis Ababa, Ethiopia</p>
                </div>
              </div>
              
              <div className="contact-item-box">
                <div className="contact-icon-wrapper">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-item-text">
                  <h4>Email</h4>
                  <p>habtamugetachew101@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item-box">
                <div className="contact-icon-wrapper">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-item-text">
                  <h4>Phone</h4>
                  <p>+251 942 306 750</p>
                </div>
              </div>
            </div>
            
            <div className="contact-social-footer">
              <p>Connect with me:</p>
              <div className="social-icons">
                <a href="https://github.com/HabtamuGetachew" aria-label="GitHub"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper reveal fade-right delay-1">
            <form 
              className="modern-contact-form" 
              id="contact-form" 
              onSubmit={handleSubmit}
            >
              <h3 className="form-heading">Send me a message</h3>
              <input type="hidden" name="_subject" value="New message from your portfolio" />
              <input type="hidden" name="_next" value="https://yourportfolio.com#contact" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="modern-input-group">
                <input type="text" id="name" name="name" placeholder=" " required />
                <label htmlFor="name">Your Name</label>
                <div className="input-underline"></div>
              </div>
              
              <div className="modern-input-group">
                <input type="email" id="email" name="email" placeholder=" " required />
                <label htmlFor="email">Your Email</label>
                <div className="input-underline"></div>
              </div>
              
              <div className="modern-input-group">
                <input type="text" id="subject" name="subject" placeholder=" " />
                <label htmlFor="subject">Subject</label>
                <div className="input-underline"></div>
              </div>
              
              <div className="modern-input-group">
                <textarea id="message" name="message" placeholder=" " required rows="4"></textarea>
                <label htmlFor="message">Your Message</label>
                <div className="input-underline"></div>
              </div>
              
              <button type="submit" className={`btn btn-full ${loading ? 'loading' : ''}`} disabled={loading}>
                <i className={loading ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"}></i> 
                {loading ? ' Sending...' : ' Send Message'}
              </button>
              
              {status && (
                <div className={`form-status ${status.includes('successfully') ? 'success' : 'error'}`}>
                  {status}
                </div>
              )}
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
