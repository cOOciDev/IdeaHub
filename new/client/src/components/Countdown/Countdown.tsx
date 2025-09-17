import React, { useEffect, useState } from "react";
import { diffDHMS, pad } from "../../utils/date";
import { SUBMISSION_DEADLINE } from "../../utils/constants";
import "./Countdown.scss"; // switched to module for scoped styles
import { useTranslation } from "react-i18next";

type CountBoxProps = {
  value: number;
  label: string;
  color: string;
  highlight?: boolean;
  max: number; // 👈 max value for that unit (60s, 60m, 24h, etc.)
};
function CountBox({ value, label, color, highlight, max }: CountBoxProps) {
  // percentage of progress
  const percent = (value / max) * 100;

  return (
    <div
      className={`countBox ${highlight ? "highlight" : ""}`}
      style={{
        border: "6px solid transparent",
        borderRadius: "16px",
        borderImage: `conic-gradient(${color} ${percent}%, #e0e0e0 ${percent}%) 1`,
      }}
    >
      <div className="value" style={{ color: `var(${color})` }}>
        {pad(value)}
      </div>
      <small className="label">{label}</small>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState(diffDHMS(SUBMISSION_DEADLINE));
  const { t: tr } = useTranslation();
  useEffect(() => {
    const id = setInterval(() => setT(diffDHMS(SUBMISSION_DEADLINE)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="wrap">
      <h3 className="title">⏳ {tr("ends_in") || ""}</h3>
      <div className="countdown">
        <CountBox
          value={t.d}
          label={tr("days") || ""}
          color="#ff6b6b"
          max={30}
        />
        <CountBox
          value={t.h}
          label={tr("hours") || ""}
          color="#4dabf7"
          max={24}
        />
        <CountBox
          value={t.m}
          label={tr("minutes") || ""}
          color="#51cf66"
          max={60}
        />
        <CountBox
          value={t.s}
          label={tr("seconds") || ""}
          color="#fcc419"
          highlight
          max={60}
        />
      </div>
    </div>
  );
}
