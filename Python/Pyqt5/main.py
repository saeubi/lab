import os, sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import QUrl, QObject, pyqtSlot

class WebChannelObject(QObject):
    @pyqtSlot(str)
    def receiveData(self, data):
        print("Received data from JS:", data)

class MyWebEngineView(QWebEngineView):
    def __init__(self):
        super().__init__()
        # QWebChannel 설정
        self.page().webChannel = QWebChannel()
        self.channel_object = WebChannelObject()
        self.page().webChannel.registerObject("channelObject", self.channel_object)
        self.page().setWebChannel(self.page().webChannel)

class WebView(QWidget):
    def __init__(self):
        super().__init__()

        # 레이아웃 생성
        layout = QVBoxLayout()
        layout.setContentsMargins(0,0,0,0)
        self.setLayout(layout)

        # QWebEngineView 생성 및 일부 크기 지정
        self.browser = QWebEngineView()
        #self.browser.loadFinished.connect(self.on_load_finished)

        # 로컬 HTML 파일 경로 설정
        local_html_path = os.path.abspath("index.html")
        self.browser.setUrl(QUrl.fromLocalFile(local_html_path))
        
        # 페이지 로드 완료 시 on_load_finished 메소드가 호출됨
        
        # QWebEngineView를 레이아웃에 추가
        layout.addWidget(self.browser)
        
        # QWebChannel 초기화
        self.backend = WebChannelObject()
        #self.browser.page().runJavaScript("new QWebChannel(qt.webChannelTransport, function(channel) { channel.pyObj = backend; });")
        
    # def on_load_finished(self, result):
    #     if result:
    #         # qwebchannel.js 스크립트를 동적으로 추가
            
    #             # var script = document.createElement('script');
    #             # script.src = "qwebchannel.js";
    #             # document.head.appendChild(script);
    #             # console.log('qwebchannel.js loaded');            
    #         self.browser.page().runJavaScript("""                
    #             var script = document.createElement('script');
    #             script.src = "qwebchannel.js";  // qwebchannel.js를 로드
    #             script.onload = function() {
    #                 new QWebChannel(qt.webChannelTransport, function(channel) {
    #                     window.pyObj = channel.pyObj;  // Python 객체에 접근
                        
    #                     // 메뉴 항목 클릭 이벤트 설정
    #                     const menuItems = document.querySelectorAll(".side-menu");
    #                     menuItems.forEach(item => {
    #                         item.addEventListener("click", function() {
    #                             const menuItem = item.innerHTML; // 클릭한 항목의 텍스트
    #                             item.innerHTML = "변경됨"; // 항목의 텍스트 변경
    #                             console.log("Item clicked and text changed");
    #                             window.pyObj.menuClicked(menuItem); // Python 메서드 호출
    #                         });
    #                     });
    #                 });
    #             };
    #             document.head.appendChild(script);
    #         """)            

    #         self.browser.page().runJavaScript("""
    #             const menuItems = document.querySelectorAll(".side-menu");
    #             console.log("menuItems: ", menuItems.length); // 메뉴 항목이 제대로 로드되었는지 확인
    #             menuItems.forEach(item => {
    #                 item.addEventListener("click", function() {
    #                     item.innerHTML = "변경됨";
    #                     console.log("Item clicked and text changed");
    #                     window.pyObj.menuClicked(menuItem);
    #                 });
    #             });
    #         """)
    #         print("load finished")
            
        
        
        

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
