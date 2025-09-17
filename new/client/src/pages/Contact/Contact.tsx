import React, { useState } from "react";
import "./Contact.scss";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can integrate API call or email service
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact container">
      <div className="header-card">
        <h1 className="h1">تماس با ما</h1>
        <p className="subtitle">
          می‌توانید از طریق فرم زیر با ما در ارتباط باشید یا از اطلاعات تماس
          مستقیم استفاده کنید.
        </p>
      </div>

      <div className="grid">
        {/* Contact Form */}
        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            <label>
              نام و نام خانوادگی
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              ایمیل
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              پیام شما
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </label>

            <button type="submit" className="btn">
              ارسال پیام
            </button>
            {submitted && (
              <p className="success">پیام شما با موفقیت ارسال شد!</p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="card info-card">
          <h2>اطلاعات تماس</h2>
          <p>📞 تلفن: 011-12345678</p>
          <p>📧 ایمیل: info@example.com</p>
          <p>📍 آدرس: نوشهر، مرکز نوآوری فناوری</p>
        </div>
      </div>
    </section>
  );
}
