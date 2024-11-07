import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface AlternativeModalProps {
  open: boolean;
  children: ReactNode;
}

const AlternativeModal = ({ open, children }: AlternativeModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')! as HTMLDialogElement
  );
};

export default AlternativeModal;
