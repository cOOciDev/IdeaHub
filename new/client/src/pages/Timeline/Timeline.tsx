import React from "react";
import "./Timeline.scss";

export default function Timeline() {
  const events = [
    {
      date: "1 مهر 1404",
      title: "شروع ثبت‌نام",
      description: "ثبت‌نام شرکت‌کنندگان آغاز می‌شود.",
    },
    {
      date: "15 مهر 1404",
      title: "پایان ثبت‌نام",
      description: "مهلت ثبت‌نام شرکت‌کنندگان پایان می‌یابد.",
    },
    {
      date: "20 مهر 1404",
      title: "شروع رویداد",
      description: "رویداد آغاز می‌شود و تیم‌ها فعالیت خود را شروع می‌کنند.",
    },
    {
      date: "30 مهر 1404",
      title: "پایان رویداد و داوری",
      description: "پروژه‌ها تحویل داده شده و داوری آغاز می‌شود.",
    },
    {
      date: "5 آبان 1404",
      title: "اعلام نتایج",
      description: "نتایج نهایی و برندگان اعلام می‌شوند.",
    },
  ];

  return (
    <section className="timeline container">
      <div className="header-card">
        <h1 className="h1">تقویم رویداد</h1>
        <p className="subtitle">
          رویداد ما شامل مراحل مختلفی است، از ثبت‌نام تا اعلام نتایج.
        </p>
      </div>

      <div className="timeline-list">
        {events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="timeline-date">{event.date}</span>
              <h2 className="timeline-title">{event.title}</h2>
              <p className="timeline-desc">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
