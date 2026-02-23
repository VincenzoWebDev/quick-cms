import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';
import { Messages } from '../Index';
import { MessageCircleX } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputErrors } from '@/components/Front/Index';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ChatBox = React.memo(({ role, activeChat, messages, isSwitchingChat = false }) => {
  const currentChat = activeChat?.[0];
  const MySwal = withReactContent(Swal);
  const { data, setData, post, processing, errors, reset } = useForm({
    content: '',
  });

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!currentChat) return;
    post(route('chats.messages.store', currentChat.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset('content');
      },
    });
  };

  const handleCreateChat = (e) => {
    e.preventDefault();
    router.post(route('chats.store'), {}, {
      onSuccess: () => {
        toast.success('Chat creata con successo');
      },
    });
  };

  const handleCloseChat = (e) => {
    e.preventDefault();
    if (!currentChat) return;

    MySwal.fire({
      title: 'Sei sicuro di voler chiudere la chat?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, chiudi!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(route('chats.close', currentChat.id), {}, {
          onSuccess: () => {
            toast.success('Chat chiusa con successo');
          },
        });
      }
    });
  };

  return (
    <section className={`chat-main-col ${role === 'admin' ? 'col-lg-8 col-xl-9' : 'col-12'}`}>
      {!currentChat && role === 'admin' && (
        <div className="chat-empty-state">
          <i className="fa-regular fa-comments"></i>
          <h5>Seleziona una conversazione</h5>
          <p>Scegli una chat dal pannello sinistro per rispondere alle richieste.</p>
        </div>
      )}

      {!currentChat && role !== 'admin' && (
        <div className="chat-empty-state">
          <i className="fa-regular fa-message"></i>
          <h5>Nessuna conversazione attiva</h5>
          <p>Apri una nuova richiesta di supporto e ricevi assistenza in tempo reale.</p>
          <button onClick={handleCreateChat} className="btn cb-primary mt-2">
            Apri richiesta
          </button>
        </div>
      )}

      {currentChat && (
        <div className="chat-main-card">
          <div className="chat-main-head">
            <div className="chat-main-title">
              <h5>{role === 'admin' ? currentChat.user?.name : 'Supporto Quick CMS'}</h5>
              <small>{currentChat.status === 'open' ? 'Chat aperta' : 'Chat chiusa'}</small>
            </div>
            <div className="chat-main-actions">
              <InputErrors errors={errors} />
              <button
                className="btn btn-danger"
                onClick={handleCloseChat}
                title="Chiudi chat"
                disabled={currentChat.status === 'close'}
              >
                <MessageCircleX size={18} className="me-1" />
                Chiudi
              </button>
            </div>
          </div>

          {isSwitchingChat ? (
            <>
              <div className="chat-messages-area chat-messages-loading">
                <div className="chat-loading-bubble w-75"></div>
                <div className="chat-loading-bubble w-50 align-self-end"></div>
                <div className="chat-loading-bubble w-65"></div>
                <div className="chat-loading-bubble w-40 align-self-end"></div>
                <div className="chat-loading-bubble w-55"></div>
              </div>
              <div className="chat-composer chat-composer-loading">
                <div className="chat-loading-input"></div>
                <div className="chat-loading-btn"></div>
              </div>
            </>
          ) : (
            <>
              <div className="chat-messages-area">
                <Messages messages={messages} activeChat={activeChat} />
                <div ref={messagesEndRef} />
              </div>

              <form className="chat-composer" onSubmit={sendMessage}>
                <input
                  name="message"
                  type="text"
                  className="form-control"
                  placeholder={currentChat.status === 'close' ? 'Chat chiusa' : 'Scrivi un messaggio...'}
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  disabled={currentChat.status === 'close'}
                />
                <button type="submit" className="btn cb-primary" disabled={processing || data.content.trim() === ''}>
                  {processing ? 'Invio...' : 'Invia'}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </section>
  );
});

export default ChatBox;
