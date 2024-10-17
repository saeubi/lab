import xml.etree.ElementTree as ET

# XML 파일 읽기
tree = ET.parse('example.xml')
root = tree.getroot()

# XML 데이터 탐색
for child in root:
    print(child.tag, child.attrib)
    for subchild in child:
        print(subchild.tag, subchild.text)
       

# 루트 요소 생성
root = ET.Element("root")

# 하위 요소 추가
child1 = ET.SubElement(root, "child1")
child1.text = "This is child 1"

child2 = ET.SubElement(root, "child2", attrib={"attribute": "value"})
child2.text = "This is child 2"

# 트리 구조로 변환하고 XML 파일로 저장
tree = ET.ElementTree(root)
tree.write("output.xml", encoding="utf-8", xml_declaration=True)
