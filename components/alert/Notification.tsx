import React from 'react';

interface NotificationProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ title, message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-red-600 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p>{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-red-700">
          X
        </button>
      </div>
    </div>
  );
};
