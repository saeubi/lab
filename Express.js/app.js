const express = require('express'); // Express 모듈을 불러옵니다.
const app = express(); // Express 애플리케이션 인스턴스를 생성합니다.
const port = 3000; // 서버가 수신 대기할 포트를 설정합니다.

// 기본 경로('/')에 대한 GET 요청을 처리합니다.
app.get('/', (req, res) => {
  res.send('Hello World!'); // 클라이언트에게 'Hello World!' 응답을 보냅니다.
});

// 서버를 지정된 포트에서 실행합니다.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // 서버 실행 메시지를 콘솔에 출력합니다.
});