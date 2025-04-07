import Layout from "@/Layouts/Admin/Layout"
import React, { useEffect, useState } from "react";
import { AdminSidebar, ChatBox } from "@/components/Admin/Index";

const ChatsContent = ({ chats, role, activeChat }) => {
    const [messages, setMessages] = useState(activeChat[0]?.messages || []);
    
    useEffect(() => {
        // Assicurati che activeChat non sia null prima di avviare la connessione
        if (activeChat[0]) {
            const echo = window.Echo.private(`chat.${activeChat[0].id}`)
                .listen("MessageSent", (e) => {
                    setMessages((prev) => [...prev, e.message]);
                });

            // Cleanup per evitare duplicati se la chat cambia
            return () => {
                echo.stopListening('MessageSent');
            };
        }
    }, [activeChat[0]]);

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    {role === "admin" && <AdminSidebar chats={chats} />}
                    <ChatBox role={role} activeChat={activeChat} messages={messages} setMessages={setMessages} />
                </div>
            </div>
        </Layout>
    )
}


export default ChatsContent