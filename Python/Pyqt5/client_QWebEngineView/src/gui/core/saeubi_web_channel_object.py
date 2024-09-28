import os, sys, json, inspect
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
    def receiveData(self, data=None):
        if data is not None:
            self.data = data

        for callback in self.receiveCallbackList:
            signature = inspect.signature(callback)
            params = signature.parameters

            # 인수의 개수와 기본값을 확인합니다.
            required_params = [
                p.name for p in params.values()
                if p.default == inspect.Parameter.empty and p.kind in (inspect.Parameter.POSITIONAL_OR_KEYWORD, inspect.Parameter.POSITIONAL_ONLY)
            ]
            
            print(f"{required_params.count()}개")
            
            # 필요한 인수의 수에 따라 분기합니다.
            if len(required_params) == 0:
                print("No arguments required. Calling callback without arguments.")
                callback()
            elif len(required_params) == 2:
                print("Two arguments required. Calling callback with arguments 10 and 20.")
                callback(10, 20)
            else:
                print(f"{len(required_params)} arguments required. Providing default values.")
                # 필요에 따라 기본값을 제공하거나 예외를 발생시킬 수 있습니다.
                callback()

            callback(self.data)

    def getData(self):
        return self.data

    def addReceiveCallBack(self, callbackFunc):
        self.receiveCallbackList.append(callbackFunc)