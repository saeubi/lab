import os, sys, platform, json, yaml
from PyQt5.QtWidgets import QApplication, QMainWindow, QFileDialog, QMessageBox, QWidget, QVBoxLayout 
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import QUrl, QObject, pyqtSlot, QFile, QIODevice
from PyQt5.QtGui import QColor, QPalette

class WebEngineView(QMainWindow):
    def __init__(self):
        super().__init__()
        
        # 윈도우 크기 설정
        self.resize(800, 600)
        self.setWindowTitle('TDX Framework')

if __name__ == '__main__':
    app = QApplication(sys.argv)

    # WebEngineView 객체 생성 및 실행
    window = WebEngineView()
    window.show()

    sys.exit(app.exec_())