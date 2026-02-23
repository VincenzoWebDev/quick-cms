import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const AdminDialog = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon = 'fa-layer-group',
  children,
  footer,
  width = 560,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="admin-dialog-wrap" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="admin-dialog-fade-enter"
          enterFrom="admin-dialog-fade-enter-from"
          enterTo="admin-dialog-fade-enter-to"
          leave="admin-dialog-fade-leave"
          leaveFrom="admin-dialog-fade-leave-from"
          leaveTo="admin-dialog-fade-leave-to"
        >
          <div className="admin-dialog-backdrop" />
        </Transition.Child>

        <div className="admin-dialog-positioner">
          <Transition.Child
            as={Fragment}
            enter="admin-dialog-panel-enter"
            enterFrom="admin-dialog-panel-enter-from"
            enterTo="admin-dialog-panel-enter-to"
            leave="admin-dialog-panel-leave"
            leaveFrom="admin-dialog-panel-leave-from"
            leaveTo="admin-dialog-panel-leave-to"
          >
            <Dialog.Panel className="admin-dialog-panel" style={{ '--admin-dialog-width': `${width}px` }}>
              <div className="admin-dialog-head">
                <div className="admin-dialog-title-wrap">
                  <span className="admin-dialog-icon">
                    <i className={`fa-solid ${icon}`}></i>
                  </span>
                  <div>
                    <Dialog.Title as="h5">{title}</Dialog.Title>
                    {subtitle && <p>{subtitle}</p>}
                  </div>
                </div>

                <button type="button" className="btn-close" onClick={onClose} aria-label="Chiudi"></button>
              </div>

              <div className="admin-dialog-body">{children}</div>

              {footer && <div className="admin-dialog-foot">{footer}</div>}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AdminDialog;
