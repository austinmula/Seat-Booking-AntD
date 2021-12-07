import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button } from 'antd';
import moment from 'moment';

const Events = () => {
  const serverHost = 'http://localhost:5000/api';
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    //console.log(events);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(serverHost + '/events');
      //console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Async function to delete
  const deleteEvent = async (id) => {
    try {
      const res = await axios.delete(serverHost + '/events/' + id);
      console.log(res);
      if (res.status === 200) {
        //setsuccess(true);
        //update the New Events
        setEvents(events.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    deleteEvent(id);
  };
  return (
    <List
      className='demo-loadmore-list'
      itemLayout='horizontal'
      dataSource={events}
      renderItem={(event) =>
        console.log(event) || (
          <List.Item
            actions={[
              <Button key='list-loadmore-edit' href={`/${event.id}/seatpicker`}>
                book-seat
              </Button>,
              <Button
                key='list-loadmore-edit'
                href={`/${event.id}/eventdetails`}
              >
                more
              </Button>,
              <Button
                type='primary'
                danger
                onClick={() => handleDelete(event.id)}
                key='list-loadmore-more'
              >
                delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              //   avatar={<Avatar src={item.picture.large} />}
              title={event.church_name}
              description={event.event_name}
            />
            <div>{moment(event.date).format('MMMM Do YYYY')}</div>
          </List.Item>
        )
      }
    />
  );
};

export default Events;
