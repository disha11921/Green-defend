import { useEffect } from "react";
import image from "../../assets/Images/start.png";
import { Link } from "react-router-dom";
import "./Start.css";
export const Start = () => {
    useEffect(() => {
        const start = document.querySelector(".start");
        start.classList.add("opacity-100")
        start.classList.add("transform")
    }, []);
    return (
        <div className="start d-flex flex-column align-items-center">
            <h1 id="unique-head">
                Green<span>Defend</span>
            </h1>
            <img className="img-fluid" src={image} alt="" />
            <Link to="slide" className="btn btn-success col-12 py-2">البدء الان</Link>
        </div>
    )
}