import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPaperPlane, FaXmark } from "react-icons/fa6";

const STORAGE_KEY = "wedding-messages";

const rsvpScrollStyle = `
  @keyframes rsvpCommentLoop {
    from { transform: translateY(0); }
    to { transform: translateY(calc(-50% - 5px)); }
  }

  .rsvp-comment-card {
    height: 270px;
    overflow: hidden;
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }

  .rsvp-comment-track {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    animation-name: rsvpCommentLoop;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .rsvp-comment-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
    width: 100%;
  }
`;

export default function RSVP() {
  const [form, setForm] = useState({
    name: "",
    presence: "",
    message: "",
  });

  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch {
      setMessages([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;
    if (!form.presence) return;
    if (!form.message.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: form.name.trim(),
      presence: form.presence,
      message: form.message.trim(),
      time: new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [newMessage, ...messages];

    setMessages(updatedMessages);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedMessages)
    );
    setForm({
      name: "",
      presence: "",
      message: "",
    });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 2500);
  };

  const handleDelete = (id) => {
    const updatedMessages = messages.filter(
      (message) => message.id !== id
    );

    setMessages(updatedMessages);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedMessages)
    );
  };

  return (
    <>
      <style>{rsvpScrollStyle}</style>

      <section
      id="rsvp"
      style={{
        width: "100%",
        maxWidth: "390px",
        margin: "0 auto",
        padding: "120px 28px 80px",
        boxSizing: "border-box",
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      {}

      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          letterSpacing: "0.3em",
          marginBottom: "9px",
        }}
      >
        RSVP
      </div>

      <h2
        style={{
          margin: 0,
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "31px",
          fontWeight: 700,
          lineHeight: 1.05,
        }}
      >
        Konfirmasi Kehadiran
      </h2>

      <p
        style={{
          margin: "15px auto 28px",
          maxWidth: "300px",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        Mohon konfirmasi kehadiran Anda dan tinggalkan
        ucapan untuk kedua mempelai.
      </p>

      {}

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "13px",
          textAlign: "left",
        }}
      >
        {}

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
          required
          style={inputStyle}
        />

        {}

        <select
          name="presence"
          value={form.presence}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="" disabled>
            Kehadiran
          </option>

          <option value="InsyaAllah hadir">
            InsyaAllah hadir
          </option>

          <option value="Mohon maaf belum bisa hadir">
            Mohon maaf belum bisa hadir
          </option>
        </select>

        {}

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Ucapan dan doa"
          rows={4}
          required
          style={{
            ...inputStyle,
            resize: "none",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        />

        {}

        <button
          type="submit"
          style={{
            width: "100%",
            height: "44px",

            border: "1px solid #ffffff",
            borderRadius: "4px",

            background: "#b0003a",
            color: "#ffffff",

            fontFamily: "Arial, sans-serif",
            fontSize: "12px",
            fontWeight: 600,

            letterSpacing: "0.12em",
            textTransform: "uppercase",

            cursor: "pointer",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "9px",
          }}
        >
          <FaPaperPlane aria-hidden="true" />

          {submitted ? "Terkirim!" : "Kirim Ucapan"}
        </button>
      </form>

      {}

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            style={{
              marginTop: "15px",

              fontFamily: "Arial, sans-serif",
              fontSize: "11px",

              color: "#ffffff",
            }}
          >
            Terima kasih, konfirmasi Anda telah tersimpan.
          </motion.div>
        )}
      </AnimatePresence>

      {}

      {messages.length > 0 && (
        <div
          style={{
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          {}

          <div
            style={{
              textAlign: "center",

              fontFamily:
                '"Heligthon Signature", cursive',

              fontSize: "20px",

              marginBottom: "20px",
            }}
          >
            Ucapan &amp; Doa
          </div>

          {}

          <div
            style={{
              textAlign: "center",

              fontFamily: "Arial, sans-serif",
              fontSize: "10px",

              opacity: 0.7,

              marginTop: "-10px",
              marginBottom: "18px",
            }}
          >
            {messages.length} ucapan
          </div>

          {}

          {messages.length >= 2 ? (
            <div className="rsvp-comment-card">
              <div
                className="rsvp-comment-track"
                style={{
                  animationDuration: `${Math.max(
                    14,
                    messages.length * 7
                  )}s`,
                }}
              >
                <div className="rsvp-comment-group">
                  {messages.map((item) => (
                    <CommentCard
                      key={`original-${item.id}`}
                      item={item}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>

                <div
                  className="rsvp-comment-group"
                  aria-hidden="true"
                  style={{ pointerEvents: "none" }}
                >
                  {messages.map((item) => (
                    <CommentCard
                      key={`duplicate-${item.id}`}
                      item={item}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {messages.map((item) => (
                <CommentCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          </div>
        )}
      </section>
    </>
  );
}

function CommentCard({ item, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: "relative",
        padding: "11px",
        borderRadius: "6px",
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxSizing: "border-box",
        width: "100%",
        flexShrink: 0,
      }}
    >
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        aria-label="Hapus ucapan"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "23px",
          height: "23px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.10)",
          color: "rgba(255,255,255,0.75)",
          cursor: "pointer",
          fontSize: "11px",
        }}
      >
        <FaXmark />
      </button>

      <div
        style={{
          paddingRight: "28px",
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "15px",
          fontWeight: 600,
          lineHeight: 1.1,
        }}
      >
        {item.name}
      </div>

      <div
        style={{
          marginTop: "3px",
          fontFamily: "Arial, sans-serif",
          fontSize: "8px",
          opacity: 0.75,
        }}
      >
        {item.presence === "InsyaAllah hadir" ? "Hadir" : "Tidak Hadir"}
      </div>

      {item.message && (
        <div
          style={{
            marginTop: "8px",
            fontFamily: "Arial, sans-serif",
            fontSize: "10px",
            lineHeight: 1.45,
            paddingRight: "4px",
          }}
        >
          {item.message}
        </div>
      )}

      {item.time && (
        <div
          style={{
            marginTop: "7px",
            fontFamily: "Arial, sans-serif",
            fontSize: "8px",
            opacity: 0.55,
          }}
        >
          {item.time}
        </div>
      )}
    </motion.div>
  );
}

const inputStyle = {
  width: "100%",

  minHeight: "43px",

  padding: "0 13px",

  boxSizing: "border-box",

  border:
    "1px solid rgba(255,255,255,0.35)",

  borderRadius: "4px",

  outline: "none",

  background: "rgba(255,255,255,0.95)",

  color: "#222",

  fontFamily: "Arial, sans-serif",

  fontSize: "12px",
};