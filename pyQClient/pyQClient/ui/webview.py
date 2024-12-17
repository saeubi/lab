import sys, os
from PyQt6.QtWidgets import QApplication, QMainWindow
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QDir, QUrl, Qt

class MainWindow(QMainWindow):
    def __init__(self):        
        super().__init__()
        
        self.setWindowTitle("pyQClient")
        self.setGeometry(100, 100, 800, 600)        

        # 윈도우 기본 UI 제거
        # self.setWindowFlags(Qt.WindowType.FramelessWindowHint)
        # self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        
        # QWebEngineView 추가
        self.browser = QWebEngineView()
        # HTML 파일 경로 설정        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        html_path = os.path.join(current_dir, "./tmp.html")
        
        self.browser.setUrl(QUrl.fromLocalFile(html_path))

        self.setCentralWidget(self.browser)        

def run():
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())