import Title from "./Title";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MotionDiv, fadeUp } from "./animations";

function ContactMe() {
    const formRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

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

    return (
        <section className="px-4 py-12 scroll-mt-24 md:scroll-mt-28" id="contact">
            <MotionDiv
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="mx-auto max-w-5xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-8"
            >
                <Title title="Contact Me" />
                <form ref={formRef} className="space-y-6" onSubmit={sendEmail}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="mt-1 w-full px-3 py-2 border resize-none border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800"
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
            </MotionDiv>
        </section>
    );
}

export default ContactMe;
