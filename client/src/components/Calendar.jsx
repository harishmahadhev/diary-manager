import React from "react";
import dateFns from "date-fns";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    isActive: false,
    selectedEvent: {},
  };

  renderModel() {
    const { selectedEvent, isActive } = this.state;
    return (
      <div className={`CalendarModel ${isActive ? "active" : ""}`}>
        <button className="modalClosebtn" onClick={() => this.closeModel()}>
          &times;
        </button>
        <h3> {selectedEvent.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: selectedEvent.body }}></div>
      </div>
    );
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells(data) {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const event = data.filter((event) =>
          dateFns.isSameDay(event.date, cloneDay)
        );
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">
              <ul className="bgList">
                {event.map((e, i) => (
                  <li
                    className="bgItem"
                    key={i}
                    onClick={() => this.openModel(e)}
                  >
                    {e.title}
                  </li>
                ))}
              </ul>
            </span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  closeModel = () => {
    this.setState({ isActive: false });
  };
  openModel = (event) => {
    this.setState({ selectedEvent: event, isActive: true });
  };

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells(this.props.value)}
        {this.renderModel()}
      </div>
    );
  }
}

export default Calendar;
