import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import SeatPicker from './pages/SeatPicker';
import Events from './pages/Events';
import LayoutWrap from './Layouts/LayoutWrap';
import EventDet from './pages/EventDet';

const RoutesTree = () => {
  return (
    <div>
      <LayoutWrap>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/:id/seatpicker' element={<SeatPicker />} />
          <Route path='/:id/eventdetails' element={<EventDet />} />
        </Routes>
      </LayoutWrap>
    </div>
  );
};

export default RoutesTree;
