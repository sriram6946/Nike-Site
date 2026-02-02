const ContactUs = () => {
  return (
    <>
      <div className="contact-us-div">
        <div>
          <h1 className="contact-text">Contact Us</h1>
          <p>
            Let’s connect: we’re here to help, and we’d love to hear from you!
            Whether you have a question, comment, or just want to chat , you can
            Reach out to us through the contact form of this page, or by phone,
            Email, or social media.
          </p>
        </div>

        <div className="contact-form">
          <input type="text" placeholder="Enter your name.." />
          <input type="email" placeholder="Enter yout email.." />
          <input className="text-box" type="text" placeholder="Type here..." />

          <div>
            <button className="contact-submit">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
