import os
from PyQt5.QtWidgets import QMainWindow, QWidget, QVBoxLayout
from  ...core import SaeUBiWebView, SaeUBiWidgetSwitcher

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # WebView 위젯 생성
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, "main.html")        
        self.web_view = SaeUBiWebView(file_path, "main")

        # 새로운 QWidget을 생성하고 레이아웃을 설정
        #self.central_widget = QWidget(self)
        self.setGeometry(0, 0, 800, 600)
        self.setCentralWidget(self.web_view)


        # 첫 번째 위젯 생성 (빨간색 배경)
        self.testWidget1 = QWidget(self.web_view)
        self.testWidget1.setStyleSheet("background-color: red;")
        self.testWidget1.setGeometry(200, 200, self.width() - 200, self.height() - 200)  # (200, 200)부터 끝까지 차지
        

        # 서브 레이아웃 생성
        self.sub_layout = QVBoxLayout()
        self.sub_layout.setContentsMargins(0, 0, 0, 0)
        self.testWidget1.setLayout(self.sub_layout)

        self.switcher = SaeUBiWidgetSwitcher()
        self.sub_layout.addWidget(self.switcher)

        # WebView 위젯 생성
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, "test1.html")        
        self.test1 = SaeUBiWebView(file_path, "test1")
        self.switcher.add_widget("test", self.test1)
        self.switcher.show_widget("test")

        # Callback 함수 바인딩
        self.web_view.addCallbackFuncForChannelObject(self.testPrint)

    def resizeEvent(self, event):
        # 위젯 크기 조정
        super().resizeEvent(event)  # 기본 리사이즈 이벤트 처리        
        self.testWidget1.setGeometry(200, 200, self.width() - 200, self.height() - 200)

    def testPrint(self):
        print('Test Message')