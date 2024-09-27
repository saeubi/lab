import os
from PyQt5.QtWidgets import QMainWindow, QWidget
from  ...core.saeubi_web_view import SaeUBiWebView

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # WebView 위젯을 메인 윈도우에 추가
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, "main.html")
        
        self.web_view = SaeUBiWebView(file_path, "main")
        self.setCentralWidget(self.web_view)

        # 윈도우 크기 설정
        self.setGeometry(0, 0, 800, 600)

        # Callback 함수 바인딩
        self.web_view.addCallbackFuncForChannelObject(self.testPrint)

    def testPrint(self):
        print('Test Message')