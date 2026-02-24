import { router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

const AdminSidebar = ({ chats, archivedChats = [], activeChatId, onSwitchingChange }) => {
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState(() =>
    archivedChats.some((chat) => Number(chat.id) === Number(activeChatId)) ? 'archived' : 'active'
  );

  const filteredChats = useMemo(() => {
    if (!query.trim()) return chats;
    const normalized = query.toLowerCase().trim();
    return chats.filter((chat) => chat.user.name.toLowerCase().includes(normalized));
  }, [chats, query]);
  const filteredArchivedChats = useMemo(() => {
    if (!query.trim()) return archivedChats;
    const normalized = query.toLowerCase().trim();
    return archivedChats.filter((chat) => chat.user.name.toLowerCase().includes(normalized));
  }, [archivedChats, query]);

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

  useEffect(() => {
    if (archivedChats.some((chat) => Number(chat.id) === Number(activeChatId))) {
      setViewMode('archived');
    }
  }, [activeChatId, archivedChats]);

  const handleHideChat = (chatId, e) => {
    e.stopPropagation();
    e.preventDefault();
    router.post(route('chats.hide', chatId), {}, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const handleRestoreChat = (chatId, e) => {
    e.stopPropagation();
    e.preventDefault();
    router.post(route('chats.restore', chatId), {}, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <aside className="col-lg-4 col-xl-3 chat-sidebar-col">
      <div className="chat-sidebar-card">
        <div className="chat-sidebar-head">
          <h5>Conversazioni</h5>
          <span>{viewMode === 'active' ? chats.length : archivedChats.length}</span>
        </div>

        <div className="chat-sidebar-tabs">
          <button
            type="button"
            className={`chat-sidebar-tab ${viewMode === 'active' ? 'is-active' : ''}`}
            onClick={() => setViewMode('active')}
          >
            Attive
          </button>
          <button
            type="button"
            className={`chat-sidebar-tab ${viewMode === 'archived' ? 'is-active' : ''}`}
            onClick={() => setViewMode('archived')}
          >
            Archivio
          </button>
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
          {viewMode === 'active' && filteredChats.length === 0 && (
            <div className="chat-empty-mini">Nessuna conversazione trovata</div>
          )}
          {viewMode === 'active' && filteredChats.map((chat) => (
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
                <span
                  role="button"
                  tabIndex={0}
                  className="chat-remove-btn"
                  onClick={(e) => handleHideChat(chat.id, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleHideChat(chat.id, e);
                    }
                  }}
                  title="Rimuovi dal pannello"
                >
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
            </button>
          ))}

          {viewMode === 'archived' && filteredArchivedChats.length === 0 && (
            <div className="chat-empty-mini">Nessuna chat archiviata</div>
          )}
          {viewMode === 'archived' && filteredArchivedChats.map((chat) => (
            <button
              type="button"
              key={chat.id}
              onClick={() => handleOpenChat(chat.id)}
              className={`chat-thread-item is-archived ${Number(activeChatId) === Number(chat.id) ? 'is-active' : ''}`}
            >
              <div className="chat-thread-main">
                <strong>{chat.user.name}</strong>
                <small>Archiviata dal pannello admin</small>
              </div>

              <div className="chat-thread-meta">
                <span
                  role="button"
                  tabIndex={0}
                  className="chat-restore-btn"
                  onClick={(e) => handleRestoreChat(chat.id, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleRestoreChat(chat.id, e);
                    }
                  }}
                  title="Ripristina chat"
                >
                  <i className="fa-solid fa-rotate-left"></i>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
