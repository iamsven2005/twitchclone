// ChatSection.tsx

import React, { useState, useEffect } from 'react';
import { stringToColor } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  viewerName: string;
  isFollowing: boolean;
  isHidden: boolean;
  hostIdentity: string;
  hostName: string;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  time: string;
}

interface ChatSectionProps {
  viewerName: string;
  hostIdentity: string;
  hostName: string;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  viewerName,
  hostIdentity,
  hostName,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const viewName = viewerName;
  const roomKey = `chat_${hostIdentity}`; // Use a different key for each room
  const disabled = isFollowersOnly === isFollowing || isHidden;
  const [currentTime, setCurrentTime] = useState(new Date());
  let time = currentTime.toLocaleTimeString();
  useEffect(() => {
    // Load messages from localStorage on component mount
    loadMessages();
  }, [hostIdentity]); // Reload messages when hostIdentity changes
  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  const loadMessages = () => {
    const storedMessages = localStorage.getItem(roomKey);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };

  const saveMessages = (updatedMessages: Message[]) => {
    localStorage.setItem(roomKey, JSON.stringify(updatedMessages));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newId = messages.length + 1;
    const messageToAdd: Message = {
      id: newId,
      text: newMessage,
      viewerName: viewName,
      isFollowing: isFollowing,
      isHidden: isHidden,
      hostIdentity: hostIdentity,
      hostName: hostName,
      isFollowersOnly: isFollowersOnly,
      isDelayed: isDelayed,
      time: time,
    };

    if (isDelayed) {
      // Delay the addition of the message
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, messageToAdd]);
        saveMessages([...messages, messageToAdd]);
      }, 3000); // You can adjust the delay time (in milliseconds)
    } else {
      setMessages((prevMessages) => [...prevMessages, messageToAdd]);
      saveMessages([...messages, messageToAdd]);
    }

    setNewMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li
            className={`text-${stringToColor(viewName)}`}
            key={message.id}
          >{`${message.time}${message.viewerName}: ${message.text}`}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          disabled={disabled}
          value={newMessage}
          className="input input-primary"
          placeholder="Message"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn" disabled={disabled} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
