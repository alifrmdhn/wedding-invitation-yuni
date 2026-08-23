import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaHouseChimney,
  FaUserGroup,
  FaImages,
  FaLocationDot,
  FaPaperPlane,
  FaGift,
  FaCopy,
} from "react-icons/fa6";
import Countdown from "./Countdown";
import RSVP from "./RSVP";

const heroBackground = new URL(
  "../assets/layout bg.png",
  import.meta.url
).href;

const redBackground = new URL(
  "../assets/bg merah.png",
  import.meta.url
).href;

const heroPhoto = new URL(
  "../assets/foto 1.png",
  import.meta.url
).href;

const whiteLine = new URL(
  "../assets/line putih.png",
  import.meta.url
).href;

const secondPhoto = new URL(
  "../assets/foto 2.png",
  import.meta.url
).href;

const element1 = new URL(
  "../assets/elemen 1.png",
  import.meta.url
).href;

const yearPhoto = new URL(
  "../assets/tahun.png",
  import.meta.url
).href;

const calendarPhoto = new URL(
  "../assets/kalender.png",
  import.meta.url
).href;

const redLine = new URL(
  "../assets/line merah.png",
  import.meta.url
).href;

const framePhoto2 = new URL(
  "../assets/foto frame 2.png",
  import.meta.url
).href;

const framePhoto3 = new URL(
  "../assets/foto frame 3.png",
  import.meta.url
).href;

const upSliderPhoto = new URL(
  "../assets/up slider.png",
  import.meta.url
).href;

const sliderPhotos = [
  new URL("../assets/slider1.jpeg", import.meta.url).href,
  new URL("../assets/slider2.jpeg", import.meta.url).href,
  new URL("../assets/slider3.jpeg", import.meta.url).href,
  new URL("../assets/slider4.jpeg", import.meta.url).href,
  new URL("../assets/slider5.jpeg", import.meta.url).href,
  new URL("../assets/slider6.jpeg", import.meta.url).href,
  new URL("../assets/slider7.jpeg", import.meta.url).href,
  new URL("../assets/slider8.jpeg", import.meta.url).href,
  new URL("../assets/slider10.jpeg", import.meta.url).href,
  new URL("../assets/slider11.jpeg", import.meta.url).href,
  new URL("../assets/slider13.jpeg", import.meta.url).href,
  new URL("../assets/slider14.jpeg", import.meta.url).href,
  new URL("../assets/slider15.jpeg", import.meta.url).href,
  new URL("../assets/slider16.jpeg", import.meta.url).href,
  new URL("../assets/slider17.jpeg", import.meta.url).href,
  new URL("../assets/slider18.jpeg", import.meta.url).href,
  new URL("../assets/slider19.jpeg", import.meta.url).href,
  new URL("../assets/slider20.jpeg", import.meta.url).href,
];

const briLogo = new URL(
  "../assets/BRI.png",
  import.meta.url
).href;

const briArdian = new URL(
  "../assets/BRI Ardian.png",
  import.meta.url
).href;

