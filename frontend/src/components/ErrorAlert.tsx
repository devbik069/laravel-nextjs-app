// components/ErrorAlert.tsx
"use client";

import React from "react";

interface ErrorAlertProps {
  errors: string[];
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errors, onClose }) => {
  if (errors.length === 0) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show">
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
      <h5>
        <i className="icon fas fa-exclamation-circle"></i> Error!
      </h5>
      <ul className="mb-0 ps-3" style={{ listStyleType: "disc" }}>
        {errors.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorAlert;
