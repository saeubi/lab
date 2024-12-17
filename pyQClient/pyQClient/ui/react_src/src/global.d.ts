declare global {
  interface Window {
    qt: any;
    QWebChannel: any;

    ui_channel: {
      sendMessage: (message: string) => void;
      onMessage: (callback: (data: string) => void) => void;
    };
    
    resultSignal: (result: string) => void;
  }
}

export {};