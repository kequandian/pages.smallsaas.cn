/**
    * @author Yang,YN
    * @editor
    * @updated
    * @desc
    * @eg
    <TagBadge>
      listNumber = ''   //默认显示4列
      list = []        //数据源
      overflowCount = 999    //默认超出范围显示999+
    </TagBadge>
 */

import React from 'react';
import Badge from 'antd-mobile/lib/badge';
import Grid from 'antd-mobile/lib/grid';
import 'antd-mobile/dist/antd-mobile.css';
import { GridLayout } from 'kqd-layout-flex';

const TagBadge  = ({

  listNumber=4,                  //显示多少列
  list=[],
  overflowCount=999,             //默认超出999显示999+
  style = {                      //默认样式，可传入修改
    display: 'inline-block',
    border: '1px solid #FF8D1A',
    padding: '5px 10px',
    color: '#FF8D1A',
    borderRadius: '5px',
    fontSize: '13px'
  },
  onClick=() => {},

}) => {

  return (
    <div>
      {
        list.length > 0 ?
        <GridLayout listNumber={listNumber}>
          {
            list.map((item,index) => (
              <Badge text={item.badge} overflowCount={overflowCount}  key={index}>
                <span style={style} onClick={() => onClick(item)}>{item.tag}</span>
              </Badge>
            ))
          }
        </GridLayout>
        : null
      }
    </div>
  )
}

export default TagBadge
