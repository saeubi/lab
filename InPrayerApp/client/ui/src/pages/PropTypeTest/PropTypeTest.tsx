import React from "react";

interface Base {
    name: string;
    type: 'text'|'image';
}

interface Text extends Base {
    content: string;
}

interface Image extends Base {
    url: string;
}


function PropTypeTest() {
    const textItem: Text = {
        name: "Sample Text",
        type: "text",
        content: "This is a text item"
    };

    const imageItem: Image = {
        name: "Sample Image",
        type: "image",
        url: "https://example.com/image.jpg"
    };

    return (
        <div>
            <Item {...textItem} /> {/* 텍스트 아이템 */}
            <Item {...imageItem} /> {/* 이미지 아이템 */}
        </div>
    );

}

export default PropTypeTest;




function Item(props: Text | Image) {
    if (isText(props)) {
        return <div style={{padding: "10px"}}>{props.content}</div>;
    }
    else if (isImage(props)) {
        return <img src={props.url} />;
    }    
    else {
        return null;
    }
}



// 타입 가드 함수
function isText(props: Text | Image): props is Text {
    return props.type === 'text'; // props의 type이 'text'일 경우 true를 반환
}

// 타입 가드 함수
function isImage(props: Text | Image): props is Image {
    return props.type === 'image'; // props의 type이 'text'일 경우 true를 반환
}