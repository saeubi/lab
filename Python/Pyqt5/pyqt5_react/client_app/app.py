import os, sys, json
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import QUrl, QObject, pyqtSlot
from PyQt5.QtGui import QColor, QPalette

class WebEngineView(QMainWindow):
    def __init__(self):
        super().__init__()

        # QWebEngineView 생성
        self.browser = QWebEngineView()

        # 현재 디렉토리에서 HTML 파일 경로 설정
        current_dir = os.path.dirname(os.path.abspath(__file__))
        print(current_dir)
        file_path = os.path.join(current_dir, "./build/index.html")

        # HTML 파일을 QWebEngineView로 로드
        local_url = QUrl.fromLocalFile(file_path)
        self.browser.setUrl(local_url)

        # 중앙에 QWebEngineView 설정
        self.setCentralWidget(self.browser)

        # 윈도우 크기 설정
        self.resize(800, 600)
        self.setWindowTitle('PyQt5 WebEngineView Example')

if __name__ == '__main__':
    app = QApplication(sys.argv)

    # WebEngineView 객체 생성 및 실행
    window = WebEngineView()
    window.show()

    sys.exit(app.exec_())