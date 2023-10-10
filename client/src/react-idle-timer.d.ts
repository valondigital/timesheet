declare module 'react-idle-timer' {
  import { Component } from 'react';

  interface IdleTimerProps {
    timeout: number;
    onActive?: () => void;
    onIdle?: () => void;
    onAction?: () => void;
    debounce?: number;
    events?: string[];
    children?: React.ReactNode;
  }

  export default class IdleTimer extends Component<IdleTimerProps> {}
}
