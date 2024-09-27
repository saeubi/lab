import os, sys, json
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import QUrl, QObject, pyqtSlot
from .saeubi_web_channel_object import SaeUBiWebChannelObject

class SeaUBiWebEngineView(QWebEngineView):
    def __init__(self, name):
        super().__init__()
        
        # QWebChannel 생성
        self.channel = QWebChannel()
        self.channel_object = SaeUBiWebChannelObject()
        
        # QWebChannel에 객체 등록
        self.channel.registerObject(name, self.channel_object)
        
        # QWebEnginePage에 QWebChannel 설정
        self.page().setWebChannel(self.channel)