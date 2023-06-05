import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import './ConversationList.css';

export default function ConversationList({users,setCurrentReceiver}) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations()
  },[])
 const getConversations = () => {
  let newConversations = users.map(result => {
    return {
      photo: `${result.photo}`,
      name: `${result.name}`,
      id:result._id
    };
  });
  setConversations([...newConversations])
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
              setCurrentReceiver={setCurrentReceiver}
            />
          )
        }
      </div>
    );
}