export default function Hero() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [copiedAccount, setCopiedAccount] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto(
        (prev) => (prev + 1) % sliderPhotos.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(
      ".scroll-reveal-section"
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let rafId;
    let prevTime = null;
    let stopped = false;

    const speed = 160;

    const tick = (now) => {
      if (stopped) return;

      if (prevTime === null) {
        prevTime = now;
      }

      const delta = now - prevTime;

      if (delta > 200) {
        prevTime = now;
        rafId = requestAnimationFrame(tick);
        return;
      }

      prevTime = now;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      const reachedBottom =
        window.innerHeight + window.scrollY >=
        docHeight - 8;

      if (reachedBottom) {
        stopped = true;
        cancelAnimationFrame(rafId);
        return;
      }

      window.scrollBy(
        0,
        Math.max(
          1,
          Math.round((speed * delta) / 1000)
        )
      );

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const stop = () => {
      if (stopped) return;

      stopped = true;
      cancelAnimationFrame(rafId);
    };

    window.addEventListener("wheel", stop, {
      passive: true,
    });

    window.addEventListener("touchstart", stop, {
      passive: true,
    });

    window.addEventListener("touchmove", stop, {
      passive: true,
    });

    window.addEventListener("pointerdown", stop, {
      passive: true,
    });

    window.addEventListener("keydown", stop);

    window.addEventListener("mousedown", stop);

    const onVisibility = () => {
      if (!stopped) {
        prevTime = null;
      }
    };

    document.addEventListener(
      "visibilitychange",
      onVisibility
    );

    return () => {
      stopped = true;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("mousedown", stop);

      document.removeEventListener(
        "visibilitychange",
        onVisibility
      );
    };
  }, []);

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "390px",
        margin: "0 auto",

        backgroundImage: `url("${heroBackground}"), url("${redBackground}")`,
        backgroundSize: "100% auto, cover",
        backgroundPosition: "top center, center center",
        backgroundRepeat: "no-repeat, no-repeat",

        boxSizing: "border-box",
      }}
    >

      <div
        id="home"
        className="scroll-reveal-section"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          paddingTop: "25px",
          paddingBottom: "25px",

          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            color: "#b0003a",
            fontFamily: '"Heligthon Signature", cursive',
            fontSize: "35px",
            lineHeight: 1,
            textAlign: "center",
            marginBottom: "5px",
          }}
        >
          The Wedding Of
        </div>

        <div
          style={{
            width: "90%",
            background: "#fff",
            border: "1.5px solid #333",
            padding: "5px",
            boxSizing: "border-box",

            transform: "scale(1.25)",
            transformOrigin: "top center",

            marginTop: "20px",
            marginBottom: "-95px",
          }}
        >
          <img
            src={heroPhoto}
            alt="Yuni dan Ardian"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />

          <div
            style={{
              textAlign: "center",
              color: "#b0003a",
              paddingTop: "5px",
              paddingBottom: "3px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily:
                  '"Heligthon Signature", cursive',
                fontSize: "13px",
                lineHeight: 1,
              }}
            >
              Wahyuni, A.Md.Kep.
            </p>

            <span
              style={{
                display: "block",
                margin: "3px 0",
                fontFamily: "Arial, sans-serif",
                fontSize: "4px",
                letterSpacing: "0.4em",
              }}
            >
              DENGAN
            </span>

            <p
              style={{
                margin: 0,
                fontFamily:
                  '"Heligthon Signature", cursive',
                fontSize: "12px",
                lineHeight: 1,
              }}
            >
              Briptu Ardian Syaputra, S.H.
            </p>
          </div>
        </div>
      </div>

      <div
        className="scroll-reveal-section"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxSizing: "border-box",

          paddingTop: "200px",
          paddingBottom: "40px",
        }}
      >
        {}

        <img
          src={whiteLine}
          alt=""
          style={{
            display: "block",
            width: "55%",
            height: "auto",
            marginBottom: "18px",
          }}
        />

        <p
          style={{
            width: "100%",
            boxSizing: "border-box",

            paddingLeft: "35px",
            paddingRight: "35px",

            margin: "0 0 0px",

            color: "#ffffff",

            fontFamily: "Arial, sans-serif",
            fontSize: "15px",
            fontWeight: 400,

            lineHeight: 1.35,
            textAlign: "center",
          }}
        >
          Dengan memohon rahmat dan ridho Allah
          subhanahu Wa Ta&apos;ala., kami mengundang
          Bapak/Ibu/Saudara/i untuk hadir dan memberikan
          do&apos;a rest pada acara pernikahan kami.
        </p>

        {}

        <div
          style={{
            position: "relative",

            width: "100%",

            margin: 0,
            padding: 0,

            transform: "translateY(-50px)",

            boxSizing: "border-box",

            overflow: "hidden",
          }}
        >
          {}

          <img
            src={element1}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",

              top: "-2%",
              right: "-22%",

              width: "58%",
              height: "auto",

              margin: 0,
              padding: 18,

              pointerEvents: "none",

              zIndex: 1,
            }}
          />

          {}

          <img
            src={element1}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",

              bottom: "-7%",
              left: "-30%",

              width: "70%",
              height: "auto",

              margin: 0,
              padding: 9,

              transform: "rotate(180deg)",

              pointerEvents: "none",

              zIndex: 1,
            }}
          />

          {}

          <img
            src={secondPhoto}
            alt="Yuni dan Ardian"
            style={{
              position: "relative",

              display: "block",

              width: "101%",
              height: "auto",

              maxWidth: "101%",

              margin: 0,
              padding: 0,

              zIndex: 5,
            }}
          />
        </div>

        {}

        <div
          style={{
            width: "88%",

            boxSizing: "border-box",

            marginTop: "-130px",

            padding: "18px 16px 20px",

            background:
              "rgba(255, 255, 255, 0.18)",

            border:
              "1px solid rgba(255, 255, 255, 0.45)",

            borderRadius: "18px",

            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",

            boxShadow:
              "0 5px 18px rgba(80, 0, 30, 0.12)",

            color: "#ffffff",

            textAlign: "center",
          }}
        >
          {}

          <p
            dir="rtl"
            style={{
              margin: 0,

              fontFamily: "serif",

              fontSize: "17px",

              fontWeight: 600,

              lineHeight: 1.7,

              textAlign: "center",

              color: "#020202ff",

              textShadow:
                "0 1px 3px rgba(80, 0, 30, 0.45)",
            }}
          >
            وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ
            اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا
            اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً
            وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ
            لِّقَوْمٍ يَّتَفَكَّرُوْنَ
          </p>

          {}

          <div
            style={{
              width: "55%",
              height: "1px",
              margin: "14px auto",
              background:
                "rgba(255, 255, 255, 0.40)",
            }}
          />

          {}

          <p
            style={{
              margin: 0,

              fontFamily: "Arial, sans-serif",

              fontSize: "9px",

              fontWeight: 400,

              lineHeight: 1.5,

              textAlign: "center",

              color: "#ffffff",

              textShadow:
                "0 1px 2px rgba(80, 0, 30, 0.35)",
            }}
          >
            Di antara tanda-tanda (kebesaran)-Nya ialah
            bahwa Dia menciptakan pasangan-pasangan
            untukmu dari (jenis) dirimu sendiri agar
            kamu merasa tenteram kepadanya. Dia
            menjadikan di antaramu rasa cinta dan kasih
            sayang. Sesungguhnya pada yang demikian
            itu benar-benar terdapat tanda-tanda
            (kebesaran Allah) bagi kaum yang berpikir.
          </p>

          {}

          <p
            style={{
              margin: "12px 0 0",

              fontFamily: "Arial, sans-serif",

              fontSize: "9px",

              fontWeight: 500,

              lineHeight: 1.3,

              textAlign: "center",

              color: "#ffffff",

              textShadow:
                "0 1px 2px rgba(80, 0, 30, 0.35)",
            }}
          >
            — Ar-Rum · Ayat 21 —
          </p>
        </div>

        {}

        <img
          src={whiteLine}
          alt=""
          style={{
            display: "block",
            width: "55%",
            height: "auto",
            marginTop: "25px",
          }}
        />
      </div>

      {}

      <div
        id="acara"
        className="scroll-reveal-section"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxSizing: "border-box",

          paddingTop: "50px",
          paddingBottom: "60px",

          background: "transparent",
        }}
      >
        {}

        <img
          src={yearPhoto}
          alt="Tahun 2026"
          style={{
            display: "block",
            width: "60%",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        />

        {}

        <img
          src={calendarPhoto}
          alt="Kalender September 2026"
          style={{
            display: "block",
            width: "75%",
            height: "auto",
            margin: 0,
            padding: 30,
            boxSizing: "border-box",
          }}
        />

        {}

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxSizing: "border-box",

            marginTop: "-5px",

            color: "#000000",
            textAlign: "center",
          }}
        >
          {}

          <img
            src={redLine}
            alt=""
            style={{
              display: "block",
              width: "45%",
              height: "auto",
              margin: "0 auto 12px",
            }}
          />

          {}

          <div
            style={{
              fontFamily:
                '"Heligthon Signature", cursive',
              color: "#b0003a",
              fontSize: "15px",
              lineHeight: 1,
              marginBottom: "4px",
            }}
          >
            Akad - Kediaman Mempelai Wanita
          </div>

          {}

          <div
            style={{
              fontFamily: "Arial, sans-serif",
              color: "#000000",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            10.00 WITA - Selesai
          </div>

          {}

          <div
            style={{
              fontFamily:
                '"Heligthon Signature", cursive',
              color: "#b0003a",
              fontSize: "15px",
              lineHeight: 1,
              marginBottom: "4px",
            }}
          >
            Resepsi - Kediaman Mempelai Wanita
          </div>

          {}

          <div
            style={{
              fontFamily: "Arial, sans-serif",
              color: "#000000",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            20.00 WITA - Selesai
          </div>

          {}

          <img
            src={redLine}
            alt=""
            style={{
              display: "block",
              width: "45%",
              height: "auto",
              margin: "0 auto",
            }}
          />
        </div>

        {}

        <Countdown />
      </div>

      {}

      <div
        id="mempelai"
        className="scroll-reveal-section"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxSizing: "border-box",

          paddingTop: "10px",
          paddingBottom: "70px",

          textAlign: "center",

          color: "#ffffff",
        }}
      >
        {}

        <div
          style={{
            color: "#ffffff",

            fontFamily: "Arial, sans-serif",
            fontSize: "15px",
            fontWeight: 500,

            letterSpacing: "0.28em",

            lineHeight: 1,

            marginBottom: "10px",
          }}
        >
          MEMPELAI
        </div>

        <div
          style={{
            color: "#ffffff",

            fontFamily:
              "Georgia, 'Times New Roman', serif",
            fontSize: "31px",
            fontWeight: 700,

            lineHeight: 1.05,

            textAlign: "center",

            marginBottom: "40px",

            textShadow:
              "0 1px 2px rgba(0, 0, 0, 0.15)",
          }}
        >
          Bride &amp; Groom
        </div>

        {}

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxSizing: "border-box",
          }}
        >
          {}

          <div
            style={{
              width: "58%",

              background: "#ffffff",

              border: "1.5px solid #222",

              padding: "8px 8px 17px",

              boxSizing: "border-box",

              boxShadow:
                "0 3px 8px rgba(0, 0, 0, 0.18)",
            }}
          >
            <img
              src={framePhoto2}
              alt="Wahyuni, A.Md.Kep."
              style={{
                display: "block",

                width: "100%",
                height: "auto",

                margin: 0,
                padding: 0,
              }}
            />

            {}

            <div
              style={{
                color: "#b0003a",

                fontFamily:
                  '"Heligthon Signature", cursive',

                fontSize: "14px",

                lineHeight: 1,

                textAlign: "center",

                marginTop: "14px",

                whiteSpace: "nowrap",
              }}
            >
              Wahyuni, A.Md.Kep.
            </div>
          </div>

          {}

          <div
            style={{
              marginTop: "14px",

              color: "#ffffff",

              fontFamily: "Arial, sans-serif",

              fontSize: "12px",

              fontWeight: 400,

              lineHeight: 1.3,

              textAlign: "center",

              textShadow:
                "0 1px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div>Putri pertama dari</div>
            <div>
              Bapak Jumainɡ &amp; Ibu Marsiani
            </div>
          </div>
        </div>

        {}

        <div
          style={{
            height: "30px",
          }}
        />

        {}

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxSizing: "border-box",
          }}
        >
          {}

          <div
            style={{
              width: "58%",

              background: "#ffffff",

              border: "1.5px solid #222",

              padding: "8px 8px 17px",

              boxSizing: "border-box",

              boxShadow:
                "0 3px 8px rgba(0, 0, 0, 0.18)",
            }}
          >
            <img
              src={framePhoto3}
              alt="Briptu Ardian Syaputra, S.H."
              style={{
                display: "block",

                width: "100%",
                height: "auto",

                margin: 0,
                padding: 0,
              }}
            />

            {}

            <div
              style={{
                color: "#b0003a",

                fontFamily:
                  '"Heligthon Signature", cursive',

                fontSize: "14px",

                lineHeight: 1.1,

                textAlign: "center",

                marginTop: "14px",

                whiteSpace: "nowrap",
              }}
            >
              Briptu Ardian Syaputra, S.H.
            </div>
          </div>

          {}

          <div
            style={{
              marginTop: "14px",

              color: "#ffffff",

              fontFamily: "Arial, sans-serif",

              fontSize: "12px",

              fontWeight: 400,

              lineHeight: 1.3,

              textAlign: "center",

              textShadow:
                "0 1px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div>Putra pertama dari</div>
            <div>
              Bapak Supriadi &amp; Ibu Rosmi
            </div>
          </div>
        </div>
      </div>

      {}

      <div
        id="galeri"
        className="scroll-reveal-section"
        style={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxSizing: "border-box",

          paddingTop: "55px",
          paddingBottom: "80px",

          background: "transparent",

          textAlign: "center",
        }}
      >
        {}

        <div
          style={{
            color: "#000000",

            fontFamily: "Arial, sans-serif",
            fontSize: "15px",
            fontWeight: 400,

            letterSpacing: "0.28em",

            lineHeight: 1,

            marginBottom: "9px",
          }}
        >
          GALLERY
        </div>

        {}

        <div
          style={{
            color: "#000000",

            fontFamily:
              "Georgia, 'Times New Roman', serif",
            fontSize: "31px",
            fontWeight: 700,

            lineHeight: 1.05,

            marginBottom: "32px",

            textAlign: "center",
          }}
        >
          Our Moments
        </div>

        {}

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "35px",
            boxSizing: "border-box",
          }}
        >
          {}

          <div
            style={{
              position: "relative",
              width: "70%",
              height: "285px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              boxSizing: "border-box",
            }}
          >
            {}

            <motion.div
              style={{
                position: "absolute",
                top: "18px",
                left: "8px",

                width: "62%",
                height: "255px",

                background: "#ffffff",
                border: "1.5px solid #222",

                padding: "7px 7px 16px",
                boxSizing: "border-box",

                transform: "rotate(-13deg)",

                boxShadow:
                  "0 3px 8px rgba(0, 0, 0, 0.12)",

                zIndex: 1,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`fan-left-back-${currentPhoto}`}
                  src={
                    sliderPhotos[
                      (currentPhoto + 1) %
                        sliderPhotos.length
                    ]
                  }
                  alt={`Gallery ${
                    ((currentPhoto + 1) %
                      sliderPhotos.length) + 1
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "215px",
                    objectFit: "contain",
                    objectPosition: "center",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </AnimatePresence>
            </motion.div>

            {}

            <motion.div
              style={{
                position: "absolute",
                top: "5px",
                left: "22px",

                width: "62%",
                height: "255px",

                background: "#ffffff",
                border: "1.5px solid #222",

                padding: "7px 7px 16px",
                boxSizing: "border-box",

                transform: "rotate(-7deg)",

                boxShadow:
                  "0 3px 8px rgba(0, 0, 0, 0.13)",

                zIndex: 2,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`fan-left-${currentPhoto}`}
                  src={
                    sliderPhotos[
                      (currentPhoto + 2) %
                        sliderPhotos.length
                    ]
                  }
                  alt={`Gallery ${
                    ((currentPhoto + 2) %
                      sliderPhotos.length) + 1
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "215px",
                    objectFit: "contain",
                    objectPosition: "center",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </AnimatePresence>
            </motion.div>

            {}

            <motion.div
              style={{
                position: "absolute",
                top: "5px",
                right: "22px",

                width: "62%",
                height: "255px",

                background: "#ffffff",
                border: "1.5px solid #222",

                padding: "7px 7px 16px",
                boxSizing: "border-box",

                transform: "rotate(7deg)",

                boxShadow:
                  "0 3px 8px rgba(0, 0, 0, 0.13)",

                zIndex: 2,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`fan-right-${currentPhoto}`}
                  src={
                    sliderPhotos[
                      (currentPhoto + 3) %
                        sliderPhotos.length
                    ]
                  }
                  alt={`Gallery ${
                    ((currentPhoto + 3) %
                      sliderPhotos.length) + 1
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "215px",
                    objectFit: "contain",
                    objectPosition: "center",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </AnimatePresence>
            </motion.div>

            {}

            <motion.div
              style={{
                position: "absolute",
                top: "18px",
                right: "8px",

                width: "62%",
                height: "255px",

                background: "#ffffff",
                border: "1.5px solid #222",

                padding: "7px 7px 16px",
                boxSizing: "border-box",

                transform: "rotate(13deg)",

                boxShadow:
                  "0 3px 8px rgba(0, 0, 0, 0.12)",

                zIndex: 1,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`fan-right-back-${currentPhoto}`}
                  src={
                    sliderPhotos[
                      (currentPhoto + 4) %
                        sliderPhotos.length
                    ]
                  }
                  alt={`Gallery ${
                    ((currentPhoto + 4) %
                      sliderPhotos.length) + 1
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "215px",
                    objectFit: "contain",
                    objectPosition: "center",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </AnimatePresence>
            </motion.div>

            {}

            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",

                width: "62%",
                height: "255px",

                background: "#ffffff",
                border: "1.5px solid #222",

                padding: "7px 7px 16px",
                boxSizing: "border-box",

                transform:
                  "translateX(-50%) rotate(-3deg)",

                transformOrigin:
                  "center center",

                boxShadow:
                  "0 5px 12px rgba(0, 0, 0, 0.2)",

                zIndex: 5,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`fan-center-${currentPhoto}`}
                  src={sliderPhotos[currentPhoto]}
                  alt={`Gallery ${
                    currentPhoto + 1
                  }`}
                  initial={{
                    opacity: 0,
                    scale: 1.02,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "215px",
                    objectFit: "contain",
                    objectPosition: "center",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {}

      <div
        id="rsvp"
        className="scroll-reveal-section"
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: "transparent",
        }}
      >
        <RSVP />
      </div>

      {}

      <div
        id="gift"
        className="scroll-reveal-section"
        style={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          boxSizing: "border-box",

          paddingTop: "200px",
          paddingBottom: "65px",

          textAlign: "center",

          background: "transparent",
        }}
      >
        {}

        <div
          style={{
            color: "#f2c45c",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize: "30px",

            fontWeight: 700,

            lineHeight: 1,

            textAlign: "center",

            margin: 0,

            textShadow:
              "0 3px 4px rgba(80, 30, 20, 0.45)",
          }}
        >
          Wedding Gift
        </div>

        {}

        <div
          style={{
            width: "78%",

            marginTop: "18px",

            color: "#000000ff",

            fontFamily: "Arial, sans-serif",

            fontSize: "12px",

            lineHeight: 1.5,

            textAlign: "center",

            opacity: 0.95,
          }}
        >
          Doa restu Bapak/Ibu/Saudara/i adalah hadiah
          terindah bagi kami. Tanpa mengurangi rasa
          hormat, tanda kasih juga dapat diberikan
          melalui rekening berikut.
        </div>

        {}

        <div
          style={{
            width: "80%",

            marginTop: "2px",

            padding: "18px 15px",

            boxSizing: "border-box",

            background: "#ffffff",

            borderRadius: "18px",

            border:
              "1px solid rgba(176, 0, 58, 0.15)",

            boxShadow:
              "0 8px 24px rgba(0, 0, 0, 0.12)",

            display: "flex",
            flexDirection: "column",

            alignItems: "stretch",

            gap: "22px",
          }}
        >
          {}

          <div
            style={{
              width: "100%",

              display: "flex",
              alignItems: "center",

              gap: "14px",

              boxSizing: "border-box",
            }}
          >
            {}

            <div
              style={{
                width: "52%",

                flexShrink: 0,

                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={briLogo}
                alt="BRI Wahyuni"
                style={{
                  display: "block",

                  width: "100%",
                  height: "auto",

                  objectFit: "contain",

                  margin: 0,
                  padding: 0,
                }}
              />
            </div>

            {}

            <div
              style={{
                flex: 1,

                minWidth: 0,

                display: "flex",
                flexDirection: "column",

                alignItems: "flex-start",

                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "#8b1232",

                  fontFamily:
                    "Arial, sans-serif",

                  fontSize: "9px",

                  fontWeight: 600,

                  marginBottom: "3px",
                }}
              >
                No. Rekening
              </div>

              <div
                style={{
                  color: "#111111",

                  fontFamily:
                    "Arial, sans-serif",

                  fontSize: "10px",

                  fontWeight: 700,

                  lineHeight: 1.2,

                  wordBreak: "break-all",

                  marginBottom: "10px",
                }}
              >
                382201020167536
              </div>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      "382201020167536"
                    );

                    setCopiedAccount(
                      "382201020167536"
                    );

                    setTimeout(() => {
                      setCopiedAccount("");
                    }, 1800);
                  } catch (error) {
                    console.error(
                      "Gagal menyalin rekening:",
                      error
                    );
                  }
                }}
                style={{
                  width: "100%",

                  minHeight: "32px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  gap: "5px",

                  padding: "6px 5px",

                  boxSizing: "border-box",

                  border:
                    "1px solid rgba(176, 0, 58, 0.55)",

                  borderRadius: "8px",

                  background: "transparent",

                  color: "#8b1232",

                  fontFamily:
                    "Arial, sans-serif",

                  fontSize: "8px",

                  fontWeight: 600,

                  cursor: "pointer",
                }}
              >
                <FaCopy
                  style={{
                    fontSize: "10px",
                  }}
                />

                {copiedAccount ===
                "382201020167536"
                  ? "Tersalin"
                  : "Salin Rekening"}
              </button>
            </div>
          </div>

          {}

          <div
            style={{
              width: "100%",
              height: "1px",
              background:
                "rgba(176, 0, 58, 0.12)",
            }}
          />

          {}

          <div
            style={{
              width: "100%",

              display: "flex",
              alignItems: "center",

              gap: "14px",

              boxSizing: "border-box",
            }}
          >
            {}

            <div
              style={{
                width: "52%",

                flexShrink: 0,

                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={briArdian}
                alt="BRI Ardian Syaputra"
                style={{
                  display: "block",

                  width: "100%",
                  height: "auto",

                  objectFit: "contain",

                  margin: 0,
                  padding: 0,
                }}
              />
            </div>

            {}

            <div
              style={{
                flex: 1,

                minWidth: 0,

                display: "flex",
                flexDirection: "column",

                alignItems: "flex-start",

                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "#8b1232",

                  fontFamily:
                    "Arial, sans-serif",

                  fontSize: "9px",

                  fontWeight: 600,

                  marginBottom: "3px",
                }}
              >
                No. Rekening
              </div>

              <div
                style={{
                  color: "#111111",

                  fontFamily:
                    "Arial, sans-serif",

                  fontSize: "10px",

                  fontWeight: 700,

                  lineHeight: 1.2,

                  wordBreak: "break-all",

                  marginBottom: "10px",
                }}
              >
                381701020943531
              </div>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      "381701020943531"
                    );

                    setCopiedAccount(
                      "381701020943531"
                    );

                    setTimeout(() => {
                      setCopiedAccount("");
                    }, 1800);
                  } catch (error) {
                    console.error(
                      "Gagal menyalin rekening:",
                      error
                    );
                  }
                }}
                style={{
                  width: "100%",

                  minHeight: "32px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  gap: "5px",

                  padding: "6px 5px",

                  boxSizing: "border-box",

                  border:
                    "1px solid rgba(176, 0, 58, 0.55)",

                  borderRadius: "8px",

                  background: "transparent",

                  color: "#8b1232",

                  fontFamily:
                    "Arial, sans-serif",

                  fontSize: "8px",

                  fontWeight: 600,

                  cursor: "pointer",
                }}
              >
                <FaCopy
                  style={{
                    fontSize: "10px",
                  }}
                />

                {copiedAccount ===
                "381701020943531"
                  ? "Tersalin"
                  : "Salin Rekening"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {}

      <div
        className="scroll-reveal-section"
        style={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxSizing: "border-box",

          marginTop: "-50px",

          textAlign: "center",
        }}
      >
        {}

        <div
          style={{
            width: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            color: "#f2c45c",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize: "24px",

            fontWeight: 700,

            lineHeight: 1.2,

            margin: 0,

            textAlign: "center",

            textShadow:
              "0 1px 2px rgba(80, 30, 20, 0.15)",
          }}
        >
          ✦ Terima Kasih ✦
        </div>

        {}

        <div
          style={{
            width: "85%",

            marginTop: "10px",

            color: "#000000",

            fontFamily: "Arial, sans-serif",

            fontSize: "11px",

            fontWeight: 400,

            lineHeight: 1.5,

            textAlign: "center",
          }}
        >
          Diharapkan kehadiran dan doa restu
          Bapak/Ibu/Saudara/i pada acara
          pernikahan kami.
        </div>
      </div>

      <div style={{ height: "95px" }} />

      <BottomNav />
    </section>
  );
}

