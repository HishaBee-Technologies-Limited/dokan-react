import React from 'react';
import UserList from '@/components/online-shop/messages/UserList';
import MessageList from '@/components/online-shop/messages/MessageList';

const MessagePage = () => {
  return (
    <div className="h-full w-full flex gap-space8">
      <UserList />
      <MessageList />
    </div>
  );
};

export default MessagePage;
