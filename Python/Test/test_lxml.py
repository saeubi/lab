import os
from lxml import etree
from collections import OrderedDict
#pip install lxml

# 의미없음

def create_xml():
    # 현재 작업 디렉토리 확인
    script_dir = os.path.dirname(os.path.abspath(__file__))
    print(script_dir)

    # view.xml 파일 생성
    root_path = "com.saeubi"
    view_name = "tmpView"

    namespaces = {
        'mvc': 'sap.ui.core.mvc',
        'm': 'sap.m',
        'f': 'sap.f',
        'core': 'sap.ui.core',
        'form': 'sap.ui.layout.form',
    }

    # 루트 요소 생성
    root = etree.Element(
        '{%s}View' % namespaces['mvc'],
        controllerName=f"{root_path}.controller.{view_name}",        
        displayBlock="true",
        nsmap=namespaces
    )

    # page 요소 추가
    page = etree.SubElement(root,
        '{%s}DynamicPage' % namespaces['f'],
        toggleHeaderOnTitleClick="false"        
    )

    # 하위 요소 추가
    child1 = etree.SubElement(page, "child1")
    child1.text = "This is child 1"

    child2 = etree.SubElement(page, "child2", attribute="value")
    child2.text = "This is child 2"    

    # 파일 경로 설정
    file_path = os.path.join(script_dir, "dst.xml")

    find_declare_and_remove_before_save(root, file_path)


### 파일생성
## XML 선언이 포함되어있는지 확인 후 제거
def find_declare_and_remove_before_save(root, file_path):
    # XML 문자열로 변환
    tree = etree.ElementTree(root)
    tree.write(file_path, encoding="utf-8", pretty_print=True, xml_declaration=False)

    # 들여쓰기 된 XML 파일로 저장
    # with open(file_path, 'w', encoding="utf-8") as f:
    #     f.write(xml_str)

    print(f"Pretty XML file saved at: {file_path}")


if __name__ == "__main__":
    create_xml()