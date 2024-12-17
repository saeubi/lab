import sys, os
from PyQt6.QtWidgets import QApplication, QMainWindow
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QUrl, QDir, Qt
from .ui_channel import UIChannel

# class WebEnginePage(QWebEnginePage):
#     def acceptNavigationRequest(self, url, _type, isMainFrame):
#         print(f"Request URL: {url.toString()}")
#         return super().acceptNavigationRequest(url, _type, isMainFrame)

class WebEngineView(QWebEngineView):
    def __init__(self, parent=None):
        super().__init__(parent)

    def contextMenuEvent(self, event):
        # 우클릭 메뉴를 비활성화 : 이벤트를 무시하여 기본 컨텍스트 메뉴가 나타나지 않도록 함
        event.ignore()

class WebView(QMainWindow):
    def __init__(self):        
        super().__init__()

        # WebEngineView 추가
        self.browser = WebEngineView()
        
        # url catcher // QWebEnginePage모듈 임포트 오류로 주석처리
        # self.page = WebEnginePage()
        # self.browser.setPage(self.page)
        
        # channel
        self.ui_channel = UIChannel()
        self.ui_channel.signalConnect(lambda result: self.browser.page().runJavaScript(f"window.resultSignal('{result}')"))
        self.browser.page().setWebChannel(self.ui_channel)
        
        # HTML 파일 경로 설정        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        html_path = os.path.join(current_dir, "./react_src/build/index.html")
        
        self.browser.setUrl(QUrl.fromLocalFile(html_path))

        self.setCentralWidget(self.browser)    
        
        # 윈도우 설정        
        self.setWindowTitle("pyQClient")
        self.setGeometry(100, 100, 800, 600)        

        # 윈도우 기본 UI 제거
        # self.setWindowFlags(Qt.WindowType.FramelessWindowHint)
        # self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            

def run():
    app = QApplication(sys.argv)
    window = WebView()
    window.show()
    sys.exit(app.exec())