import { useEffect, useState } from "react";
import './ColdStartToast.css';

const ColdStartToast = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/keep-alive`)
      .then(() => setIsVisible(true))
      .catch(() => {
        setMessage("Backend is taking too long. Please refresh.");
        setIsError(true);
        setTimeout(() => setIsVisible(false), 5000);
      });
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`custom-toast ${isError ? 'error' : ''}`}>
      <div className="toast-content">
        {!isError && <span className="spinner" />}
        <span className="toast-message">
          Waking up server...<span className="mobile-hide"> may take up to 1–2 mins </span>(Render free tier)
        </span>
      </div>
      <button className="close-button" onClick={() => setIsVisible(false)}>
        &times;
      </button>
    </div>
  );
};

export default ColdStartToast;