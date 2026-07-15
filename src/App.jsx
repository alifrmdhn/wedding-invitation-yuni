import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";


import Opening from "./components/Opening";
import Hero from "./components/Hero";
import FlowerPetals from "./components/FlowerPetals";

const weddingMusic = new URL("./assets/music/wedding.mp3", import.meta.url).href;

function App() {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const audioRef = useRef(null);

  const openInvitation = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(weddingMusic);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.65;
      audioRef.current.muted = muted;
    }

    audioRef.current.play().catch(() => {
      // Browser can still block audio in rare cases; opening the invitation should continue.
    });

    setShowPetals(true);
    setOpened(true);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    const nextMuted = !audioRef.current.muted;
    audioRef.current.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <>
      <FlowerPetals active={showPetals} />
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="opening"
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <Opening onOpen={openInvitation} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={muted ? "Nyalakan musik" : "Matikan musik"}
          className="fixed bottom-24 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-[#b68a46]/30 bg-[#211618]/88 text-xl text-[#efe4d3] shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur transition hover:bg-[#5d1721]"
        >
          {muted ? <FaVolumeXmark aria-hidden="true" /> : <FaVolumeHigh aria-hidden="true" />}
        </button>
      )}
    </>
  );
}

export default App;
