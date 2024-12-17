import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const initializeQWebChannel = () => {
  let count = 0;
  const maxRetries = 20; // 최대 시도 횟수
  const checkInterval = 100; // 체크 주기(ms)

  const checkQWebChannel = setInterval(() => {
    if (window.QWebChannel && window.qt) {
      clearInterval(checkQWebChannel); // 체크 중지
      new window.QWebChannel(window.qt.webChannelTransport, (channelObject: any) => {
        window.ui_channel = channelObject.objects["ui_channel"];
        console.log("QWebChannel initialized and connected.");
        window.ui_channel.sendMessage("Channel object created");
      });
    } else {
      console.log("Waiting for QWebChannel and qt to load...");
      if (count >= maxRetries) {
        clearInterval(checkQWebChannel); // 최대 시도 횟수 초과 시 체크 중지
        console.error("Failed to initialize QWebChannel.");
      }
      count++;
    }
  }, checkInterval);
};

initializeQWebChannel();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
