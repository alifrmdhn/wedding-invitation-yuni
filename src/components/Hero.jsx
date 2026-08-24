import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const heroPhoto = new URL(
  "../assets/foto 1.png",
  import.meta.url
).href;

const white2Background = new URL(
  "../assets/putih 2.png",
  import.meta.url
).href;

const white1Background = new URL(
  "../assets/putih 1.png",
  import.meta.url
).href;

const red1Background = new URL(
  "../assets/merah 1.png",
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
  "../assets/foto frame 2.jpeg",
  import.meta.url
).href;

const framePhoto3 = new URL(
  "../assets/foto frame 3.png",
  import.meta.url
).href;

const RED_INTRO_PADDING_TOP = "175px"; 
const RED_INTRO_CONTENT_OFFSET_Y = "0px";
const YEAR_SECTION_PADDING_TOP = "65px"; 
const WEDDING_GIFT_PADDING_TOP = "70px";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const photoVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.6,
      ease: "easeOut",
    },
  },
};

const sectionMotion = {
  variants: sectionVariants,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.08 },
};

const fadeInMotion = {
  variants: fadeInVariants,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.12 },
};

const photoMotion = {
  variants: photoVariants,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.15 },
};
 

const gallery1Photos = [
  new URL("../assets/gal1.jpeg", import.meta.url).href,
  new URL("../assets/gal2.jpeg", import.meta.url).href,
  new URL("../assets/gal3.jpeg", import.meta.url).href,
  new URL("../assets/gal4.jpeg", import.meta.url).href,
];

const gallery2Photos = [
  new URL("../assets/gal5.jpeg", import.meta.url).href,
  new URL("../assets/gal6.jpeg", import.meta.url).href,
  new URL("../assets/gal7.jpeg", import.meta.url).href,
  new URL("../assets/gal8.jpeg", import.meta.url).href,
];

