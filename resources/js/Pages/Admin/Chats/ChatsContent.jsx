import Layout from '@/Layouts/Admin/Layout';
import React, { useEffect, useState } from 'react';
import { AdminSidebar, ChatBox, SectionHeader } from '@/components/Admin/Index';

const ChatsContent = ({ chats, role, activeChat }) => {
  const [messages, setMessages] = useState(activeChat[0]?.messages || []);
  const [isSwitchingChat, setIsSwitchingChat] = useState(false);

  useEffect(() => {
    if (!activeChat[0]) return;

    const echo = window.Echo.private(`chat.${activeChat[0].id}`).listen('MessageSent', (e) => {
      setMessages((prev) => [...prev, e.message]);
    });

    return () => {
      echo.stopListening('MessageSent');
    };
  }, [activeChat[0]]);

  useEffect(() => {
    setMessages(activeChat[0]?.messages || []);
  }, [activeChat[0]?.id]);

  return (
    <Layout>
      <SectionHeader
        title="Supporto chat"
        subtitle="Gestisci conversazioni in tempo reale con utenti e clienti."
      />

      <div className="chat-workspace">
        <div className="row g-0">
          {role === 'admin' && (
            <AdminSidebar chats={chats} activeChatId={activeChat[0]?.id} onSwitchingChange={setIsSwitchingChat} />
          )}
          <ChatBox role={role} activeChat={activeChat} messages={messages} setMessages={setMessages} isSwitchingChat={isSwitchingChat} />
        </div>
      </div>
    </Layout>
  );
};

export default ChatsContent;
