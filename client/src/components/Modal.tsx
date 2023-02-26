import { FC } from 'react';

type Props = {
  header: string;
  body: string;
  onClose: () => void;
};

const Modal: FC<Props> = ({ header, body, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{header}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
