import { List, Avatar } from 'antd';

const Event = ({ event }) => {
  return (
    <List>
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title={<a href='https://ant.design'>{event.church_name}</a>}
          description={event.event_name}
        />
      </List.Item>
    </List>
  );
};
export default Event;
