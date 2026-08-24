import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";

import Opening from "./components/Opening";
import Hero from "./components/Hero";
import GuestManager from "./components/GuestManager";

const weddingMusic = new URL(
  "./assets/music/wedding.mp3",
  import.meta.url
).href;

const redBackground = new URL(
  "./assets/bg merah.png",
  import.meta.url
).href;

function App() {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);

  // =====================================================
  // HALAMAN ADMIN TAMU
  // =====================================================

  if (
    window.location.pathname ===
    "/admin-tamu"
  ) {
    return <GuestManager />;
  }

  // =====================================================
  // BUKA UNDANGAN
  // =====================================================

  const openInvitation = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(weddingMusic);

      audioRef.current.preload = "auto";
      audioRef.current.loop = true;
      audioRef.current.volume = 0.65;
      audioRef.current.muted = muted;
      audioRef.current.currentTime = 26;
    }

    audioRef.current.play().catch(() => {});

    setOpened(true);
  };

  // =====================================================
  // TOGGLE MUSIK
  // =====================================================

  const toggleMusic = () => {
    if (!audioRef.current) return;

    const nextMuted =
      !audioRef.current.muted;

    audioRef.current.muted =
      nextMuted;

    setMuted(nextMuted);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "transparent",
        backgroundImage: `url(${redBackground})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="opening"
            exit={{
              opacity: 0,
              y: -18,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
          >
            <Opening
              onOpen={openInvitation}
            />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={
            muted
              ? "Nyalakan musik"
              : "Matikan musik"
          }
          style={{
            position: "fixed",
            right:
              "max(9px, calc(50% - 185px))",
            bottom: "95px",
            zIndex: 1100,
            width: "42px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            border:
              "1px solid rgba(176, 0, 58, 0.35)",
            borderRadius: "50%",
            background: "transparent",
            color: "#0e0d0dff",
            fontSize: "17px",
            cursor: "pointer",
            boxSizing: "border-box",
            backdropFilter: "none",
            WebkitBackdropFilter:
              "none",
            boxShadow:
              "0 5px 16px rgba(0,0,0,0.16), 0 2px 6px rgba(176,0,58,0.10)",
            transition:
              "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform =
              "scale(0.92)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform =
              "scale(1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "scale(1)";
          }}
        >
          {muted ? (
            <FaVolumeXmark
              aria-hidden="true"
            />
          ) : (
            <FaVolumeHigh
              aria-hidden="true"
            />
          )}
        </button>
      )}
    </div>
  );
}

export default App;