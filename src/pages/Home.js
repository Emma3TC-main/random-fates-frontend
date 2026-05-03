import { useEffect } from "react";
import { apiFetch } from "../api/client";

function Home() {
  useEffect(() => {
    apiFetch("/api/test")
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <div className="p-10 text-center">
      <h2 className="text-2x1/7 font-bold mb-4">Home</h2>
    </div>
  );
}

export default Home;
