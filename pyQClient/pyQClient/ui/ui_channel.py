from PyQt6.QtCore import QUrl, QObject, pyqtSlot, pyqtSignal
from PyQt6.QtWebChannel import QWebChannel


class UIChannel(QWebChannel):
    def __init__(self):
        super().__init__()
        
        self.channelObject = UIChannelObject()
        self.registerObject("ui_channel", self.channelObject)
        
    def signalConnect(self, func: callable):
        self.channelObject.resultSignal.connect(func)

class UIChannelObject(QObject):
    
    # React로 처리결과를 보내기 위한 시그널(Callback)
    # 시그널은 클래스 레벨에서 선언합니다.
    resultSignal = pyqtSignal(str)
    
    def __init__(self):
        super().__init__()
        self.resultSignal.connect(self.handleResult)
    
    def handleResult(self, result: dict):
        print(f"Result: {result}")
        
    @pyqtSlot(str)
    def sendMessage(self, value: str):
        print(f"Received from React: {value}")
        # 처리 후 React로 값 전달
        self.resultSignal.emit(f"Processed: {value}")

    # React로 Python 데이터를 전달하는 메서드?
    def sendValueToReact(self, value: str):
        print(f"Sending to React: {value}")
        self.resultSignal.emit(value)
        