import { useEffect, useState } from "react";
import "./Columns.css";
import { defaultImgUrl } from "./ColumnTwo";
const API =
  "https://greendefined.runasp.net/api/Classfication/AhmedTripleMohamedMosad";
export default function ColumnOne() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async (api) => {
      const response = await fetch(api);
      const data = await response.json();
      if (data) {
        const groupOfData = data.slice(0, 11);
        setData(groupOfData);
      }
    };
    getData(API);
  }, []);
  return (
    <>
      <div className="column one">
        <ul>
          {data &&
            data.map((user, index) => (
              <li
                key={index}
                className="d-flex align-items-center text-end justify-content-end"
              >
                <span>{user.fullName}</span>
                <div className="image position-relative">
                  <img src={user.imageUrl || defaultImgUrl} alt="" />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
