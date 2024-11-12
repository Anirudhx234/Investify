import { forwardRef, MouseEventHandler, ReactNode } from "react";

export interface ModalProps {
  title: string;
  children?: ReactNode;
  onExit?: MouseEventHandler<HTMLButtonElement>;
}

export default forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { title, children, onExit },
  ref,
) {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onExit}>close</button>
      </form>
    </dialog>
  );
});
