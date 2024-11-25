import React from "react";
import { Outlet } from "react-router-dom";
import ColumnOne from "../../Components/Columns/ColumnOne.jsx";
import ColumnTwo from "../../Components/Columns/ColumnTwo.jsx";
import "../Forum/Forum.css";
import Footer from "../../Components/Footer/Footer.jsx";
import bars from "../../assets/Images/bars.svg";
export default function GreenDefendDashboard() {
  const handleBars = (e) => {
    document.querySelector(".two").classList.remove("move-to-right");
  };
  return (
    <>
      <main className="dashboard-main">
        <button
          className="bg-white p-2 rounded-2 bars"
          style={{ border: "0", cursor: "pointer", zIndex: "10" }}
          onClick={handleBars}
        >
          <img src={bars} alt="" width={32} />
        </button>
        <section className="cols">
          <ColumnOne />

          <div className="column three">
            <div className="inner rounded-4">
              <Outlet />
            </div>
          </div>
          <ColumnTwo />
        </section>
        <Footer />
      </main>
    </>
  );
}
