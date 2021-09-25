import React, { useContext, useState } from "react";
import { varCtx } from "../shared/shared";
import dateFns from "date-fns";
import * as api from "../api/Api";

export default function Home() {
  const { value, setValue, user } = useContext(varCtx);
  const [search, setSearch] = useState("");
  const [isActive, setActive] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleClick = (event) => {
    setActive(true);
    setSelectedEvent(event);
  };

  const deleteEvent = async (id) => {
    await api.deleteEvent({ id });
    setValue(value.filter((e) => e._id !== id));
  };
  return (
    <div className="home">
      <div className="homeSearch">
        <input
          type="text"
          name="search"
          placeholder="Search"
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <h3>
        {`Hello.. ${user.name}.. Have a Happy day `}
        <span role="img" aria-label="exicted">
          😉
        </span>
      </h3>
      <ul className="homeList">
        {value.length === 0 ? (
          <div>
            <h2>
              Why don't you share something with me ?{" "}
              <span role="img" aria-label="sad">
                😣
              </span>
            </h2>
            <h4> Go write for today..</h4>
          </div>
        ) : (
          value
            .filter(
              (e) =>
                e.body.toLowerCase().includes(search.toLowerCase()) ||
                e.date.toLowerCase().includes(search.toLowerCase()) ||
                e.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((e, i) => (
              <li className="homeListItem" key={i}>
                <h1>{e.title}</h1>
                <div
                  className="homeListItemContent"
                  onClick={() => handleClick(e)}
                  dangerouslySetInnerHTML={{
                    __html: e.body,
                  }}
                />
                <div className="homeListItemFooter">
                  <i
                    className="homeListItemDelete fa fa-trash"
                    aria-hidden="true"
                    onClick={() => deleteEvent(e._id)}
                  ></i>
                  <div className="homeListItemDate">
                    {dateFns.format(e.date, "DD/MM/YYYY")}
                  </div>
                </div>
              </li>
            ))
        )}
      </ul>
      <div className={`CalendarModel ${isActive ? "active" : ""}`}>
        <button className="modalClosebtn" onClick={() => setActive(false)}>
          &times;
        </button>
        <h3> {selectedEvent.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: selectedEvent.body }}></div>
      </div>
    </div>
  );
}
