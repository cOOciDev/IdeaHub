import React, { useEffect, useState } from "react";
import "./Loader.scss";
export default function Loader({ running = true }: { running?: boolean }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(
      () => setP((v) => (v >= 100 ? 100 : v + Math.random() * 8)),
      500
    );
    return () => clearInterval(id);
  }, [running]);
  return (
    <div className="wrap">
      <div className="progressBar">
        <div className="progressInner" style={{ width: `${p}%` }} />
      </div>
      <div className="meta">{Math.floor(p)}%</div>
    </div>
  );
}