function BottomNav() {
  const items = [
    {
      href: "#home",
      icon: <FaHouseChimney />,
      label: "Home",
    },
    {
      href: "#mempelai",
      icon: <FaUserGroup />,
      label: "Mempelai",
    },
    {
      href: "#galeri",
      icon: <FaImages />,
      label: "Galeri",
    },
    {
      href: "#acara",
      icon: <FaLocationDot />,
      label: "Lokasi",
    },
    {
      href: "#rsvp",
      icon: <FaPaperPlane />,
      label: "RSVP",
    },
    {
      href: "#gift",
      icon: <FaGift />,
      label: "Gift",
    },
  ];

  const handleNavigation = (href) => {
    const target = document.querySelector(href);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      style={{
        position: "fixed",
        zIndex: 1000,
        left: "50%",
        bottom: "10px",
        width: "calc(100% - 18px)",
        maxWidth: "370px",
        transform: "translateX(-50%)",

        padding: "6px",

        boxSizing: "border-box",

        border:
          "1px solid rgba(176, 0, 58, 0.30)",

        background:
          "linear-gradient(135deg, rgba(255,255,255,0.58), rgba(255,248,250,0.48))",

        backdropFilter:
          "blur(12px) saturate(125%)",
        WebkitBackdropFilter:
          "blur(12px) saturate(125%)",

        boxShadow:
          "0 10px 28px rgba(0,0,0,0.14), 0 2px 8px rgba(176,0,58,0.08), inset 0 1px 0 rgba(255,255,255,0.70)",

        borderRadius: "17px",

        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(6, 1fr)",
          gap: "2px",
        }}
      >
        {items.map((item) => (
          <button
            key={item.href}
            type="button"
            onClick={() =>
              handleNavigation(item.href)
            }
            style={{
              display: "flex",
              minWidth: 0,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              gap: "4px",

              minHeight: "60px",
              padding: "6px 2px",

              border: "none",
              borderRadius: "13px",

              background: "transparent",

              color: "#b0003a",

              cursor: "pointer",

              fontFamily:
                "Inter, Arial, sans-serif",

              transition:
                "background 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(176, 0, 58, 0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "transparent";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform =
                "scale(0.95)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform =
                "scale(1)";
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                width: "29px",
                height: "29px",

                color: "#b0003a",

                fontSize: "18px",
                lineHeight: 1,

                filter:
                  "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
              }}
            >
              {item.icon}
            </span>

            <span
              style={{
                color: "#b0003a",

                fontFamily:
                  "Inter, Arial, sans-serif",

                fontSize: "9px",
                fontWeight: 600,

                lineHeight: 1,

                whiteSpace: "nowrap",

                textShadow:
                  "0 1px 2px rgba(255,255,255,0.8)",
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}