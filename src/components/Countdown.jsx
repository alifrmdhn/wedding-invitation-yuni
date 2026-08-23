import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaCalendarCheck, FaLocationDot } from "react-icons/fa6";

const MAPS_URL =
  "https://www.google.com/maps?sca_esv=9b617dd2a71044a6&output=search&q=pulau+barrang+lompo&source=lnms&fbs=ABfTbFVDUeJME-Vlz95WZrGMhUZXolOoaevxLwnIgSd5IpFuORNZlTwNJBL1tc3FyLzxCkLFERHIEy8FYiZUlSPJwyu6Lg8xtC9gbHba2cVv06_UBS6PEj6vl0ORInww4-Kcq7CVTl4WLbzF9Dl0-sFYac0Ryn6dDT3gxNjbnWK5PnVPcoAN6HH5ujYGZjblO-T_qyQKtylTrNo_VjhZPBH5xgWA6DQMA&entry=mc&ved=1t:200715&ictx=111";

export default function Countdown() {
  const weddingDate = useMemo(
    () => new Date("2026-09-05T10:00:00+08:00"),
    []
  );

  const [time, setTime] = useState(() =>
    calculateTime(weddingDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime(weddingDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  // =====================================================
  // SAVE TO CALENDAR
  // =====================================================

  const handleSaveCalendar = () => {
    const start = new Date(
      "2026-09-05T10:00:00+08:00"
    );

    const end = new Date(
      "2026-09-05T22:00:00+08:00"
    );

    const formatICSDate = (date) =>
      date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wahyuni & Ardian//Wedding Invitation//ID",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",

      "BEGIN:VEVENT",

      "UID:wedding-wahyuni-ardian-20260905@invitation",

      `DTSTAMP:${formatICSDate(new Date())}`,

      `DTSTART:${formatICSDate(start)}`,

      `DTEND:${formatICSDate(end)}`,

      "SUMMARY:Pernikahan Wahyuni & Ardian",

      "DESCRIPTION:Akad 10.00 WITA - Selesai\\nResepsi 20.00 WITA - Selesai",

      "LOCATION:Pulau Barrang Lompo, Makassar, Sulawesi Selatan",

      "END:VEVENT",

      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      "Pernikahan-Wahyuni-Ardian.ics";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        width: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        boxSizing: "border-box",

        padding: "0 15px",
      }}
    >

      {/* =================================================
          BUKA MAPS
          POSISI DI ATAS COUNTDOWN
          ================================================= */}

      <button
        type="button"
        onClick={() =>
          window.open(
            MAPS_URL,
            "_blank",
            "noopener,noreferrer"
          )
        }
        style={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",

          gap: "6px",

          minHeight: "30px",

          padding: "6px 13px",

          marginTop: "2px",

          marginBottom: "14px",

          border: "1px solid #b0003a",

          borderRadius: "7px",

          background: "#b0003a",

          color: "#ffffff",

          fontFamily: "Arial, sans-serif",

          fontSize: "8px",

          fontWeight: 700,

          lineHeight: 1,

          cursor: "pointer",

          boxShadow:
            "0 2px 6px rgba(0, 0, 0, 0.12)",
        }}
      >
        <FaLocationDot
          style={{
            fontSize: "10px",
          }}
        />

        Buka Maps
      </button>


      {/* =================================================
          ROW COUNTDOWN + SAVE CALENDAR
          ================================================= */}

      <div
        style={{
          width: "100%",

          maxWidth: "340px",

          display: "flex",

          flexDirection: "row",

          alignItems: "stretch",

          justifyContent: "center",

          gap: "8px",

          boxSizing: "border-box",
        }}
      >

        {/* =================================================
            COUNTDOWN
            ================================================= */}

        <div
          style={{
            flex: 1,

            minWidth: 0,

            display: "grid",

            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",

            gap: "6px",

            boxSizing: "border-box",
          }}
        >

          <CountdownCard
            value={time.days}
            label="HARI"
          />

          <CountdownCard
            value={time.hours}
            label="JAM"
          />

          <CountdownCard
            value={time.minutes}
            label="MENIT"
          />

          <CountdownCard
            value={time.seconds}
            label="DETIK"
          />

        </div>


        {/* =================================================
            SAVE TO CALENDAR
            BENAR-BENAR DI SEBELAH KANAN
            ================================================= */}

        <button
          type="button"
          onClick={handleSaveCalendar}
          style={{
            flexShrink: 0,

            width: "68px",

            minHeight: "68px",

            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            justifyContent: "center",

            gap: "5px",

            padding: "5px",

            boxSizing: "border-box",

            border:
              "1px solid #b0003a",

            borderRadius: "7px",

            background: "#ffffff",

            color: "#b0003a",

            fontFamily:
              "Arial, sans-serif",

            fontSize: "7px",

            fontWeight: 700,

            lineHeight: 1.2,

            textAlign: "center",

            cursor: "pointer",

            boxShadow:
              "0 2px 6px rgba(0, 0, 0, 0.10)",
          }}
        >

          <FaCalendarCheck
            style={{
              fontSize: "16px",
            }}
          />

          <span>
            Save to
            <br />
            Calendar
          </span>

        </button>

      </div>

    </div>
  );
}


// =====================================================
// CALCULATE COUNTDOWN
// =====================================================

function calculateTime(eventDate) {
  const difference =
    eventDate - new Date();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference /
        (1000 * 60 * 60)) %
        24
    ),

    minutes: Math.floor(
      (difference /
        (1000 * 60)) %
        60
    ),

    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}


// =====================================================
// COUNTDOWN CARD
// =====================================================

function CountdownCard({
  value,
  label,
}) {
  const formattedValue =
    String(value).padStart(2, "0");

  return (
    <div
      style={{
        width: "100%",

        aspectRatio: "0.78",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        boxSizing: "border-box",

        background: "#b0003a",

        borderRadius: "6px",

        overflow: "hidden",

        perspective: "500px",

        boxShadow:
          "0 3px 7px rgba(0, 0, 0, 0.15)",
      }}
    >

      {/* ANGKA */}

      <div
        style={{
          position: "relative",

          width: "100%",

          height: "31px",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          perspective: "500px",
        }}
      >

        <AnimatePresence mode="popLayout">

          <motion.div
            key={formattedValue}

            initial={{
              rotateX: -90,

              opacity: 0,

              transformOrigin:
                "top center",
            }}

            animate={{
              rotateX: 0,

              opacity: 1,

              transformOrigin:
                "top center",
            }}

            exit={{
              rotateX: 90,

              opacity: 0,

              transformOrigin:
                "bottom center",
            }}

            transition={{
              duration: 0.38,

              ease: [
                0.22,
                0.61,
                0.36,
                1,
              ],
            }}

            style={{
              position: "absolute",

              width: "100%",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              backfaceVisibility:
                "hidden",

              color: "#ffffff",

              fontFamily:
                "Arial, sans-serif",

              fontSize: "25px",

              fontWeight: 400,

              lineHeight: 1,
            }}
          >
            {formattedValue}
          </motion.div>

        </AnimatePresence>

      </div>


      {/* LABEL */}

      <div
        style={{
          marginTop: "3px",

          color: "#ffffff",

          fontFamily:
            "Arial, sans-serif",

          fontSize: "7px",

          fontWeight: 700,

          lineHeight: 1,

          textTransform:
            "uppercase",
        }}
      >
        {label}
      </div>

    </div>
  );
}