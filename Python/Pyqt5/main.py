import os, sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import QUrl, QObject, pyqtSlot

class S_WebEngineView(QWebEngineView):
    def __init__(self):
        super().__init__()
        
        # QWebChannel 생성
        self.channel = QWebChannel()
        self.channel_object = S_WebChannelObject()
        
        # QWebChannel에 객체 등록
        self.channel.registerObject("channelObject", self.channel_object)
        
        # QWebEnginePage에 QWebChannel 설정
        self.page().setWebChannel(self.channel)

class S_WebChannelObject(QObject):
    @pyqtSlot(str)
    def receiveData(self, data):
        print(f"Received on: {data}")  # 메뉴 항목 출력

class WebView(QWidget):
    def __init__(self):
        super().__init__()

        # 레이아웃 생성
        layout = QVBoxLayout()
        layout.setContentsMargins(0,0,0,0)
        self.setLayout(layout)

        # S_WebEngineView 생성
        self.browser = S_WebEngineView()

        # 로컬에 있는 index.html 파일 경로
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, "index.html")
        local_url = QUrl.fromLocalFile(file_path)

        self.browser.setUrl(local_url)
        # QWebEngineView를 레이아웃에 추가
        layout.addWidget(self.browser)       

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # WebView 위젯을 메인 윈도우에 추가
        self.web_view = WebView()
        self.setCentralWidget(self.web_view)

        # 윈도우 크기 설정
        self.setGeometry(0, 0, 800, 600)

if __name__ == '__main__':
    app = QApplication(sys.argv)

    window = MainWindow()
    window.show()

    sys.exit(app.exec_())
