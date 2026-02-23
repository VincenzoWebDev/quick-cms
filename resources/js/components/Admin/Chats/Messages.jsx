import { STORAGE_URL } from '@/constants/constants';
import { ShieldCheck } from 'lucide-react';
import React from 'react';

const Messages = React.memo(({ messages, activeChat }) => {
  if (!activeChat?.length) {
    return null;
  }

  return messages.map((message) => {
    const isIncoming = message.user_id === activeChat[0].user_id;
    const userImage = STORAGE_URL + message.user.profile_img;

    return (
      <div key={message.id} className={`chat-message-row ${isIncoming ? 'incoming' : 'outgoing'}`}>
        {isIncoming && <img src={userImage} alt={message.user.name} className="chat-message-avatar" />}

        <div className={`message-bubble ${isIncoming ? 'message-incoming' : 'message-outgoing'}`}>
          <div className="message-author-row">
            <strong>
              {message.user.role === 'admin' ? (
                <>
                  <ShieldCheck height={16} width={16} className="me-1" />
                  Admin
                </>
              ) : (
                message.user.name
              )}
            </strong>
          </div>

          <p className="message-content">{message.content}</p>

          <small className={`message-time ${isIncoming ? 'message-time-incoming' : 'message-time-outgoing'}`}>
            {new Date(message.created_at).toLocaleTimeString('it-IT', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </small>
        </div>

        {!isIncoming && <img src={userImage} alt={message.user.name} className="chat-message-avatar" />}
      </div>
    );
  });
});

export default Messages;
