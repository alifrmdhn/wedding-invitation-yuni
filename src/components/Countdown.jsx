import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Countdown() {
  const weddingDate = useMemo(() => new Date("2026-08-01T13:00:00+08:00"), []);

  const [time, setTime] = useState(() => calculateTime(weddingDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime(weddingDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
      <Card value={time.days} label="Hari" />
      <Card value={time.hours} label="Jam" />
      <Card value={time.minutes} label="Menit" />
      <Card value={time.seconds} label="Detik" />
    </div>
  );
}

function calculateTime(weddingDate) {
  const difference = weddingDate - new Date();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Card({ value, label }) {
  return (
    <motion.div
      className="min-w-0 rounded-md border border-[#5d1721]/20 bg-[#fffaf3]/76 px-2 py-4 text-center shadow-[0_8px_22px_rgba(45,32,32,0.1)]"
    >
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24 }}
        className="serif text-3xl font-bold leading-none text-[#5d1721] sm:text-4xl"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b5745]">
        {label}
      </div>
    </motion.div>
  );
}
