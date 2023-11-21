/* eslint-disable react/no-unescaped-entities */
import Footer from "../components/Footer";
import Navbars from "../components/Navbars";

const ContactUs = () => {
  return (
    <>
      <Navbars page="landing"></Navbars>
      <div className="mt-12">

        <div className="hero min-h-screen max-w-3xl mx-auto">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Contact Us!</h1>
              <p className="py-6">
                Send us a message with your email and we'll get back to you as
                soon as possible! (Please know we do not actually have a mail
                box and any messages sent here will never actually go anywhere)
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-secondary"
                    required
                  />
                </div>
                <div className="form-control">
                  <textarea
                    className="textarea textarea-secondary"
                    placeholder="message"
                  ></textarea>
                  <label className="label">
                    Message
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ContactUs;
