import React from "react";
import "./About.scss";

export default function About() {
  return (
    <section className="about container">
      {/* Page Header */}
      <div className="header-card">
        <h1 className="h1">درباره رویداد</h1>
        <p className="subtitle">
          این رویداد با هدف ارتقای مهارت‌های نرم و خلاقیت برگزار می‌شود و
          شرکت‌کنندگان فرصتی عالی برای یادگیری، شبکه‌سازی و تجربه عملی خواهند
          داشت.
        </p>
      </div>

      {/* Event Details */}
      <div className="grid">
        <div className="card">
          <h2>🎯 اهداف</h2>
          <ul>
            <li>تقویت مهارت‌های فردی و تیمی</li>
            <li>ایجاد تجربه عملی در پروژه‌های واقعی</li>
            <li>شبکه‌سازی با دیگر شرکت‌کنندگان و مربیان</li>
          </ul>
        </div>

        <div className="card">
          <h2>🗓️ برنامه زمانی</h2>
          <ul>
            <li>شروع رویداد: 1 مهر 1404</li>
            <li>مهلت ثبت‌نام: 15 مهر 1404</li>
            <li>پایان رویداد و داوری: 30 مهر 1404</li>
          </ul>
        </div>

        <div className="card">
          <h2>📍 محل برگزاری</h2>
          <p>تهران، مرکز نوآوری فناوری، سالن اصلی</p>
        </div>

        <div className="card">
          <h2>💡 راهنمای شرکت‌کنندگان</h2>
          <p>
            حتما قبل از حضور، قوانین و دستورالعمل‌های شرکت‌کنندگان را مطالعه
            کنید و تجهیزات لازم را همراه داشته باشید.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta">
        <a href="/submit" className="btn">
          ثبت‌نام در رویداد
        </a>
        <a
          href="/api/v1/call/download"
          target="_blank"
          rel="noreferrer"
          className="btn--ghost"
        >
          دانلود راهنما
        </a>
      </div>
    </section>
  );
}
