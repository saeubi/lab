import os, sys, json
from PyQt5.QtWidgets import QWidget, QVBoxLayout
from PyQt5.QtCore import QUrl
from .saeubi_web_engine import SeaUBiWebEngineView

class SaeUBiWebView(QWidget):
    def __init__(self, file_path, channel_name, callback=None):
        super().__init__()
        
        # S_WebEngineView 생성
        self.browser = SeaUBiWebEngineView(channel_name)

        local_url = QUrl.fromLocalFile(file_path)
        self.browser.setUrl(local_url)
        self.callback = callback
        self.browser.loadFinished.connect(self.onLoadFinished)
        
        # 레이아웃 생성
        layout = QVBoxLayout()
        layout.setContentsMargins(0,0,0,0)
        self.setLayout(layout)
        # QWebEngineView를 레이아웃에 추가
        layout.addWidget(self.browser)       

    def onLoadFinished(self, result):
        if result:
            if self.callback is not None:
                self.callback()