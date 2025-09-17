import React from "react";
import { useTranslation } from "react-i18next";
import Countdown from "../../components/Countdown/Countdown";
import Loader from "../../components/Loader/Loader";
import { SUBMISSION_DEADLINE } from "../../utils/constants";
import "./Home.scss";
import Actions from "../../components/Actions/Actions";

export default function Home() {
  const { t } = useTranslation();
  const deadlinePassed = Date.now() > SUBMISSION_DEADLINE.getTime();

  return (
    <section className="home container">
      <div className="card">
        {/* Title */}
        <h1 className="h1">{t("title")}</h1>
        <p className="subtitle">{t("subtitle") || ""}</p>

        {/* Countdown */}
        <div className="countdown-wrapper">
          <Countdown />
        </div>

        {/* Actions */}
        <br />
        <Actions />

        {/* Info Grid */}
        <div className="grid2">
          <div className="card small">
            <strong>{t("deadline")}</strong>
            <div className="p">{SUBMISSION_DEADLINE.toLocaleString()}</div>
          </div>
          <div className="card small">
            <strong>{t("judging")}</strong>
            <div className="p">
              {deadlinePassed ? (
                <span className="status active">
                  ✅ {t("active") || "فعال"}
                </span>
              ) : (
                <span className="status pending">
                  ⏳{" "}
                  {t("after_deadline") || "بعد از پایان مهلت نمایش داده می‌شود"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Loader */}
        <div className="loader-wrapper">
          <Loader />
        </div>
      </div>
    </section>
  );
}
