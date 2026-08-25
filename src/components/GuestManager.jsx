import { useEffect, useMemo, useState } from "react";

const BASE_URL =
  "https://wedding-invitation-yuni-ardian.vercel.app/";

const STORAGE_KEY =
  "yuni-ardian-guest-list";

function createInvitationMessage(name) {
  const link =
    `${BASE_URL}?to=${encodeURIComponent(name)}`;

  return `Assalamu’alaikum Warahmatullahi Wabarakatuh.

Dengan penuh rasa syukur dan bahagia, kami bermaksud mengundang Bapak/Ibu/Saudara/i ${name} untuk hadir dan memberikan doa restu pada acara pernikahan kami.

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir.

Yuni & Ardian

💌 Buka Undangan:
${link}

Terima kasih atas perhatian dan doa restunya.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.`;
}

export default function GuestManager() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setGuests(parsed);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
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
  };

  const copyMessage = async (
    guest,
    index
  ) => {
    const message =
      createInvitationMessage(guest);

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

  const guestCount = useMemo(
    () => guests.length,
    [guests]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "28px 16px 40px",
        background: "#f7f2ef",
        fontFamily:
          "Arial, sans-serif",
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
              margin:
                "8px 0 0",
              color: "#725b60",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            Tambahkan nama tamu,
            lalu salin pesan undangannya.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "22px",
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
          {guestCount} nama tamu
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

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "12px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        copyMessage(
                          guest,
                          index
                        )
                      }
                      style={{
                        flex: 1,
                        minHeight: "38px",
                        border: "1px solid #5d1721",
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
                        minHeight: "38px",
                        padding: "0 14px",
                        border:
                          "1px solid #ddd",
                        borderRadius: "6px",
                        background:
                          "#ffffff",
                        color: "#777",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}