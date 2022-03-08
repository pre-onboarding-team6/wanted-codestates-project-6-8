import { createContext, ReactNode, useState } from 'react';

export interface Notification {
  type: string;
  message: string;
  dismissTime: number;
}

const defaultApi = {
  notifications: [] as Notification[],
  notify: (message: string, type: string, dismissTime?: number) => {},
};

export const NotificationContext = createContext(defaultApi);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string, type: string, dismissTime = 3000) => {
    const notification = {
      message,
      type,
      dismissTime,
    };
    enqueueNotification(notification);
    setTimeout(() => {
      dequeueNotification();
    }, dismissTime);
  };

  const enqueueNotification = (notification: Notification) => {
    setNotifications([...notifications, notification]);
  };

  const dequeueNotification = () => {
    setNotifications(notifications.slice(1));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications: notifications, notify: notify }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
