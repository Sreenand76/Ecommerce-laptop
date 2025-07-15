import { useEffect, useState, useRef } from "react";
import './ColdStartToast.css';

const ColdStartToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);
  const timeoutRef = useRef(null);
  const DELAY_THRESHOLD = 1000; // 1 second threshold

  useEffect(() => {
    // Set timeout to show toast only if server is slow
    timeoutRef.current = setTimeout(() => {
      setShowToast(true);
    }, DELAY_THRESHOLD);

    const controller = new AbortController();
    
    fetch(`${import.meta.env.VITE_API_URL}/keep-alive`, { 
      signal: controller.signal 
    })
      .then(response => {
        clearTimeout(timeoutRef.current);
        if (!response.ok) throw new Error("Server not ready");
        
        // Only animate out if toast was shown
        if (showToast) {
          setTimeout(() => setShowToast(false), 300); // Smooth exit
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          clearTimeout(timeoutRef.current);
          setShowToast(true);
          setIsError(true);
          setTimeout(() => setShowToast(false), 5000); // Show error for 5s
        }
      });

    return () => {
      clearTimeout(timeoutRef.current);
      controller.abort(); // Cleanup fetch on unmount
    };
  }, [showToast]);

  if (!showToast) return null;

  return (
    <div className={`custom-toast ${isError ? 'error' : ''}`}>
      <div className="toast-content">
        {!isError && <span className="spinner" />}
        <span className="toast-message">
          {isError 
            ? "Backend is taking too long. Please refresh."
            : "Waking up server..."}
        </span>
      </div>
      <button 
        className="close-button" 
        onClick={() => setShowToast(false)}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default ColdStartToast;