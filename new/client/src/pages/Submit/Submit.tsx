import React, { useState } from "react";
import Actions from "../../components/Actions/Actions";
import "./Submit.scss";

export default function Submit() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    file: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file" && files) {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Integrate your API call here
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", file: null });
  };

  return (
    <section className="submit container">
      <div className="header-card">
        <h1 className="h1">ثبت‌نام و ارسال اثر</h1>
        <p className="subtitle">
          لطفا فرم زیر را تکمیل کنید و فایل پروژه خود را بارگذاری نمایید.
        </p>
      </div>

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
            شماره تماس
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            بارگذاری فایل پروژه
            <input
              type="file"
              name="file"
              accept=".zip,.rar,.pdf,.docx"
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="btn">
            ارسال
          </button>

          {submitted && <p className="success">پیام شما با موفقیت ارسال شد!</p>}
        </form>
      </div>

      {/* Actions: Download guide or additional CTA */}
      <Actions submitHref="/submit" downloadHref="/api/v1/call/download" />
    </section>
  );
}
