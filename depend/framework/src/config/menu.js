import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isUrl } from 'kqd-utils/lib/url';

/**
 *     {
       name: 'dashboard',
       icon: 'dashboard',
       path: 'dashboard',
     }
 */
const menuData = [];
/**
 * { icon: "user", name: "个人中心", type: "menu or divider, default menu", onClick: (dispatch) => {} }
 */
const headerMenuData = [];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      name: item.intl ? <FormattedMessage id={item.intl} /> : item.name,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}


export const getMenuData = () => formatter(menuData);

export const addMenu = (...menu) => {
  menuData.push(...menu);
}


export const getHeaderMenuData = () => {
  return headerMenuData.map(item => {
    return {
      ...item,
      name: item.intl ? <FormattedMessage id={item.intl} /> : item.name,
    }
  });
};

export const addHeaderMenu = (...menu) => {
  headerMenuData.push(...menu);
}
