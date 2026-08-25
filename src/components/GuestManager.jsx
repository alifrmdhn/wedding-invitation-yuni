import { useEffect, useState } from "react";

const BASE_URL =
  "https://wedding-invitation-yuni-ardian.vercel.app/";

const GUEST_STORAGE_KEY =
  "yuni-ardian-guest-list";

const MESSAGE_STORAGE_KEY =
  "yuni-ardian-global-message";

const DEFAULT_MESSAGE = `Assalamu’alaikum Warahmatullahi Wabarakatuh.

Dengan penuh rasa syukur dan bahagia, kami bermaksud mengundang Bapak/Ibu/Saudara/i {NAMA} untuk hadir dan memberikan doa restu pada acara pernikahan kami.

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir.

Yuni & Ardian

💌 Buka Undangan:
{LINK}

Terima kasih atas perhatian dan doa restunya.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.`;

function createMessage(template, name) {
  const link =
    `${BASE_URL}?to=${encodeURIComponent(name)}`;

  return template
    .replaceAll("{NAMA}", name)
    .replaceAll("{LINK}", link);
}

export default function GuestManager() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState([]);
  const [messageTemplate, setMessageTemplate] =
    useState(DEFAULT_MESSAGE);

  const [showCustomMessage, setShowCustomMessage] =
    useState(false);

  const [copiedIndex, setCopiedIndex] =
    useState(null);

  const [savedMessage, setSavedMessage] =
    useState(false);

  useEffect(() => {
    try {
      const savedGuests =
        localStorage.getItem(GUEST_STORAGE_KEY);

      if (savedGuests) {
        const parsed = JSON.parse(savedGuests);

        if (Array.isArray(parsed)) {
          setGuests(parsed);
        }
      }

      const savedMessage =
        localStorage.getItem(MESSAGE_STORAGE_KEY);

      if (savedMessage) {
        setMessageTemplate(savedMessage);
      }
    } catch {
      // Abaikan jika localStorage tidak dapat dibaca.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      GUEST_STORAGE_KEY,
      JSON.stringify(guests)
    );
  }, [guests]);

  const addGuest = () => {
    const cleanName = name.trim();

    if (!cleanName) return;

    const alreadyExists = guests.some(
      (guest) =>
        guest.toLowerCase() ===
        cleanName.toLowerCase()
    );

    if (alreadyExists) {
      alert("Nama tamu sudah ada.");
      return;
    }

    setGuests((current) => [
      ...current,
      cleanName,
    ]);

    setName("");
  };

  const removeGuest = (index) => {
    setGuests((current) =>
      current.filter(
        (_, guestIndex) =>
          guestIndex !== index
      )
    );

    setCopiedIndex(null);
  };

  const saveMessageTemplate = () => {
    localStorage.setItem(
      MESSAGE_STORAGE_KEY,
      messageTemplate
    );

    setSavedMessage(true);

    setTimeout(() => {
      setSavedMessage(false);
    }, 1800);
  };

  const resetMessageTemplate = () => {
    setMessageTemplate(DEFAULT_MESSAGE);
    localStorage.setItem(
      MESSAGE_STORAGE_KEY,
      DEFAULT_MESSAGE
    );
  };

  const copyMessage = async (
    guest,
    index
  ) => {
    const message = createMessage(
      messageTemplate,
      guest
    );

    try {
      await navigator.clipboard.writeText(
        message
      );

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1800);
    } catch {
      alert(
        "Pesan gagal disalin. Silakan coba lagi."
      );
    }
  };

  const previewName =
    guests[0] || "Nama Tamu";

  const previewMessage = createMessage(
    messageTemplate,
    previewName
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "28px 16px 40px",
        background: "#f7f2ef",
        fontFamily: "Arial, sans-serif",
        color: "#2b1a1d",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#5d1721",
              fontSize: "25px",
              fontWeight: 700,
            }}
          >
            Daftar Tamu
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#725b60",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            Tambahkan nama tamu lalu salin
            pesan undangannya.
          </p>
        </div>

        {/* CUSTOM GLOBAL MESSAGE BUTTON */}

        <button
          type="button"
          onClick={() =>
            setShowCustomMessage(true)
          }
          style={{
            width: "100%",
            minHeight: "46px",
            marginBottom: "18px",
            border: "1px solid #5d1721",
            borderRadius: "7px",
            background: "#ffffff",
            color: "#5d1721",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ✎ Custom Kata-kata Undangan
        </button>

        {/* CUSTOM GLOBAL MESSAGE MODAL */}

        {showCustomMessage && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px",
              boxSizing: "border-box",
              background:
                "rgba(0,0,0,0.45)",
            }}
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setShowCustomMessage(false);
              }
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "620px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxSizing: "border-box",
                padding: "20px",
                borderRadius: "10px",
                background: "#ffffff",
                boxShadow:
                  "0 15px 45px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginBottom: "6px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "#5d1721",
                    fontSize: "18px",
                  }}
                >
                  Custom Kata-kata Undangan
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setShowCustomMessage(false)
                  }
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "none",
                    borderRadius: "50%",
                    background: "#f3eeee",
                    color: "#5d1721",
                    fontSize: "17px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>

              <p
                style={{
                  margin: "0 0 13px",
                  color: "#725b60",
                  fontSize: "12px",
                  lineHeight: 1.5,
                }}
              >
                Pengaturan ini berlaku untuk
                <b> semua tamu</b>. Gunakan
                <b> {"{NAMA}"}</b> untuk nama
                tamu dan <b>{"{LINK}"}</b> untuk
                link personal.
              </p>

              <textarea
                value={messageTemplate}
                onChange={(event) =>
                  setMessageTemplate(
                    event.target.value
                  )
                }
                rows={14}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px",
                  border:
                    "1px solid #d8c4c7",
                  borderRadius: "7px",
                  outline: "none",
                  resize: "vertical",
                  background: "#fffdfd",
                  color: "#2b1a1d",
                  fontFamily:
                    "Arial, sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              />

              <div
                style={{
                  marginTop: "14px",
                  padding: "12px",
                  borderRadius: "7px",
                  background: "#f8f4f4",
                }}
              >
                <div
                  style={{
                    marginBottom: "7px",
                    color: "#5d1721",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Preview
                </div>

                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    color: "#5b4b4f",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  {previewMessage}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "14px",
                }}
              >
                <button
                  type="button"
                  onClick={resetMessageTemplate}
                  style={{
                    flex: 1,
                    minHeight: "42px",
                    border:
                      "1px solid #d8c4c7",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#725b60",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Kembalikan Default
                </button>

                <button
                  type="button"
                  onClick={() => {
                    saveMessageTemplate();
                    setShowCustomMessage(false);
                  }}
                  style={{
                    flex: 1,
                    minHeight: "42px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#5d1721",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {savedMessage
                    ? "✓ Tersimpan"
                    : "Simpan & Tutup"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INPUT GUEST */}

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addGuest();
              }
            }}
            placeholder="Contoh: Jessica Jane"
            style={{
              flex: 1,
              minWidth: 0,
              height: "46px",
              padding: "0 13px",
              boxSizing: "border-box",
              border:
                "1px solid #d8c4c7",
              borderRadius: "7px",
              outline: "none",
              background: "#ffffff",
              color: "#2b1a1d",
              fontSize: "13px",
            }}
          />

          <button
            type="button"
            onClick={addGuest}
            style={{
              flexShrink: 0,
              height: "46px",
              padding: "0 18px",
              border: "none",
              borderRadius: "7px",
              background: "#5d1721",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Tambah
          </button>
        </div>

        <div
          style={{
            marginBottom: "12px",
            color: "#725b60",
            fontSize: "12px",
          }}
        >
          {guests.length} nama tamu
        </div>

        {guests.length === 0 ? (
          <div
            style={{
              padding: "30px 20px",
              border:
                "1px dashed #d8c4c7",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#8a7478",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            Belum ada nama tamu.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {guests.map(
              (guest, index) => (
                <div
                  key={`${guest}-${index}`}
                  style={{
                    padding: "15px",
                    borderRadius: "8px",
                    background: "#ffffff",
                    boxShadow:
                      "0 2px 9px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      color: "#2b1a1d",
                      fontSize: "14px",
                      fontWeight: 700,
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {guest}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyMessage(
                        guest,
                        index
                      )
                    }
                    style={{
                      width: "100%",
                      minHeight: "38px",
                      marginTop: "12px",
                      border:
                        "1px solid #5d1721",
                      borderRadius: "6px",
                      background:
                        copiedIndex === index
                          ? "#5d1721"
                          : "#ffffff",
                      color:
                        copiedIndex === index
                          ? "#ffffff"
                          : "#5d1721",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {copiedIndex === index
                      ? "✓ Pesan Disalin"
                      : "Salin Pesan"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeGuest(index)
                    }
                    style={{
                      width: "100%",
                      minHeight: "34px",
                      marginTop: "7px",
                      border: "none",
                      background:
                        "transparent",
                      color: "#999",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    Hapus
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}