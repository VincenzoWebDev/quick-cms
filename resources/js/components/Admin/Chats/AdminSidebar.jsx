import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const AdminSidebar = ({ chats, activeChatId, onSwitchingChange }) => {
  const [query, setQuery] = useState('');

  const filteredChats = useMemo(() => {
    if (!query.trim()) return chats;
    const normalized = query.toLowerCase().trim();
    return chats.filter((chat) => chat.user.name.toLowerCase().includes(normalized));
  }, [chats, query]);

  const handleOpenChat = (chatId) => {
    if (Number(activeChatId) === Number(chatId)) return;
    onSwitchingChange?.(true);
    router.get(route('chats.index', chatId), {}, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => onSwitchingChange?.(false),
      onError: () => onSwitchingChange?.(false),
    });
  };

  return (
    <aside className="col-lg-4 col-xl-3 chat-sidebar-col">
      <div className="chat-sidebar-card">
        <div className="chat-sidebar-head">
          <h5>Conversazioni</h5>
          <span>{chats.length}</span>
        </div>

        <div className="chat-sidebar-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            className="form-control"
            placeholder="Cerca utente..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="chat-thread-list">
          {filteredChats.length === 0 && (
            <div className="chat-empty-mini">Nessuna conversazione trovata</div>
          )}

          {filteredChats.map((chat) => (
            <button
              type="button"
              key={chat.id}
              onClick={() => handleOpenChat(chat.id)}
              className={`chat-thread-item ${Number(activeChatId) === Number(chat.id) ? 'is-active' : ''}`}
            >
              <div className="chat-thread-main">
                <strong>{chat.user.name}</strong>
                <small>{chat.status === 'open' ? 'Conversazione attiva' : 'Conversazione chiusa'}</small>
              </div>

              <div className="chat-thread-meta">
                <span className={`chat-status-dot ${chat.status === 'open' ? 'open' : 'closed'}`}></span>
                {chat.unread_messages > 0 && <span className="chat-unread-count">{chat.unread_messages}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
