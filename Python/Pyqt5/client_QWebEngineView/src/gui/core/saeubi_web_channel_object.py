import os, sys, json
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import QUrl, QObject, pyqtSlot

class SaeUBiWebChannelObject(QObject):    
    def __init__(self):
        super().__init__()
        self.data = ""
        self.receiveCallbackList = []
            
    @pyqtSlot(result=str)
    def sendData(self):
        return self.data            
            
    @pyqtSlot(str)
    def receiveData(self, data):
        self.data = data
        for callback in self.receiveCallbackList:
            callback()

    def addReceiveCallBack(self, callbackFunc):
        self.receiveCallbackList.append(callbackFunc)