import { useEffect, useState } from "react";
import {
  FaCalendarDays,
  FaCalendarPlus,
  FaChevronDown,
  FaGift,
  FaHouseChimney,
  FaImages,
  FaLocationDot,
  FaMapLocationDot,
  FaPaperPlane,
  FaRegClock,
  FaUserGroup,
  FaXmark,
} from "react-icons/fa6";

import Countdown from "./Countdown";
import useInView from "../hooks/useInView";

const heroPhoto = new URL("../assets/adnan12.jpeg", import.meta.url).href;
const groomPhoto = new URL("../assets/cowo1.jpeg", import.meta.url).href;
const bridePhoto = new URL("../assets/cewe1.jpeg", import.meta.url).href;

const adnan1 = new URL("../assets/adnan1.jpeg", import.meta.url).href;
const adnan3 = new URL("../assets/adnan3.jpeg", import.meta.url).href;
const adnan4 = new URL("../assets/adnan4.jpeg", import.meta.url).href;
const adnan11 = new URL("../assets/adnan11.jpeg", import.meta.url).href;
const duo1 = new URL("../assets/duo1.jpeg", import.meta.url).href;
const duo2 = new URL("../assets/duo2.jpeg", import.meta.url).href;
const duo3 = new URL("../assets/duo3.jpeg", import.meta.url).href;
const duo4 = new URL("../assets/duo4.jpeg", import.meta.url).href;

const sliderPhotos = [adnan3, adnan4, adnan11, heroPhoto, duo1, duo2, duo3, duo4];
const gallery = [duo1, adnan1, duo3, duo2, adnan4];

