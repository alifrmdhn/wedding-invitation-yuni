import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa6";

const coverPhoto = new URL(
  "../assets/foto sampul.png",
  import.meta.url
).href;

const heroBackground = new URL(
  "../assets/bg merah.png",
  import.meta.url
).href;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

export default function Opening({ onOpen }) {
  const [guest] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    const to = params.get("to") || params.get("kpd");

    if (to) {
      return decodeURIComponent(
        to.replace(/\+/g, " ")
      );
    }

    return "Tamu Undangan";
  });

  const handleOpenInvitation = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    onOpen();
  };

  return (
    <section
      className="opening-section"
      style={{
        "--opening-bg": `url("${heroBackground}")`,
      }}
    >
      <motion.div
        className="opening-background"
        initial={{
          opacity: 0,
          scale: 1.08,
        }}
        animate={{
          opacity: 1,
          scale: 1.02,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />

      <div className="opening-inner">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="opening-content"
        >
          <motion.p
            variants={itemVariants}
            className="opening-kicker"
          >
            the wedding of
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="opening-title"
          >
            Yuni &amp; Ardian
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="opening-gold-divider"
          />

          <motion.p
            variants={itemVariants}
            className="opening-description"
          >
            Tanpa mengurangi rasa hormat, kami mengundang
            <br />
            Bapak/Ibu/Saudara/i untuk hadir di acara kami.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="opening-polaroid"
          >
            <div className="opening-polaroid-photo">
              <img
                src={coverPhoto}
                alt="Yuni dan Ardian"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="opening-polaroid-caption">
              <p>
                Wahyuni, A.Md.Kep.
              </p>

              <span>
                DENGAN
              </span>

              <p>
                Briptu Ardian Syaputra, S.H.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="opening-guest-card"
          >
            <p className="opening-guest-label">
              Kepada Yth.
            </p>

            <h3 className="opening-guest-name">
              {guest}
            </h3>

            <motion.button
              type="button"
              onClick={handleOpenInvitation}
              className="opening-button"
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.15,
              }}
            >
              <FaEnvelopeOpenText
                aria-hidden="true"
              />

              <span>
                Buka Undangan
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}