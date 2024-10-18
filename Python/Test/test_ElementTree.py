import os, json
import xml.etree.ElementTree as ET
import xml.dom.minidom


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
        attrib={
            "controllerName": f"{root_path}.controller.{view_name}",
            "xmlns:mvc": "sap.ui.core.mvc",
            "displayBlock": "true",
            "xmlns": "sap.m",
            "xmlns:f": "sap.f",
            "xmlns:core": "sap.ui.core",
            "xmlns:form": "sap.ui.layout.form"
        }
    )

    # page 요소 추가
    page = ET.SubElement(root,
        "f:DynamicPage",
        attrib={
            "toggleHeaderOnTitleClick": "false"            
        }        
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
        
    pretty_xml_str = pretty_xml_str.replace(b"&gt;", b">")        

    # 들여쓰기 된 XML 파일로 저장
    with open(file_path, 'wb') as f:
        f.write(pretty_xml_str)

    print(f"Pretty XML file saved at: {file_path}")


def json_data_to_xml(): 
    received_json_data = '''
        {
            "id": "1",
            "name": "template1",
            "image": "",
            "viewData": {
                "sectionList": ["searchSection", "tableSection", "detail"],
                "searchSection": {
                    "type": "search"
                },
                "tableSection": {
                    "type": "table"
                },
                "detail": {
                    "type": "table"
                }
            }
        }
    '''
    tmp_data = json.loads(received_json_data)
    
    tmp_id = tmp_data["id"]
    tmp_name = tmp_data["id"]
    tmp_image = ""
    view_data = tmp_data["viewData"]
    section_list = view_data["sectionList"]
    
    for section_name in section_list:
        print(section_name) 
        
        
        
def build_xml_from_metadata_and_bindings(view_name:str, template_data:str, binding_data:str):
    template_data = """{
        "id": "1",
        "name": "template1",
        "image": "",
        "viewData": {
            "sectionList": ["searchSection", "tableSection", "detail"],
            "searchSection": {
                "type": "search"
            },
            "tableSection": {
                "type": "table"
            },
            "detail": {
                "type": "table"
            }
        }
    }"""
    binding_data = """{
        "templateData": "",
        "metadataUrl": "",
        "viewName": "",
        "bindingData": {
            "searchSection": [
                {
                    "name": "Name",
                    "title": "Name",
                    "dataType": "Edm.String",
                    "enable": "false",
                    "maxLength": 0,
                    "areaType": "search",
                    "sectionName": "searchSection"
                },
                {
                    "name": "ID",
                    "title": "ID",
                    "dataType": "Edm.Int32",
                    "enable": "false",
                    "maxLength": 0,
                    "areaType": "search",
                    "sectionName": "searchSection"
                },
                {
                    "name": "Price",
                    "title": "Price",
                    "dataType": "Edm.Decimal",
                    "enable": "false",
                    "maxLength": 0,
                    "areaType": "search",
                    "sectionName": "searchSection"
                }
            ],
            "tableSection": [
                {
                    "name": "DiscontinuedDate",
                    "title": "DiscontinuedDate",
                    "dataType": "Edm.DateTime",
                    "enable": "false",
                    "maxLength": 0,
                    "areaType": "table",
                    "sectionName": "tableSection"
                },
                {
                    "name": "Description",
                    "title": "Description",
                    "dataType": "Edm.String",
                    "enable": "false",
                    "maxLength": 0,
                    "areaType": "table",
                    "sectionName": "tableSection"
                }
            ],
            "detail": [
                {
                    "name": "Description",
                    "title": "Description",
                    "dataType": "Edm.String",
                    "enable": "false",
                    "maxLength": 0,
                    "areaType": "table",
                    "sectionName": "detail"
                },
                {
                    "name": "Description",
                    "title": "Description",
                    "dataType": "Edm.String",
                    "enable": "false",
                    "maxLength": 0,
                    "areaType": "table",
                    "sectionName": "detail"
                }
            ]
        }
    }"""

    template_info = json.loads(template_data)
    binding_info = json.loads(binding_data)
    
    # view.xml 파일 생성
    root_path = "com.saeubi"
    view_name = "tmpView"
    
    # 루트 요소 생성
    root = ET.Element(
        "mvc:View",
        attrib={
            "controllerName": f"{root_path}.controller.{view_name}",
            "xmlns:mvc": "sap.ui.core.mvc",
            "displayBlock": "true",
            "xmlns": "sap.m",
            "xmlns:f": "sap.f",
            "xmlns:core": "sap.ui.core",
            "xmlns:form": "sap.ui.layout.form"
        })
    # page 요소 추가
    page = ET.SubElement(root,"f:DynamicPage",attrib={"toggleHeaderOnTitleClick": "false"})
    # content 요소 추가
    content = ET.SubElement(page, "f:content")
    main = ET.SubElement(content, "FlexBox", attrib={"id": "main", "direction": "Column"})
    # 위의 3가지 요소는 기본이라고 생각하면 될 것같다.
    
    model_name = f"{view_name}Model"
    entity_set_name = "Products"
    
    for section_name in template_info["viewData"]["sectionList"]:
        section_element = ET.SubElement(main, "FlexBox", 
                                        attrib={
                                            "name": section_name, 
                                            "direction": "Row",
                                            "justifyContent" : "Center",
                                            "alignItems" : "Center"
                                        })
        section_type = template_info["viewData"][section_name]["type"]        
        if section_type != "table":
            for section_binding_info in binding_info["bindingData"][section_name]:
                label_title = section_binding_info["title"]
                property_name = section_binding_info["name"]
                
                box_element = ET.SubElement(section_element, "FlexBox",
                                            attrib={                                                
                                                "direction": "Row",
                                                "justifyContent" : "Center",
                                                "alignItems" : "Center"
                                            })
                
                label = ET.SubElement(box_element, "Label", attrib={"text": label_title})
                input = ET.SubElement(box_element, "Input", attrib={"type": "Text", "value": f"{{{model_name}>/{property_name}}}"})
                
        # table
        else:
            table = ET.SubElement(section_element, "Table", 
                                  attrib={
                                      "id": f"table_{section_name}",
                                      "growing": "true",
                                      "growingThreshold": "20",
                                      "growingScrollToLoad": "true",
                                      "mode": "MultiSelect",
                                      "width": "auto",
                                      "items": f"{{{model_name}>/{entity_set_name}}}",
                                      "itemPress": "onListItemPress"
                                  })          
            # column title
            thead_tr = ET.SubElement(table, "columns")
            tbody = ET.SubElement(table, "items")
            item_list_box = ET.SubElement(tbody, "ColumnListItem", 
                                          attrib={
                                              "vAlign": "Middle",
                                              "type": "Navigation"
                                          })
            # column data
            item_list = ET.SubElement(item_list_box, "cells")
            
            for section_binding_info in binding_info["bindingData"][section_name]:
                label_title = section_binding_info["title"]
                property_name = section_binding_info["name"]
                
                # th
                th = ET.SubElement(thead_tr, "Column",
                                   attrib={
                                       "width": "auto",
                                       "hAlign": "Center"
                                   })
                
                label = ET.SubElement(th, "Label", attrib={ "text": label_title })
                title_box = ET.SubElement(label, "customData")
                title = ET.SubElement(title_box, "core:CustomData",
                                     attrib={
                                          "key": "property",
                                          "value": property_name
                                      })
                # td
                row_data = ET.SubElement(item_list, "Text", 
                                         attrib={
                                             "text": f"{{{model_name}>{property_name}}}"
                                         })
                
     
        
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, "dst.xml")

    find_declare_and_remove_before_save(root, file_path)
    

if __name__ == "__main__":
    # create_xml()    
    # json_data_to_xml()
    build_xml_from_metadata_and_bindings("1", "1", "1")
    