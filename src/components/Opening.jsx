import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa6";

const coverPhoto = new URL("../assets/adnan12.jpeg", import.meta.url).href;

export default function Opening({ onOpen }) {
  const [guest] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || params.get("kpd");

    if (to) {
      return decodeURIComponent(to.replace(/\+/g, " "));
    }

    return "Tamu Undangan";
  });

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <img
        src={coverPhoto}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="cover-overlay" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[520px]"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-white/70">
            The Wedding Of
          </p>

          <h1 className="script mt-4 text-6xl font-normal leading-tight text-white sm:text-7xl">
            Adnan & Nuraisyah
          </h1>

          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <p className="mt-6 text-sm leading-6 text-white/70">
            Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
            untuk hadir di acara kami.
          </p>

          <div className="mx-auto mt-8 max-w-[340px] rounded-xl border border-white/15 bg-black/25 px-6 py-6 backdrop-blur-md">
            <p className="text-xs text-white/60">Kepada</p>
            <h3 className="serif mt-1 text-2xl font-bold text-white">{guest}</h3>

            <button
              onClick={onOpen}
              className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#5d1721] px-6 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition hover:bg-[#2d2020]"
            >
              <FaEnvelopeOpenText aria-hidden="true" />
              Buka Undangan
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
