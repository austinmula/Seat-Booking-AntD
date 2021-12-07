import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, Typography } from 'antd';
import { useLocation } from 'react-router';
import axios from 'axios';

const { Title } = Typography;

const EventDet = () => {
  const location = useLocation();
  const [event, setEvent] = useState({});
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const path = location.pathname.split('/')[1];

  useEffect(() => {
    fetchEvent(path);
  }, []);

  const fetchEvent = async (id) => {
    const response = await axios.get('http://localhost:5000/api/events/' + id);
    setEvent(response.data);
    setFetching(false);
    setData(response.data.people);
    console.log(event);
    console.log(data);
  };

  return (
    <div>
      {!fetching && (
        <div>
          <Title level={3}>
            {event.church_name} | {event.event_name}
          </Title>
          <Title level={4}>
            Booked Seats : {event.seats.filter((s) => s.booked).length}, Free
            Seats : {event.seats.filter((s) => !s.booked).length}
          </Title>
        </div>
      )}
      <List className='demo-loadmore-list' itemLayout='horizontal'>
        {!fetching &&
          data.map((data, index) => (
            <List.Item
              key={index}
              actions={[<Button key='list-loadmore-more'>delete</Button>]}
            >
              <List.Item.Meta
                avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                title={data.name}
                description={`Booked Seats: ${data.picks.length}`}
              />
              <div>Seat Number(s) : {data.picks.map((i) => i + ' ,')}</div>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default EventDet;
