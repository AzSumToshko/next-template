'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const Calendar = () => {
  const [events, setEvents] = useState<EventInput[]>([
    { id: uuidv4(), title: 'Meeting', start: new Date().toISOString() },
  ]);

  const handleDateClick = (info: any) => {
    const title = prompt('Enter event title');
    if (title) {
      setEvents([...events, { id: uuidv4(), title, start: info.date }]);
    }
  };

  const handleEventClick = (info: any) => {
    if (confirm(`Delete event "${info.event.title}"?`)) {
      setEvents(events.filter((event) => event.id !== info.event.id));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-semibold">FullCalendar Demo</h2>
      <div className="shadow-md border border-gray-200 p-2 rounded-lg bg-white w-full max-w-4xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>
      <Button variant="contained" color="primary" onClick={() => setEvents([])}>
        Clear Events
      </Button>
    </div>
  );
};

export default Calendar;
