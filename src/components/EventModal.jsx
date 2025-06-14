import React, { useState } from "react";
import "../styles/modal.css";

const EventModal = ({ selectedDate, onClose, onSave, onDelete, events }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [time, setTime] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index) => {
    const event = events[index];
    setEventTitle(event.title);
    setEventDescription(event.description);
    setTime(event.time);
    setEditingIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvent = {
      date: selectedDate,
      title: eventTitle,
      description: eventDescription,
      time,
    };

    onSave(newEvent, editingIndex);
    setEventTitle("");
    setEventDescription("");
    setTime("");
    setEditingIndex(null);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>
          {editingIndex !== null ? "Edit" : "Add"} Event -{" "}
          {selectedDate.format("DD MMM YYYY")}
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title<span style={{ color: "red" }}> *</span>
          </label>
          <input
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />

          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <label>Description</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />

          <div className="modal-actions">
            <button type="submit">
              {editingIndex !== null ? "Update" : "Save"}
            </button>
            <button type="button" onClick={onClose} className="cancel">
              Cancel
            </button>
          </div>
        </form>

        {events.length > 0 && (
          <div className="event-list">
            <h3>Events for this day:</h3>
            {events.map((event, index) => (
              <div key={index} className="event-item">
                <div>
                  <strong>{event.title}</strong>{" "}
                  {event.time && `(${event.time})`}
                  {event.description && <div>{event.description}</div>}
                </div>
                <div className="event-buttons">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => onDelete(index)} className="delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;
