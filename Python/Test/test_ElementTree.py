import os
import xml.etree.ElementTree as ET
import xml.dom.minidom
from collections import OrderedDict


def create_xml():
    # 현재 작업 디렉토리 확인
    script_dir = os.path.dirname(os.path.abspath(__file__))
    print(script_dir)

    # 스크립트의 디렉토리 기준으로 파일 경로 설정
    file_path = os.path.join(script_dir, "src.xml")

    # 파일이 존재하는지 확인
    if os.path.exists(file_path):
        # XML 파일 읽기
        tree = ET.parse(file_path)
        root = tree.getroot()

        # XML 데이터 탐색
        for child in root:
            print(child.tag, child.attrib)
            for subchild in child:
                print(subchild.tag, subchild.text)
        


    # view.xml 파일 생성
    root_path = "com.saeubi"
    view_name = "tmpView"

    # 루트 요소 생성
    root = ET.Element(
        "mvc:View",
        attrib=OrderedDict([
            ("controllerName", f"{root_path}.controller.{view_name}"),
            ("xmlns:mvc", "sap.ui.core.mvc"),
            ("displayBlock", "true"),
            ("xmlns", "sap.m"),
            ("xmlns:f", "sap.f"),
            ("xmlns:core", "sap.ui.core"),
            ("xmlns:form", "sap.ui.layout.form")
        ])
    )

    # page 요소 추가
    page = ET.SubElement(root,
        "f:DynamicPage",
        attrib=OrderedDict([
            ("toggleHeaderOnTitleClick", "false")
        ])
    )

    # 하위 요소 추가
    child1 = ET.SubElement(page, "child1")
    child1.text = "This is child 1"

    child2 = ET.SubElement(page, "child2", attrib={"attribute": "value"})
    child2.text = "This is child 2"

    # 파일 경로 설정
    file_path = os.path.join(script_dir, "dst.xml")

    find_declare_and_remove_before_save(root, file_path)


### 파일생성
## XML 선언이 포함되어있는지 확인 후 제거
def find_declare_and_remove_before_save(root, file_path):
    # XML 문자열로 변환
    xml_str = ET.tostring(root, encoding="utf-8")

    # minidom을 사용해 들여쓰기 적용
    dom = xml.dom.minidom.parseString(xml_str)
    pretty_xml_str = dom.toprettyxml(indent="    ", encoding="utf-8")

    # XML 선언이 포함된지 확인한 후 제거
    if pretty_xml_str.startswith(b'<?xml'):
        pretty_xml_str = pretty_xml_str.split(b'\n', 1)[1]  # 첫 번째 줄을 제거

    # 들여쓰기 된 XML 파일로 저장
    with open(file_path, 'wb') as f:
        f.write(pretty_xml_str)

    print(f"Pretty XML file saved at: {file_path}")


if __name__ == "__main__":
    create_xml()