import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import { Messages } from "../Index";
import { MessageCircleX } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputErrors } from "@/components/Front/Index";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ChatBox = React.memo(({ role, activeChat, messages }) => {
    const MySwal = withReactContent(Swal);
    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
    });

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Invia un messaggio
    const sendMessage = (e) => {
        e.preventDefault();
        post(route("chats.messages.store", activeChat[0].id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
            },
        });
    };

    const handleCreateChat = (e) => {
        e.preventDefault();
        router.post(route("chats.store"), {}, {
            onSuccess: () => {
                toast.success('Chat creata con successo');
            },
        });
    }
    const handleCloseChat = (e) => {
        e.preventDefault();
        // if (confirm('Sei sicuro di voler chiudere la chat?')) {
        //     router.post(route("chats.close", activeChat[0].id), {}, {
        //         onSuccess: () => {
        //             toast.success('Chat chiusa con successo');
        //         },
        //     });
        // }
        MySwal.fire({
            title: "Sei sicuro di voler chiudere la chat?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, chiudi!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("chats.close", activeChat[0].id), {}, {
                    onSuccess: () => {
                        toast.success('Chat chiusa con successo');
                    },
                });
            }
        })
    }

    return (
        <div className={`col-md-${role === "admin" ? "9" : "12"}`}>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{
                    marginTop: '50px',
                }}
            />
            {activeChat.length > 0 ? (
                <>
                    <div className="border-bottom p-3 mb-3 d-flex align-items-center justify-content-between">
                        <h5 className="m-0">Chat</h5>
                        <InputErrors errors={errors} />
                        <button className="btn btn-danger" onClick={handleCloseChat} title="Chiudi chat" disabled={activeChat[0].status === "close"}>
                            <MessageCircleX />
                        </button>
                    </div>
                    <div className="p-3" style={{ height: "400px", overflowY: "auto", background: "#f8f9fa" }} >
                        <Messages messages={messages} activeChat={activeChat} />
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="input-group p-2 border-top" onSubmit={sendMessage}>
                        <input
                            name="message"
                            type="text"
                            className="form-control"
                            placeholder="Scrivi un messaggio..."
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            disabled={activeChat[0].status === "close"}
                        />
                        <button type="submit" className="btn btn-primary" disabled={processing || data.content.trim() === ""}>
                            {processing ? "Inviando..." : "Invia"}
                        </button>
                    </form>
                </>
            ) : role === "admin" ? (
                <div className="text-center p-5">
                    Seleziona una conversazione per rispondere ad una richiesta di supporto
                </div>
            ) : (
                <div className="text-center p-5">
                    Non hai conversazioni in corso
                    <br />
                    <button onClick={handleCreateChat} className="btn btn-primary mt-3">
                        Apri una richiesta di supporto
                    </button>
                </div>
            )}
        </div >
    )
});

export default ChatBox;