import { STORAGE_URL } from "@/constants/constants";
import { ShieldCheck } from "lucide-react";
import React from "react";

const Messages = React.memo(({ messages, activeChat }) => {
    return (
        messages.map((message) => (
            <div
                key={message.id}
                className={`mb-4 d-flex ${message.user_id === activeChat[0].user_id ? "justify-content-start" : "justify-content-end"}`}
            >
                {/* Avatar per i messaggi ricevuti */}
                {message.user_id === activeChat[0].user_id && (
                    <div className="me-2">
                        <img
                            src={STORAGE_URL + message.user.profile_img || "https://via.placeholder.com/40"}
                            alt={message.user.name}
                            className="rounded-circle border border-success"
                            style={{ width: "40px", height: "40px" }}
                        />
                    </div>
                )}

                {/* Nuvoletta del messaggio */}
                <div
                    className={`px-3 py-2 rounded shadow-sm position-relative ${message.user_id === activeChat[0].user_id
                        ? "text-dark text-start"
                        : "bg-primary text-white text-end"
                        }`}
                    style={{ maxWidth: "60%", ...(message.user_id === activeChat[0].user_id && { backgroundColor: '#ddd', maxWidth: "60%" }) }}
                >
                    {/* Ruolo + Nome Utente */}
                    <div className={`d-flex align-items-center ${message.user_id === activeChat[0].user_id ? "justify-content-start" : "justify-content-end"}`}>
                        <h6 className="mb-0 fw-bold">
                            {message.user.role === "admin" ? (
                                <>
                                    <ShieldCheck height={18} width={18} className="me-1" alt="Utente verificato" />
                                    Admin
                                </>
                            ) : (
                                message.user.name
                            )}
                        </h6>
                    </div>

                    {/* Contenuto del Messaggio */}
                    <p className="mb-1" style={{ wordBreak: "break-word" }}>
                        {message.content}
                    </p>
                    <small style={{ fontSize: "12px", ...(message.user.role === "admin" ? { color: "#eee" } : { color: "#777" }) }}>
                        {new Date(message.created_at).toLocaleTimeString("it-IT", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </small>
                </div>

                {/* Avatar per i messaggi inviati */}
                {
                    message.user_id !== activeChat[0].user_id && (
                        <div className="ms-2">
                            <img
                                src={STORAGE_URL + message.user.profile_img || "https://via.placeholder.com/40"}
                                alt={message.user.name}
                                className="rounded-circle border border-danger"
                                style={{ width: "40px", height: "40px" }}
                            />
                        </div>
                    )
                }
            </div >
        ))
    )
})

export default Messages