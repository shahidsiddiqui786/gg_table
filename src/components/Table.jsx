import React, { useRef, useState } from 'react';

import { nameList } from './Constants';

const Table = ({data, useTableHeader, handleTableOperation}) => {
    
    const [loader, setLoader] = useState(true);
    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (position) => {
        dragItem.current = position;
    };

    const dragEnter = (position) => {
        dragOverItem.current = position;
    };

    const drop = () => {
        const copyListItems = [...useTableHeader];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        handleTableOperation(copyListItems);
    };


    const tableHeader = useTableHeader.map((item,index) => {
        if(item.p === false) return null;
        return (
            <th 
                onDragStart={() => dragStart(index)}
                onDragEnter={() => dragEnter(index)}
                onDragEnd={drop}
                key={index} 
                draggable
                style={{padding:'1rem',
                fontWeight: '700',
                color: '#52504f'}}
            >
                {nameList.get(item.id)}
            </th>
        );
    });

    const tableBody = data.map((element) => {
        const rowData = useTableHeader.map((header) => {
            if(header.p === false) return null;
            return (
              <td
               style={{
                borderTop: '0.01rem solid #d0d0de',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                textAlign: 'center',
                padding: '0.5rem'
               }}
              >
                {element[header.id]}
              </td> 
            )
        });
        return (<tr>{rowData}</tr>);
    });

    const modifyData = () =>{
        data.map((element) => {
            element.fill_rate = ((element.requests / element.responses)*100);
            element.ctr = ((element.clicks / element.impressions)*100);
            return null;
        })
    };


   return (
    <table style={{width:'80vw', marginTop:'2rem'}}>
        <thead>
            {tableHeader}
        </thead>
        <tbody>
            {modifyData()}
            {tableBody}
        </tbody>
    </table>
   )    
}

export default Table;
