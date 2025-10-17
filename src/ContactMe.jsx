import Title from "./Title";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ContactMe() {
    const formRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);


    // this function when the form is submitted
    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            await emailjs.sendForm(
                "service_dc1tfdm",
                "template_xc2fpc9",
                formRef.current,
                { publicKey: "61tcq9CV5AJ8117eD" }
            );
            alert("Message sent ✅");
            setName("");
            setEmail("");
            setMessage("");
            formRef.current.reset();
        } catch (err) {
            console.error(err);
            alert("❌ Failed to send. Check console and EmailJS settings.");
        } finally {
            setSending(false);
        }
    };

    function updateNameField(e) {
        setName(e.target.value);
    }


    function updateEmailField(e) {
        setEmail(e.target.value);
    }
    function updateMessageField(e) {
        setMessage(e.target.value);
    }


    return (
        <section className="px-4 py-12 scroll-mt-24 md:scroll-mt-28" id="contact">
            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-md p-8">
                <Title title="Contact Me" />
                <form ref={formRef} className="space-y-6" onSubmit={sendEmail}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"                /* <-- match template */
                                value={name}
                                onChange={updateNameField}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={updateEmailField}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={message}
                                onChange={updateMessageField}
                                required
                                className="mt-1 w-full px-3 py-2 border resize-none border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full justify-center py-2 px-4 border border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-white bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-300 hover:from-blue-800 hover:via-sky-600 hover:to-cyan-400 font-semibold disabled:opacity-60"
                        >
                            {sending ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ContactMe;
