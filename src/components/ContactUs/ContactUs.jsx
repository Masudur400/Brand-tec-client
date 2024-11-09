import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {

    const form = useRef();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);

        emailjs
            .sendForm(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_PUBLIC_KEY
            )
            .then(
                () => {
                    setFeedbackMessage("Your message was Emailed successfully!");
                    setIsLoading(false);
                    form.current.reset();
                },
                (error) => {
                    setFeedbackMessage(
                        "There was an error sending your message. Please try again."
                    );
                    setIsLoading(false);
                    console.error("Failed to send message:", error);
                }
            );
    };


    return (
        <div>
            <div>
                <div className="contactBG bg-fixed container m-auto rounded-xl ">
                    <div className="bg-black w-full h-full bg-opacity-40 flex flex-col items-center rounded-xl justify-center">
                        <p className="text-3xl font-bold text-center mb-5">
                            <span className="text-orange-500">Brand</span><span className="text-xl text-white text-opacity-90">TEC</span>
                        </p>
                        <h1 className="text-4xl font-extrabold uppercase  text-white text-opacity-90 mb-5">
                            Contact <span className="">us</span>
                        </h1>
                        <div className="w-full mx-auto container text-center px-2">
                            <p className="text-white font-medium text-opacity-90">
                                Have any questions or need assistance? Reach out to us, and
                                <br />
                                our team will get back to you promptly to help with your inquiry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10 md:flex gap-10 justify-center space-y-5 md:space-y-0'>
                {/* contact form  */}
                <div className='border border-base-300 py-2 px-4 rounded-md shadow-md '>
                    <div className="w-full flex flex-col items-center justify-center">
                        <h1 className="text-[2rem] font-bold  text-orange-500">Contact Us</h1>
                        <p className="text-[1rem] text-text">Write Your FeedBack and Problem</p>
                    </div>
                    <form ref={form} onSubmit={sendEmail} className="lg:w-[360px] md:w-[300px] mt-[50px space-y-3 mt-4">
                        <input placeholder='Name' type="text" name='name' className='px-4 py-2 w-full rounded-md border border-base-300' />

                        <input placeholder='Email' type="email" name="email" id="" className='px-4 py-2 w-full rounded-md border border-base-300' /> 

                        <textarea name="comment" id="" rows={4} className='w-full border border-base-300'></textarea>

                        <button type="submit" className={`py-2 w-full px-4 border border-orange-500 rounded-md text-orange-500 hover:shadow-md  mt-[10px]`}>Submit</button>
                    </form> 
                </div>
                {/* map  */}
                <div className='p-2 rounded-md shadow-md'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.343265924266!2d90.35478055541991!3d23.744319000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4b7a19a463%3A0x2be1530e2121e121!2sDhanmondi%2015!5e0!3m2!1sen!2sbd!4v1731160785930!5m2!1sen!2sbd"
                        className="lg:w-[450px] lg:h-[420px] md:w-[320px] md:h-[420px] w-[270px] h-[300px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;