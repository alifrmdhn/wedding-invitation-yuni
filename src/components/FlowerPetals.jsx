import { useEffect, useState } from "react";

const petalColors = [
  "#e8a0b4",
  "#f2c4cf",
  "#d4778a",
  "#c95f74",
  "#f0d1d9",
  "#b68a46",
  "#d0ad6a",
];

function makePetal(i) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 120 + Math.random() * 260;
  return {
    id: i,
    color: petalColors[i % petalColors.length],
    x: 50 + (Math.random() - 0.5) * 20,
    y: 35 + (Math.random() - 0.5) * 20,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist - 200,
    rot: Math.random() * 720 - 360,
    dur: 2.2 + Math.random() * 1.6,
    delay: Math.random() * 0.5,
    size: 8 + Math.random() * 14,
    shape: Math.random() > 0.45 ? "circle" : "diamond",
  };
}

export default function FlowerPetals({ active }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!active) return;
    setPetals(Array.from({ length: 36 }, (_, i) => makePetal(i)));
    const t = setTimeout(() => setPetals([]), 4200);
    return () => clearTimeout(t);
  }, [active]);

  if (!petals.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            transform: p.shape === "diamond" ? "rotate(45deg)" : undefined,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            "--rot": `${p.rot}deg`,
            "--dur": `${p.dur}s`,
            "--delay": `${p.delay}s`,
            boxShadow: `0 2px 8px ${p.color}88`,
          }}
        />
      ))}
    </div>
  );
}
