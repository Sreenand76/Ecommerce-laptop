import { useEffect } from "react";
import { toast } from "react-toastify";
import './ColdStartToastDark.css';

const ColdStartToast = () => {
  useEffect(() => {
    const toastId = "coldStartDark";

    toast.info(
      <div className="cold-toast-dark-content">
        <span className="spinner-dark" />
        Waking up server... may take up to 1–2 mins (Render free tier)
      </div>,
      {
        toastId,
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "dark", 
        toastClassName: "cold-toast-dark",
      }
    );

    fetch(`${import.meta.env.VITE_API_URL}/keep-alive`)
      .then(() => toast.dismiss(toastId))
      .catch(() => {
        toast.update(toastId, {
          render: "Backend is taking too long. Please refresh.",
          type: "error",
          autoClose: 5000,
        });
      });
  }, []);

  return null;
};

export default ColdStartToast;
