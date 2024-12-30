import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import EventList from './Components/EventComponents/EventList';
import EventForm from './Components/EventComponents/EventForm';
import EventUpdate from './Components/EventComponents/EventUpdate'; // Import EventDetails component
import AttendeeList from './Components/AttendeeComponents/AttendeeList';
import AttendeeForm from './Components/AttendeeComponents/AttendeeForm';
import TaskList from './Components/TaskComponents/TaskList';
import EventView from './Components/EventComponents/EventView';
// import TaskStatusUpdate from './Components/TaskStatusUpdate';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EventList />} /> {/* getAllEvents() --> getAllEvents()|GET -  DONE */}
          
          <Route path="/events/new" element={<EventForm />} />  {/* createEvent() --> addEvents()|POST - DONE */}

          <Route path="/events/:eventId" element={<EventUpdate />} />  {/* updateEvent() --> updateEvent() | PATCH */}

          <Route path="/events/:eventId/view" element={<EventView />}/>

          <Route path="/events/:eventId/attendees" element={<AttendeeList />} />

          <Route path="/events/:eventId/add-attendees" element={<AttendeeForm />} />

          <Route path="/events/:eventId/attendees/:attendeeId/tasks" element={<TaskList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;