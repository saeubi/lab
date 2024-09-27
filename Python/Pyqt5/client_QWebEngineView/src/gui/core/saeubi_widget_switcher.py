from PyQt5.QtWidgets import QStackedWidget, QWidget, QVBoxLayout

class SaeUBiWidgetSwitcher(QWidget):
    def __init__(self):
        super().__init__()

        # 스택 위젯 생성
        self.stacked_widget = QStackedWidget(self)
        self.widget_map = {}

        # 메인 레이아웃 설정
        main_layout = QVBoxLayout(self)
        main_layout.addWidget(self.stacked_widget)
        self.setLayout(main_layout)

    def add_widget(self, widget_key, widget):
        self.widget_map[widget_key] = widget
        self.stacked_widget.addWidget(widget)

    def show_widget(self, widget_key):
        self.stacked_widget.setCurrentWidget(self.widget_map[widget_key])