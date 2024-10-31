import React, { useEffect, useState } from "react";
import { DragElement } from "../components";
import Icon, { IconProps } from "../components/Icon";
import { DropAreaProps } from "../components/DropArea";

// icon


// createIcon 함수
const createIcon = (color: string): React.FC<IconProps> => {
    return function _createIcon(iconProps: IconProps) {
        return (<Icon color={color} {...iconProps} />);
    };
};

// item
export interface ItemProps {
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;

    checkParent?: (flag: boolean) => void;
}

export type ChildProps = DropAreaProps;

export interface ItemReturn {
    Icon: React.FC<IconProps>;
    DrawItem: React.FC<ItemProps & ChildProps>;
}

function createItem(iconColor:string, drawItem:React.FC<ItemProps & ChildProps> ): (() => ItemReturn) {
    const itemInfo = {
        type: 'item',
        props: { /* 필요한 프로퍼티 */ }        
    };

    const Icon = createIcon(iconColor);

    return () => ({
        Icon: Icon,
        DrawItem: drawItem
    });
};

export default createItem;