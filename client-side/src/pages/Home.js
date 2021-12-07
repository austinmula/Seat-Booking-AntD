import axios from 'axios';
import React, { useState } from 'react';
import FormReg from '../components/FormReg';
import Event from '../components/Event';
import { Row, Col, Card } from 'antd';
// import { Card } from 'antd';

const Home = () => {
  const [newevents, setNewevents] = useState([]);
  const serverHost = 'http://localhost:5000/api';

  // Asynchronous function to post the user input
  const addEvent = async (event) => {
    try {
      const res = await axios.post(serverHost + '/events', event);
      console.log(res.data);
      if (res.status === 200) {
        //setsuccess(true);
        //update the New Events
        setNewevents([...newevents, res.data]);
      } else {
        //seterror(true);
        console.log('an error occured');
      }
    } catch (error) {
      //seterror(true);
      console.log(error);
    }
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title='Register Your Event'>
          <FormReg addEvent={addEvent} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title='Recently Added.'>
          {newevents.length < 1
            ? 'no recent events'
            : newevents.map((newevent) => (
                <Event key={newevent.id} event={newevent} />
              ))}
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
