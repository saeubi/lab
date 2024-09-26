import sys, os
from PyQt5.QtCore import pyqtSlot, QObject, QUrl
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWebChannel import QWebChannel

class MyWebEngineView(QWebEngineView):
    def __init__(self):
        super().__init__()
        
        # QWebChannel 생성
        self.channel = QWebChannel()
        self.channel_object = WebChannelObject()
        
        # QWebChannel에 객체 등록
        self.channel.registerObject("channelObject", self.channel_object)
        
        # QWebEnginePage에 QWebChannel 설정
        self.page().setWebChannel(self.channel)

class WebChannelObject(QObject):
    @pyqtSlot(str)
    def receiveData(self, data):
        print("Received data from JS:", data)

class MainWidget(QWidget):
    def __init__(self):
        super().__init__()
        
        # 레이아웃 설정
        layout = QVBoxLayout(self)
        
        # MyWebEngineView 설정
        self.browser = MyWebEngineView()

        # 로컬에 있는 index.html 파일 경로
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, "index.html")
        local_url = QUrl.fromLocalFile(file_path)

        # index.html 파일을 로드
        self.browser.setUrl(local_url)
        
        # 레이아웃에 브라우저 추가
        layout.addWidget(self.browser)
        self.setLayout(layout)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    mainWindow = MainWidget()
    mainWindow.show()
    sys.exit(app.exec_())
