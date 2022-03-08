import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

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
  const [dequed, setDequed] = useState(true);

  const notify = (message: string, type: string, dismissTime = 3000) => {
    const notification = {
      message,
      type,
      dismissTime,
    };
    enqueueNotification(notification);
    setDequed(false);
  };

  const enqueueNotification = (notification: Notification) => {
    setNotifications([...notifications, notification]);
  };

  const dequeueNotification = useCallback(() => {
    setNotifications([]);
    setDequed(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!dequed) {
      console.log('등록');
      timer = setTimeout(
        dequeueNotification,
        notifications.length > 0
          ? notifications[notifications.length - 1].dismissTime
          : 3000,
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [notifications, dequeueNotification, dequed]);

  return (
    <NotificationContext.Provider value={{ notifications, notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
