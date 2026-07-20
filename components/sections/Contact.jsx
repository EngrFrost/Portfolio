"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/motion/MagneticButton";
import { fadeUp, stagger } from "@/lib/motion.config";

const inputClass =
  "w-full rounded-lg border border-surface-2 bg-surface px-4 py-3 outline-none transition-colors focus:border-accent";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-content px-4 py-32 md:px-8">
      <span className="section-number">04 — Contact</span>
      <h2 className="mt-8 text-4xl md:text-6xl">Get In Touch</h2>
      <p className="mt-4 max-w-xl text-text-muted">
        I am available for freelance or full-time positions. Contact me and let&apos;s talk.
        <br />
        <span className="text-text">jsamson257@gmail.com</span>
      </p>

      <motion.form
        action="https://getform.io/f/08ebcd37-f5b5-45be-8c13-714f011ce060"
        method="POST"
        encType="multipart/form-data"
        className="mt-12 max-w-2xl"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label className="text-sm uppercase tracking-widest text-text-muted">Name</label>
            <input className={inputClass} type="text" name="name" />
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label className="text-sm uppercase tracking-widest text-text-muted">Phone</label>
            <input className={inputClass} type="text" name="phone" />
          </motion.div>
        </div>
        <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-2">
          <label className="text-sm uppercase tracking-widest text-text-muted">Email</label>
          <input className={inputClass} type="email" name="email" />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-2">
          <label className="text-sm uppercase tracking-widest text-text-muted">Subject</label>
          <input className={inputClass} type="text" name="subject" />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-2">
          <label className="text-sm uppercase tracking-widest text-text-muted">Message</label>
          <textarea className={inputClass} rows={6} name="message" />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-8">
          <MagneticButton>
            <button
              type="submit"
              className="rounded-full bg-accent px-8 py-4 font-medium text-bg transition-transform hover:scale-105"
            >
              Send Message
            </button>
          </MagneticButton>
        </motion.div>
      </motion.form>
    </section>
  );
}
