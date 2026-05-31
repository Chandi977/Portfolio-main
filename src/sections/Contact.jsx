import { useState, useCallback, memo } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { ChapterFrame } from "../components/starlog/ds";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const showMsg = useCallback((type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await emailjs.send(
          "service_79b0nyj",
          "template_17us8im",
          {
            from_name: formData.name,
            to_name: "Chandi Charan Mahato",
            from_email: formData.email,
            to_email: "charan.f.sde@gmail.com",
            message: formData.message,
          },
          "pn-Bw_mS1_QQdofuV",
        );
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "" });
        showMsg("success", "Message sent successfully. I'll reply soon.");
      } catch (error) {
        setIsLoading(false);
        console.error("Email sending failed:", error);
        showMsg("danger", "Failed to send message. Please try again.");
      }
    },
    [formData, showMsg],
  );

  return (
    <ChapterFrame id="contact" className="relative pt-24 pb-28">
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="max-w-3xl mx-auto px-4 text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] font-body text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-6">
          Get in touch
        </span>
        <h2 className="font-display-tight text-4xl md:text-6xl text-white tracking-[-0.04em] leading-[0.95] mb-6">
          Let's build <span className="italic text-mint">together.</span>
        </h2>
        <p className="max-w-xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed font-body">
          Have a project in mind, a role to fill, or just want to chat? Drop a message below and let's start the conversation.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-2xl p-6 md:p-10 backdrop-blur-md shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-body">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-mint/50 focus:bg-white/[0.04] rounded-xl px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-300 font-body text-sm"
              placeholder="What should I call you?"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-body">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-mint/50 focus:bg-white/[0.04] rounded-xl px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-300 font-body text-sm"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-body">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-mint/50 focus:bg-white/[0.04] rounded-xl px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-300 font-body text-sm resize-none"
              placeholder="What are we building, improving, or launching?"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs text-neutral-500 font-body">
              {formData.message.length} characters
            </span>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mint/80 to-aqua/80 hover:from-mint hover:to-aqua text-primary font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_24px_-12px_rgba(87,219,150,0.6)] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <span>{isLoading ? "Sending..." : "Send Message"}</span>
              <span className="text-xs font-light">↗</span>
            </button>
          </div>
        </form>
      </div>
    </ChapterFrame>
  );
};

export default memo(Contact);
