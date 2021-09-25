import React, { useContext, useEffect } from "react";
import dateFns from "date-fns";
import EditorText from "./EditorText";
import { varCtx } from "../shared/shared";

export default function Today() {
  const { value } = useContext(varCtx);
  const date = new Date();
  const today = value.filter((e) => dateFns.isSameDay(date, e.date));
  useEffect(() => {}, []);
  return (
    <div className="Today">
      <div className="Todaydate">
        <div> {dateFns.format(date, "DD MMMM YYYY")}</div>
      </div>
      <ul className="TodayList">
        {today.length === 0 ? (
          <EditorText />
        ) : (
          today.map((e, i) => (
            <li key={i} className="TodayListItem">
              <h2
                className="Todaycontent"
                dangerouslySetInnerHTML={{ __html: e.title }}
              />
              <div dangerouslySetInnerHTML={{ __html: e.body }} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
