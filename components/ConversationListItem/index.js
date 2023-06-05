import React, {useEffect} from 'react';
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem({data,setCurrentReceiver}) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })
  
  const { photo, name, text,id } = data;
  const handleClick = ()=>{
    setCurrentReceiver({id,name})
  }
    return (
      <div className="conversation-list-item" onClick={handleClick}>
        <img className="conversation-photo" src={photo} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
        </div>
      </div>
    );
}