export default function Hero() {
  useEffect(() => {
    let rafId;
    let prevTime = null;
    let stopped = false;
    const speed = 160;

    const tick = (now) => {
      if (stopped) return;
      if (prevTime === null) prevTime = now;
      const delta = now - prevTime;

      if (delta > 200) {
        prevTime = now;
        rafId = requestAnimationFrame(tick);
        return;
      }

      prevTime = now;

      const reachedBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;

      if (reachedBottom) return;

      window.scrollBy({ top: (speed * delta) / 1000 });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const stop = () => {
      stopped = true;
      cancelAnimationFrame(rafId);
    };

    const onVisibility = () => {
      if (!stopped) prevTime = null;
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("mousedown", stop);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("mousedown", stop);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <main className="bg-[#241619] text-[#2d2020]">
      <div className="page-frame pb-24">
        <HeroSection />
        <IntroSection />
        <CoupleSection />
        <EventSection />
        <GallerySection />
        <RsvpSection />
        <GiftSection />
        <ClosingSection />
        <BottomNav />
      </div>
    </main>
  );
}

function HeroSection() {
  return (
    <section id="home" className="marble-section relative min-h-[85vh] overflow-hidden px-6 py-12 text-center">

      <div className="relative z-10 mx-auto max-w-[560px]">
        <p className="text-lg leading-none text-[#2d2020]">
          السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
        </p>
        <h1 className="script mt-8 text-6xl leading-tight text-[#5d1721] sm:text-7xl">
          The Wedding of
          <br />
          Adnan & Nuraisyah
        </h1>
        <p className="mx-auto mt-8 max-w-[460px] text-base leading-8 text-[#5f5147]">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
          Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami.
        </p>

        <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[#b68a46]/50 to-transparent" />

        <div className="arch-photo mx-auto mt-8">
          <img src={heroPhoto} alt="Adnan dan Nuraisyah" />
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="section-shell text-center">
      <PhotoSlider />
      <div className="my-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#b68a46]/40 to-transparent" />
      <div className="quran-verse px-4">
        <p className="arabic-text text-2xl leading-loose text-[#2d2020]" dir="rtl">
          وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
        </p>
        <p className="mt-3 text-sm leading-7 text-[#5f5147]">
          Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7d1825]">
          — Ar-Rum · Ayat 21 —
        </p>
      </div>
      <div className="my-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#b68a46]/40 to-transparent" />
      <div className="card-soft px-7 py-8">
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#7d1825]">
          Save The Date
        </p>
        <h2 className="serif mt-3 text-5xl font-bold text-[#2d2020]">01 Agustus 2026</h2>
        <div className="gold-divider" />
        <p className="leading-8 text-[#5f5147]">
          Sabtu, pukul 09.00 WITA sampai selesai.
        </p>
        <Countdown />
        <SaveCalendarButton />
        <ScrollHint />
      </div>
    </section>
  );
}

function PhotoSlider() {
  const doubled = [...sliderPhotos, ...sliderPhotos];

  return (
    <div className="slider-wrap rounded-lg">
      <div className="slider-track">
        {doubled.map((img, i) => {
          const isDuo = [duo1, duo2, duo3, duo4].includes(img);

          return (
            <img
              key={i}
              src={img}
              alt=""
              loading="lazy"
              className={isDuo ? "slider-landscape" : ""}
            />
          );
        })}
      </div>
    </div>
  );
}

function SaveCalendarButton() {
  const saveToCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Adnan Nuraisyah Wedding//Invitation//ID",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:adnan-nuraisyah-wedding-20260801@undangan",
      "DTSTAMP:20260716T000000Z",
      "DTSTART:20260801T010000Z",
      "DTEND:20260801T090000Z",
      "SUMMARY:Pernikahan Adnan & Nuraisyah",
      "LOCATION:Pulau Barrang Lompo, Makassar",
      "DESCRIPTION:Akad Nikah dan Resepsi pukul 13.00 WITA.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "pernikahan-adnan-nuraisyah.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={saveToCalendar}
      className="mt-8 inline-flex items-center justify-center gap-3 rounded-md bg-[#5d1721] px-6 py-4 text-sm font-semibold text-[#f6efe6] shadow-[0_14px_30px_rgba(93,23,33,0.24)] transition hover:bg-[#2d2020] hover:-translate-y-0.5 active:scale-[0.97]"
    >
      <FaCalendarPlus aria-hidden="true" />
      Save To Calendar
    </button>
  );
}

function ScrollHint() {
  return (
    <div className="mt-8 flex flex-col items-center text-[#5d1721]/35">
      {[0, 1, 2].map((item) => (
        <span
          key={item}
          className="-mb-2 text-2xl"
          style={{
            animation: `scrollBounce 1.6s ${item * 0.18}s ease-in-out infinite`,
          }}
        >
          <FaChevronDown aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

function CoupleSection() {
  const ref = useInView("revealed", 0.12);
  return (
    <section id="mempelai" className="section-shell text-center">
      <div ref={ref} className="reveal">
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#7d1825]">Mempelai</p>
        <h2 className="serif mt-3 text-5xl font-bold text-[#2d2020]">Bride & Groom</h2>
      </div>

      <div className="mt-10 grid gap-8">
        <ProfileCard
          image={groomPhoto}
          name="Adnan"
          detail="Putra Bungsu dari (Alm. H. Achmad Mahasung Chacum) & Ibu Hj. St. Syamsidar Tajuddin A. Muin"
        />
        <ProfileCard
          image={bridePhoto}
          name="Nuraisyah"
          detail="Putri Bungsu dari Bapak Arifin & Ibu Musdalifah"
        />
      </div>
    </section>
  );
}

function ProfileCard({ image, name, detail }) {
  const ref = useInView("revealed", 0.15);
  return (
    <article ref={ref} className="reveal-card card-soft px-7 py-9 text-center">
      <div className="arch-photo mx-auto">
        <img src={image} alt={name} />
      </div>
      <h3 className="serif mt-8 text-5xl font-bold text-[#2d2020]">{name}</h3>
      <p className="mx-auto mt-5 max-w-[380px] text-base leading-8 text-[#5d1721]">{detail}</p>
    </article>
  );
}

function EventSection() {
  const ref = useInView("revealed", 0.12);
  return (
    <section id="acara" className="section-shell">
      <div ref={ref} className="reveal text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#7d1825]">Wedding Event</p>
        <h2 className="serif mt-3 text-5xl font-bold text-[#2d2020]">Rangkaian Acara</h2>
      </div>

      <div className="mt-10 grid gap-0">
        <EventCard
          title="Akad Nikah & Resepsi"
          time="13.00 WITA - Selesai"
          place="Kediaman Mempelai Wanita"
          address="Pulau Barrang Lompo, Makassar"
          variant="first"
        />
        {/* <EventCard
          title="Resepsi"
          time="13.00 WITA - Selesai"
          place="Gedung Serbaguna Al-Ikhlas"
          address="Pulau Barrang Lompo, Makassar"
          variant="last"
        /> */}
      </div>
    </section>
  );
}

function EventCard({ title, time, place, address, variant = "mid" }) {
  const ref = useInView("revealed", 0.15);
  const radiusClass =
    variant === "first"
      ? "event-card-first"
      : variant === "last"
        ? "event-card-last"
        : "event-card-mid";
  return (
    <article ref={ref} className={`reveal-card card-soft ${radiusClass} px-7 py-8 text-center`}>
      <h3 className="serif text-4xl font-bold text-[#5d1721]">{title}</h3>
      <div className="gold-divider" />
      <div className="grid gap-4 text-[#4d4038]">
        <InfoRow icon={<FaCalendarDays />} text="Sabtu, 01 Agustus 2026" />
        <InfoRow icon={<FaRegClock />} text={time} />
        <InfoRow icon={<FaLocationDot />} text={place} />
        <p className="text-sm leading-7 text-[#5f5147]">{address}</p>
      </div>
      <a
  href="https://maps.app.goo.gl/cCeryCAqiWbwadG6A"
  target="_blank"
  rel="noreferrer"
  className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-[#5d1721] px-5 py-3 text-sm font-semibold shadow-[0_6px_18px_rgba(93,23,33,0.3)] transition hover:bg-[#2d2020]"
  style={{ color: "#fff" }}
>
  <FaMapLocationDot style={{ color: "#fff" }} />
  <span style={{ color: "#fff" }}>Buka Maps</span>
</a>
    </article>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center justify-center gap-3 text-sm font-semibold">
      <span className="text-[#7d1825]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function GallerySection() {
  const ref = useInView("revealed", 0.12);
  return (
    <section id="galeri" className="section-shell text-center">
      <div ref={ref} className="reveal">
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#7d1825]">Gallery</p>
        <h2 className="serif mt-3 text-5xl font-bold text-[#2d2020]">Our Moments</h2>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4">
        {gallery.map((image, index) => (
          <GalleryItem key={image} image={image} index={index} />
        ))}
      </div>
    </section>
  );
}

function GalleryItem({ image, index }) {
  const ref = useInView("revealed", 0.15);
  return (
    <div
      ref={ref}
      className={`reveal-photo overflow-hidden rounded-lg ${index === 0 ? "col-span-2" : ""}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <img src={image} alt="" className={`w-full object-cover ${index === 0 ? "h-80" : "h-48"}`} />
    </div>
  );
}

function RsvpSection() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wedding-messages") || "[]");
    } catch {
      return [];
    }
  });
  const [name, setName] = useState("");
  const [presence, setPresence] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleDelete = (id) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("wedding-messages", JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (!name.trim() || !presence || !message.trim()) return;

    const newMsg = {
      id: Date.now(),
      name: name.trim(),
      presence,
      message: message.trim(),
      time: new Date().toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem("wedding-messages", JSON.stringify(updated));
    setName("");
    setPresence("");
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <section id="rsvp" className="section-shell">
      <div className="card-soft p-7">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#7d1825]">RSVP</p>
          <h2 className="serif mt-3 text-5xl font-bold text-[#2d2020]">Konfirmasi Kehadiran</h2>
        </div>
        <form className="mt-8 grid gap-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-[#5d1721]/25 bg-[#fffaf3]/80 px-4 py-3 text-[#2d2020] outline-none focus:border-[#5d1721]"
            placeholder="Nama"
          />
          <select
            value={presence}
            onChange={(e) => setPresence(e.target.value)}
            className="rounded-md border border-[#5d1721]/25 bg-[#fffaf3]/80 px-4 py-3 text-[#2d2020] outline-none focus:border-[#5d1721]"
          >
            <option value="" disabled>Kehadiran</option>
            <option>InsyaAllah hadir</option>
            <option>Mohon maaf belum bisa hadir</option>
          </select>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-28 rounded-md border border-[#5d1721]/25 bg-[#fffaf3]/80 px-4 py-3 text-[#2d2020] outline-none focus:border-[#5d1721]"
            placeholder="Ucapan dan doa"
          />
          <button type="submit" className="inline-flex items-center justify-center gap-3 rounded-md bg-[#5d1721] px-6 py-4 text-sm font-semibold text-[#f6efe6] transition hover:bg-[#2d2020]">
            <FaPaperPlane aria-hidden="true" />
            {sent ? "Terkirim!" : "Kirim Ucapan"}
          </button>
        </form>
      </div>

      {messages.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#7d1825]">Ucapan & Doa</p>
            <p className="text-xs text-[#5f5147]">{messages.length} ucapan</p>
          </div>
          <div className="grid gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className="relative rounded-lg border border-[#5d1721]/10 bg-[#fffaf3]/70 p-4">
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[#5f5147] transition hover:bg-red-100 hover:text-red-600"
                  aria-label="Hapus ucapan"
                >
                  <FaXmark />
                </button>
                <div className="flex items-center justify-between pr-7">
                  <p className="text-sm font-semibold text-[#5d1721]">{msg.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${msg.presence === "InsyaAllah hadir" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {msg.presence === "InsyaAllah hadir" ? "Hadir" : "Tidak Hadir"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#4d4038]">{msg.message}</p>
                <p className="mt-2 text-[10px] text-[#5f5147]">{msg.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function GiftSection() {
  const ref = useInView("revealed", 0.15);
  return (
    <section id="gift" className="section-shell text-center">
      <div ref={ref} className="reveal card-soft p-7">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#5d1721] text-xl text-[#f6efe6]">
          <FaGift aria-hidden="true" />
        </div>
        <h2 className="serif mt-5 text-5xl font-bold text-[#2d2020]">Wedding Gift</h2>
        <p className="mt-4 leading-8 text-[#5f5147]">
          Doa restu Bapak/Ibu/Saudara/i adalah hadiah terindah bagi kami. Tanpa mengurangi
          rasa hormat, tanda kasih juga dapat diberikan melalui rekening berikut.
        </p>
        <div className="mx-auto mt-7 max-w-[360px] rounded-md border border-[#5d1721]/20 bg-[#fffaf3]/70 p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-[#5d1721]">Bank Sulselbar</p>
          <p className="serif mt-2 text-3xl font-bold text-[#2d2020]">1302010000551521</p>
          <p className="mt-1 text-sm text-[#5f5147]">a.n. M ADNAN GANDHY NURSANTIYO</p>
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  const ref = useInView("revealed", 0.12);
  return (
    <section className="closing-bg relative min-h-[50vh] text-center" style={{ backgroundImage: `url(${heroPhoto})` }}>
      <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center px-6 py-12">
        <div ref={ref} className="reveal">
          <p className="serif text-2xl leading-9 text-white/80">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
          <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Kami yang berbahagia</p>
          <h2 className="script mt-4 text-5xl text-white">Adnan & Nuraisyah</h2>
        </div>
      </div>
    </section>
  );
}

function BottomNav() {
  const items = [
    { href: "#home", icon: <FaHouseChimney />, label: "Home" },
    { href: "#mempelai", icon: <FaUserGroup />, label: "Mempelai" },
    { href: "#galeri", icon: <FaImages />, label: "Galeri" },
    { href: "#acara", icon: <FaLocationDot />, label: "Lokasi" },
    { href: "#gift", icon: <FaGift />, label: "Gift" },
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 z-50 w-[min(calc(100%-24px),560px)] -translate-x-1/2 rounded-xl border border-[#b68a46]/25 bg-[#211618]/86 px-3 py-2 shadow-[0_10px_34px_rgba(0,0,0,0.24)] backdrop-blur">
      <div className="grid grid-cols-5">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="flex min-w-0 flex-col items-center gap-1 rounded-md px-2 py-2 text-[#efe4d3] transition hover:bg-[#5d1721]">
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-semibold leading-none">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
