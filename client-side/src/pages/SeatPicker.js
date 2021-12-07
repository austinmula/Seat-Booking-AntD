import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router';
import { Row, Col, Card, Space } from 'antd';
import SeatForm from '../components/SeatForm';

const SeatPicker = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const serverHost = 'http://localhost:5000/api';

  useEffect(() => {
    fetchEvent(path);
    console.log(path);
  }, [path]);

  const [event, setEvent] = useState({});
  const [fetching, setFetching] = useState(true);
  const [picks, setPicks] = useState([0]);

  const fetchEvent = async (id) => {
    const response = await axios.get('http://localhost:5000/api/events/' + id);
    setEvent(response.data);
    setFetching(false);
  };

  const bookSeat = async (data) => {
    try {
      const res = await axios.put(serverHost + '/events/' + path, data);

      if (res.status === 200) {
        setEvent(res.data);
        setPicks([0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    if (picks.length === 0) {
      setPicks(id);
    } else {
      if (picks.includes(id)) {
        // REMOVES THE ELEMENT FROM ARRAY ON SECOND CLICK
        setPicks(picks.filter((x) => x !== id));
      } else {
        setPicks([...picks, id]);
        //setPicks(picks.push(id));
      }
    }

    console.log(picks);
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title='Seats'>
          <Space align='start'>
            {!fetching && (
              <div className='seat-picker-container'>
                {event.seats.map((e, i) => (
                  <Seat
                    key={e.id}
                    isbooked={e.booked}
                    seat_id={e.id}
                    picks={picks}
                    onClick={() => handleClick(e.id)}
                  >
                    <p>{i + 1}</p>
                  </Seat>
                ))}
              </div>
            )}
            <p>You have picked {picks.length - 1} seats</p>
          </Space>
        </Card>
      </Col>
      <Col span={12}>
        <Card title='Enter Name After Picking Seat'>
          <SeatForm picks={picks} bookSeat={bookSeat} />
        </Card>
      </Col>
    </Row>
  );
};

const Seat = styled.div`
  cursor: pointer;
  background-color: ${({ picks, seat_id }) =>
    picks.includes(seat_id) ? '#33FF7D' : '#5d5c61'};
  height: 27px;
  width: 30px;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #fff;
  font-size: 10px;
  ${(props) =>
    props.isbooked &&
    css`
      background: #557a95;
      pointer-events: none;
    `}
`;

export default SeatPicker;