const gallery3Photos = [
  new URL("../assets/gal9.jpeg", import.meta.url).href,
  new URL("../assets/gal10.jpeg", import.meta.url).href,
  new URL("../assets/gal11.jpeg", import.meta.url).href,
  new URL("../assets/gal12.jpeg", import.meta.url).href,
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
  const [copiedAccount, setCopiedAccount] = useState("");

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

        boxSizing: "border-box",
      }}
    >

      <motion.div
        id="home"
        className="scroll-reveal-section"
        {...sectionMotion}
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          paddingTop: "25px",
          paddingBottom: "25px",

          boxSizing: "border-box",
          overflow: "visible",
          zIndex: 9,
        }}
      >

        <motion.img
              {...photoMotion}
          src={white2Background}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            display: "block",
            margin: 0,
            padding: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            color: "#b0003a",
            fontFamily: '"Heligthon Signature", cursive',
            fontSize: "42px",
            lineHeight: 0.9,
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          The Wedding Of
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "90%",
            background: "#fff",
            border: "1.5px solid #333",
            padding: "5px",
            boxSizing: "border-box",

            transform: "scale(1.25)",
            transformOrigin: "top center",

            marginTop: "-10px",
            marginBottom: "-95px",
          }}
        >
          <motion.img
              {...photoMotion}
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
                fontSize: "15px",
                lineHeight: 1,
              }}
            >
              Wahyuni, A.Md.Kep.
            </p>

            <span
              style={{
                display: "block",
                margin: "3px 0",
                fontFamily: '"Heligthon Signature", cursive',
                fontSize: "10px",
                letterSpacing: "0.4em",
              }}
            >
              Dengan
            </span>

            <p
              style={{
                margin: 0,
                fontFamily:
                  '"Heligthon Signature", cursive',
                fontSize: "15px",
                lineHeight: 1,
              }}
            >
              Briptu Ardian Syaputra, S.H.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="scroll-reveal-section"
        {...sectionMotion}
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxSizing: "border-box",

          paddingTop: RED_INTRO_PADDING_TOP,
          paddingBottom: "80px",

          overflow: "visible",
          zIndex: 8,
        }}
      >
        <motion.img
              {...photoMotion}
          src={red1Background}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",

            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",

            display: "block",
            margin: 0,
            padding: 0,

            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            transform: `translateY(${RED_INTRO_CONTENT_OFFSET_Y})`,
          }}
        >

        <motion.img
              {...photoMotion}
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
        <div
          style={{
            position: "relative",

            width: "100%",

            margin: 0,
            padding: 0,

            transform: "translateY(-20px)",

            boxSizing: "border-box",

            overflow: "hidden",
          }}
        >
          <motion.img
              {...photoMotion}
            src={element1}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",

              top: "-3%",
              right: "-29%",

              width: "58%",
              height: "auto",

              margin: 0,
              padding: 18,

              pointerEvents: "none",

              zIndex: 1,
            }}
          />
          <motion.img
              {...photoMotion}
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
        <div
          style={{
            width: "88%",

            boxSizing: "border-box",

            marginTop: "-100px",

            padding: "18px 16px 20px",

            background: "transparent",

            border: "none",

            borderRadius: 0,

            backdropFilter: "none",
            WebkitBackdropFilter: "none",

            boxShadow: "none",

            color: "#ffffff",

            textAlign: "center",
          }}
        >
          <p
            dir="rtl"
            style={{
              margin: 0,

              fontFamily: "serif",

              fontSize: "17px",

              fontWeight: 600,

              lineHeight: 1.7,

              textAlign: "center",

              color: "#ffffff",

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
          <div
            style={{
              width: "55%",
              height: "1px",
              margin: "14px auto",
              background:
                "rgba(255, 255, 255, 0.40)",
            }}
          />
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
        <motion.img
              {...photoMotion}
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
      </motion.div>
      <motion.div
        id="acara"
        className="scroll-reveal-section"
        {...sectionMotion}
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxSizing: "border-box",

          paddingTop: YEAR_SECTION_PADDING_TOP,
          paddingBottom: "60px",
          marginTop: "-40px",

          background: "transparent",
          overflow: "visible",
          zIndex: 7,
        }}
      >
        <motion.img
              {...photoMotion}
          src={white2Background}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40px",
            left: 0,

            width: "100%",
            height: "calc(100% + 40px)",
            objectFit: "fill",

            display: "block",
            margin: 0,
            padding: 0,

            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <motion.img
              {...photoMotion}
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
        <motion.img
              {...photoMotion}
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
          <motion.img
              {...photoMotion}
            src={redLine}
            alt=""
            style={{
              display: "block",
              width: "45%",
              height: "auto",
              margin: "0 auto 12px",
            }}
          />
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
          <motion.img
              {...photoMotion}
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
          <Countdown />
        </div>
      </motion.div>
      <motion.div
        id="mempelai"
        className="scroll-reveal-section"
        {...sectionMotion}
        style={{
          position: "relative",
          zIndex: 6,
          backgroundImage: `url(${red1Background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "visible",

          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxSizing: "border-box",
          marginTop: "-40px",
          paddingTop: "50px",
          paddingBottom: "70px",

          textAlign: "center",

          color: "#ffffff",
        }}
      >
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
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "58%",

              padding: "8px 8px 17px",

              boxSizing: "border-box",
    background: "#ffffff",

              boxShadow:
                "0 3px 8px rgba(0, 0, 0, 0.18)",
            }}
          >
            <motion.img
              {...photoMotion}
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
        <div
          style={{
            height: "30px",
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "58%",

              padding: "8px 8px 17px",

              boxSizing: "border-box",
    background: "#ffffff",

              boxShadow:
                "0 3px 8px rgba(0, 0, 0, 0.18)",
            }}
          >
            <motion.img
              {...photoMotion}
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
      </motion.div>
      <GallerySection
        id="galeri"
        zIndex={5}
        background={white2Background}
        light
        photos={gallery1Photos}
      />

      <GallerySection
        id="galeri2"
        zIndex={4}
        background={red1Background}
        photos={gallery2Photos}
      />

      <GallerySection
        id="galeri3"
        zIndex={3}
        background={white2Background}
        light
        photos={gallery3Photos}
      />
      <motion.div
        id="rsvp"
        className="scroll-reveal-section"
        {...sectionMotion}
        style={{
          position: "relative",
          zIndex: 2,
          backgroundImage: `url(${red1Background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "visible",

          width: "100%",
          boxSizing: "border-box",
          marginTop: "-100px",
        }}
      >
        <RSVP />
      </motion.div>
      <motion.div
        id="gift"
        className="scroll-reveal-section"
        {...sectionMotion}
        style={{
          position: "relative",
          zIndex: 1,
          backgroundImage: `url(${white1Background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "visible",

          width: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          boxSizing: "border-box",
          marginTop: "-40px",
          paddingTop: WEDDING_GIFT_PADDING_TOP,
          paddingBottom: "35px",

          textAlign: "center",
        }}
      >
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
        <div
          style={{
            width: "80%",

            marginTop: "2px",

            padding: "18px 15px",

            boxSizing: "border-box",

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
          <div
            style={{
              width: "100%",

              display: "flex",
              alignItems: "center",

              gap: "14px",

              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "52%",

                flexShrink: 0,

                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <motion.img
              {...photoMotion}
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
          <div
            style={{
              width: "100%",
              height: "1px",
              background:
                "rgba(176, 0, 58, 0.12)",
            }}
          />
          <div
            style={{
              width: "100%",

              display: "flex",
              alignItems: "center",

              gap: "14px",

              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "52%",

                flexShrink: 0,

                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <motion.img
              {...photoMotion}
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
        <div
          style={{
            width: "100%",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxSizing: "border-box",

            marginTop: "0px",
            paddingTop: "28px",
            paddingBottom: "35px",

            textAlign: "center",
          }}
        >
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
          <div
            style={{
              width: "85%",

              marginTop: "16px",

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

      </motion.div>

      <div style={{ height: "95px" }} />

      <BottomNav />
    </section>
  );
}

function GallerySection({
  id,
  zIndex,
  background,
  photos,
  light = false,
}) {
  return (
    <motion.div
      id={id}
      className="scroll-reveal-section"
      {...sectionMotion}
      style={{
        position: "relative",
        zIndex,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        marginTop: "-40px",
        paddingTop: "95px",
        paddingBottom: "80px",
        textAlign: "center",
        overflow: "visible",
        ...(light
          ? {
              background: "transparent",
            }
          : {
              backgroundImage: `url(${background})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }),
      }}
    >
      {light && (
        <motion.img
              {...photoMotion}
          src={background}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40px",
            left: 0,
            width: "100%",
            height: "calc(100% + 40px)",
            display: "block",
            margin: 0,
            padding: 0,
            objectFit: "fill",
            objectPosition: "center",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: light ? "#000000" : "#ffffff",
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

        <div
          style={{
            color: light ? "#000000" : "#ffffff",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "31px",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: "34px",
            textAlign: "center",
          }}
        >
          Our Moments
        </div>
        <div
          style={{
            width: "92%",
            maxWidth: "360px",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            columnGap: "18px",
            rowGap: "24px",
            boxSizing: "border-box",
            marginTop: "5px",
            padding: 0,
            background: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={`${id}-${index}`}
              style={{
                width: "100%",
                overflow: "visible",
                background: "transparent",
                border: "none",
                boxSizing: "border-box",
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.img
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.9,
                      delay: index * 0.08,
                      ease: "easeOut",
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                src={photo}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "center",
                  margin: 0,
                  padding: 0,
                  border: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
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