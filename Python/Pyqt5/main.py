from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import QUrl
import os

class WebView(QWidget):
    def __init__(self):
        super().__init__()

        # 레이아웃 생성
        layout = QVBoxLayout()
        layout.setContentsMargins(0,0,0,0)
        self.setLayout(layout)

        # QWebEngineView 생성 및 일부 크기 지정
        self.browser = QWebEngineView()
        # self.browser.setFixedSize(400, 300)  # 400x300 크기로 지정

        # 로컬 HTML 파일 경로 설정
        local_html_path = os.path.abspath("test.html")
        self.browser.setUrl(QUrl.fromLocalFile(local_html_path))

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
    import sys

    app = QApplication(sys.argv)

    # MainWindow 생성 및 실행
    window = MainWindow()
    window.show()

    sys.exit(app.exec_())
