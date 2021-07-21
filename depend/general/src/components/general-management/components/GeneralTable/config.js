import React from 'react';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import replaceString from '../../utils/replaceString';
import { Tag, Tooltip } from 'antd';
import InputText from './InputText';
import SwitchButton from './SwitchButton';
import { ImageView } from 'kqd-common';

import statusMapConfig from './valueTypeConfig/statusMap';
import colorMapConfig from './valueTypeConfig/colorMap';

/**
 * 输出一个标准的 number，NaN 格式化为 0
 * @param {string|number} v
 */
function formatFloat(v, fixed) {
  if (isNaN(parseFloat(v))) {
    v = 0;
  }
  if (fixed) {
    v = parseFloat(v).toFixed(2);
  }
  return v;
}
/**
 * 调用组件之前检查一下数据，并向控制台抛出警告
 * @param {string} name 组件名
 * @param {object} options 组件可用的配置项
 * @param {object} record 组件的数据源
 */
function cslWarn(name, options, record) {
  if (options.onChangeColValue === undefined) {
    console.warn(`${name} 未能取到 onChangeColValue，无法使用数量编辑功能。请检查组件的调用方式是否正确。`);
  }
  if (record.id === undefined) {
    console.warn(`${name} 未能从数据中找到 id。这可能导致 ${name} 因为 re-render 而失去焦点。受影响的数据：`, record);
  }
}
export const formatValueMap = {
  currency(options = {}, v) {
    v = formatFloat(v);
    const rst = `￥ ${v.toLocaleString('en-US', { useGrouping: true })}`;
    if (options && options.align === 'left') {
      return rst;
    }
    return <span style={{
      textAlign: 'right',
      display: 'inline-block',
      width: '100%'
    }}>{rst}</span>;
  },
  number(options, v) {
    return <span style={{
      textAlign: 'right',
      display: 'inline-block',
      width: '100%'
    }}>{v}</span>;
  },
  sex(options, v) {
    const sexMap = {
      '0': '保密',
      '1': '男',
      '2': '女',
    };
    v = parseInt(v);
    return sexMap[v] || v;
  },
  PCD(options, v) {
    try {
      v = JSON.parse(v);
    }
    catch (e) {
      console.warn('后台返回的 PCD 数据非 JSON 格式：', v);
      v = [v];
    }
    return v.join('-');
  },
  status(options, v) {
    const statusMap = {
      ...statusMapConfig,
      // 额外临时配置
      ...options.statusMap,
    };
    return statusMap[v] || v;
  },
  statusTag(options, v, record, index) {
    const colorMap = {
      ...colorMapConfig,
      // 额外临时配置
      ...options.colorMap,
    };
    return <Tag color={colorMap[v] || 'purple'}>{this.status(options, v)}</Tag>
  },
  editNumber(options, v, record, index) {
    cslWarn('editNumber', options, record);

    const { maxField, coverField = [] } = options;
    let maxValue = undefined;
    if (maxField) {
      const coverList = Array.isArray(coverField) ? coverField : [coverField];
      const coverValue = coverList.reduce((total, field) => {
        return Number(record[field] + total) || 0;
      }, 0);
      maxValue = record[maxField] - (coverValue || 0);
      if (v > maxValue) {
        v = maxValue;
        record[options.dataIndex] = v;
      }
    }

    return (
      <InputText
        type="number"
        key={`${record.id}-${index}`}
        value={v}
        max={maxValue}
        min={options.minValue}
        step={options.step}
        onChange={options.onChangeColValue.bind(null, index, options.dataIndex, record)}
      />
    );
  },
  editQuantity(options, v, record, index) {
    return this.editNumber(options, v, record, index);
  },
  editCurrency(options, v, record, index) {
    if (options.step === undefined) {
      options.step = 0.01;
    }
    return this.editNumber(options, v, record, index);
  },
  /**
   * 在列中计算总价
   */
  totalPrice(options, v, record, index) {
    const [quantity = 'transactionQuantities', price = 'transactionSkuPrice', field] = [options.quantity, options.price, options.field];
    const total = record[quantity] * record[price];
    if (field) {
      record[field] = total;
    }
    return this.currency(null, total);
  },
  /**
   * 对 一组字段 的值进行累加
   */
  accumulate(options, v, record, index) {
    const [fields = []] = [options.fields];
    const total = fields.reduce((total, field) => {
      return total + record[field];
    }, 0);
    return total;
  },
  /**
   * 对 正值与负值 标记不同的颜色
   * 同时使用 + - 标明正负
   */
  profitAndLoss(options, v, record, index) {
    v = formatFloat(v);
    const {
      profitColor = '#f66', lossColor = '#44ac0a',
      profitPrefix = '+ ', lossPrefix = '- ',
      fixed = true,
    } = options;
    if (v > 0) {
      return <span style={{ color: profitColor }}>{`${profitPrefix}${v}`}</span>;
    } else if (v < 0) {
      return <span style={{ color: lossColor }}>{`${lossPrefix}${formatFloat(Math.abs(v), fixed)}`}</span>;
    } else {
      return <span>{v}</span>;
    }
  },
  swtichButton(options, v, record, index) {
    cslWarn('swtichButton', options, record);
    return <SwitchButton
      key={`${record.id}-${index}`}
      value={v}
      {...options}
      onChange={options.onChangeColValue.bind(null, index, options.dataIndex, record)}
    />;
  },
  image(options, v, record, index) {
    try {
      v = JSON.parse(v);
    } catch (error) {
      v = { url: v };
    }
    if (v instanceof Array) {
      v = v[0] || {};
    }
    v = {
      ...v,
      ...options,
    }
    return <ImageView
      data={v}
    />;
  },
  iframe(options, v, record, index) {
    function blankWindos() {
      const { expectedField, urlMap = {}, } = options;
      const replaceMapString = replaceString({}, record);
      const queryData = replaceMapString.format(options.queryData);
      const search = queryString.stringify({
        ...queryData,
      });

      let url = null;
      if (expectedField) {
        url = testUrl(record[expectedField], urlMap);
      } else {
        url = options.url;
      }

      window.open(`${url}?${search.replace(/undefined/g, '')}`, '_blank');
    }
    return <div>
      <a href="javascript:;" onClick={blankWindos}>{v}</a>
    </div>
  },
  path(options, v, record, index) {
    function routerPush() {
      const { path, queryData = {}, } = options;
      const dispatch = window.g_app._store.dispatch;
      const replaceMapString = replaceString({}, record);
      const formatQueryData = replaceMapString.format(queryData);
      dispatch(routerRedux.push({
        pathname: path,
        search: queryString.stringify({
          ...formatQueryData,
        })
      }));
    }
    return <div>
      <a href="javascript:;" onClick={routerPush}>{v}</a>
    </div>
  },
  index(options, v, record, index) {
    return <span>{index + 1}</span>;
  },
  omit(options, v = '', record, index) {
    if (v.length < 5) return v;
    return <Tooltip title={v}>
      <span>{v.slice(0, 4)}...</span>
    </Tooltip>
  },
}


/**
 * 返回第一个检测通过的 value
 *
 * @param {*} field
 * @param {*} urlMap
 * @returns
 */
function testUrl(field, urlMap) {
  let rst = null;
  Object.keys(urlMap).some(regex => {
    if (new RegExp(regex).test(field)) {
      rst = urlMap[regex];
      return true;
    }
    return false;
  });
  return rst;
}