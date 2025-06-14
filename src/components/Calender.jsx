import React, { useState } from "react";
import dayjs from "dayjs";
import "../styles/calender.css";
import EventModal from "./EventModal";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});

  const today = dayjs();
  const startDay = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();

  const daysArray = [];

  for (let i = 0; i < startDay; i++) {
    daysArray.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = currentMonth.date(d);
    const isToday = dayDate.isSame(today, "day");
    const dateKey = dayDate.format("YYYY-MM-DD");
    const dayEvents = events[dateKey] || [];

    daysArray.push(
      <div
        key={d}
        className={`day-cell ${isToday ? "today" : ""}`}
        onClick={() => {
          setSelectedDate(dayDate);
          setShowModal(true);
        }}
      >
        <div className="day-number">{d}</div>
        {dayEvents.slice(0, 2).map((event, index) => (
          <div key={index} className="event-title">
            • {event.title}
          </div>
        ))}
        {dayEvents.length > 2 && (
          <div className="more-events">+{dayEvents.length - 2} more</div>
        )}
      </div>
    );
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={goToPreviousMonth}>
          &lt; Prev
        </button>
        <span className="month-label">{currentMonth.format("MMMM YYYY")}</span>
        <button className="nav-button" onClick={goToNextMonth}>
          Next &gt;
        </button>
      </div>

      <div className="weekday-row">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="weekday-cell">
            {day}
          </div>
        ))}
      </div>

      <div className="days-grid">{daysArray}</div>

      {showModal && selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          events={events[selectedDate.format("YYYY-MM-DD")] || []}
          onClose={() => {
            setShowModal(false);
            setSelectedDate(null);
          }}
          onSave={(event, editIndex = null) => {
            const key = selectedDate.format("YYYY-MM-DD");
            const updated = { ...events };

            if (editIndex !== null) {
              updated[key][editIndex] = event;
            } else {
              if (!updated[key]) updated[key] = [];
              updated[key].push(event);
            }

            setEvents(updated);
          }}
          onDelete={(index) => {
            const key = selectedDate.format("YYYY-MM-DD");
            const updated = { ...events };
            updated[key].splice(index, 1);
            if (updated[key].length === 0) delete updated[key];
            setEvents(updated);
          }}
        />
      )}
    </div>
  );
};

export default Calendar;
