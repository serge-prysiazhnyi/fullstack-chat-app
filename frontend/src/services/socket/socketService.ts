import { io, Socket } from 'socket.io-client';

const SOCKET_URL =
  import.meta.env.VITE_REACT_APP_SOCKET_BASE_URL || 'http://localhost:5000';

export class SocketService {
  private socket: Socket | null = null;

  initSocket(token: string, userId: string) {
    if (!token || !userId) {
      return;
    }

    this.socket = io(SOCKET_URL, {
      auth: { token },
      query: { userId },
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: string, handler: (...args: any[]) => void) {
    this.socket?.on(event, handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export const socketService = new SocketService();
