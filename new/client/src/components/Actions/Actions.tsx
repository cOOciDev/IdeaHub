import React from "react";
import { useTranslation } from "react-i18next";
import "./Actions.scss";

interface ActionsProps {
  submitHref?: string;
  downloadHref?: string;
}

export default function Actions({
  submitHref = "/submit",
  downloadHref = "/api/v1/call/download",
}: ActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="actions">
      <a className="btn" href={submitHref}>
        {t("cta_submit") || "ثبت‌نام"}
      </a>
      <a
        className="btn--ghost"
        href={downloadHref}
        target="_blank"
        rel="noreferrer"
      >
        {t("download_call") || "دانلود راهنما"}
      </a>
    </div>
  );
}
