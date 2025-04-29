import { Link } from "@inertiajs/react";

const AdminSidebar = ({ chats }) => (
    <div className="col-md-3 border-end">
        <div className="list-group">
            {chats.length > 0 &&
                chats.map((chat) => (
                    <Link href={route('chats.index', chat.id)} key={chat.id} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center`}>
                        <span>Chat con: {chat.user.name}</span>
                        <span className={`badge bg-${chat.status === 'open' ? 'success' : 'danger'}`}>{chat.status === 'open' ? 'Chat aperta' : 'Chat chiusa'}</span>
                        <span className="badge bg-warning">{chat.unread_messages}</span>
                    </Link>
                ))}
        </div>
    </div>
);

export default AdminSidebar;