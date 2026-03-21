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

    const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-200 text-sm";

    return (
        <section className="px-4 py-12 scroll-mt-24 md:scroll-mt-28" id="contact">
            <MotionDiv
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="mx-auto max-w-5xl rounded-2xl border border-slate-200/80 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/70 shadow-xl shadow-slate-200/40 dark:shadow-black/40 backdrop-blur-sm p-4 md:p-8"
            >
                <Title title="Contact Me" />

                <div className="max-w-xl mx-auto">
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8">
                        Have a question or want to work together? Feel free to reach out.
                    </p>

                    <form ref={formRef} className="space-y-4" onSubmit={sendEmail}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Your name"
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className={inputCls}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                placeholder="Write your message..."
                                className={`${inputCls} resize-none`}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {sending ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </MotionDiv>
        </section>
    );
}

export default ContactMe;
