import { useEffect, useRef } from 'react';

// TODO: refactor

type ModalProps = React.PropsWithoutRef<Omit<React.HTMLAttributes<HTMLDialogElement>, 'open'>> & {
  isModalOpen: boolean;
  onClose: (e: Event) => void;
};

const Modal = ({ children, onClose, isModalOpen, dataCy = 'modal', ...props }: ModalProps & { dataCy?: string }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  // Hide or show the modal based on the isModalOpen prop
  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  // Block scrolling for the document if the dialog is open
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Make sure we call the closeModal function when the native close event is triggered
  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog === null) return;

    const handleNativeCloseModal = (event: Event) => {
      onClose(event);
    };
    dialog.addEventListener('close', handleNativeCloseModal);
    return () => {
      dialog.removeEventListener('keydown', handleNativeCloseModal);
    };
  }, [onClose]);

  // Add event listener to close the modal when clicking outside of it
  //
  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog === null) return;

    const onClick = (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY && event.clientY <= rect.bottom && rect.left <= event.clientX && event.clientX <= rect.right;

      if (event.target === dialog && !isInside) {
        onClose(event);
      }
    };

    dialog.addEventListener('click', onClick);

    return () => {
      dialog.removeEventListener('click', onClick);
    };
  }, [onClose]);

  return (
    <dialog ref={modalRef} {...props} data-cy={dataCy} className="rounded-2xl">
      {children}
    </dialog>
  );
};

export default Modal;
