import React from 'react';

export default {
  header: {
    title: '库存管理'
  },
  operation: {
    action: [
      // { title: '导出', action: 'export' },
      {
        title: '库存盘点', action: 'add',
        options: {
          path: 'checks',
          permission: 'wms.check.add',
          localtion: true,
        }
      },
      // { title: '库存盘点', action: 'import' },
    ],
    fields: [
      {
        field: 'warehouseId', placeholder: '选择仓库', type: 'field-config-select',
        API: '/api/wms/warehouses',
        options: { name: 'warehouseName', value: 'warehouseId' }
      },
      {
        field: 'search',
        placeholder: '商品名称/编号/条码',
        type: 'input',
      },
      // {
      //   field: 'procurementTime',
      //   placeholder: ['开始时间', '结束时间'],
      //   type: 'range',
      //   props: {
      //     style: {
      //       width: '240px'
      //     }
      //   }
      // },
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '仓库', field: 'warehouseName' },
      // { title: '储位', field: 'slotName'},
      { title: '商品名称', field: 'skuName' },
      { title: '商品条码', field: 'skuBarcode' },
      {
        title: '商品编号', field: 'skuCode', valueType: 'path',
        options: {
          path: '/skus',
          queryData: {
            type: 'query',
            id: '{skuId}',
          }
        }
      },
      // { title: '最大库存量', field: 'maxInventory' },
      // { title: '最小库存量', field: 'minInventory' },
      {
        title: '本库存总量', field: 'totalSku', align: 'right', valueType: 'accumulate',
        options: { fields: ['validSku', 'transmitQuantities', 'orderCount'] }
      },
      { title: '可用库存量', field: 'validSku', align: 'right', },
      {
        title: '占用库存量', field: 'orderCount', align: 'right',
        render: (text) => {
          return text === '' ? 0 : text;
        }
      },
      // { title: '预购数量', field: 'advanceQuantities' },
      { title: '在途数量', field: 'transmitQuantities', align: 'right', },
      // { title: '制单人', field: 'transactionBy' }
    ],
    operation: [
      {
        title: '查看', action: 'query', options: {
          queryData: {
            id: '{skuId}',
            warehouseName: '{warehouseName}',
          }
        }
      },
      // { title: '编辑', action: 'edit' },
      // { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      { field: 'warehouseId', type: 'field-config-select', intlPrefix: 'inventories.' },
      { field: 'slotId', type: 'input', intlPrefix: 'inventories.' },
      { field: 'maxInventory', type: 'number', intlPrefix: 'inventories.' },
      { field: 'minInventory', type: 'number', intlPrefix: 'inventories.' },
      { field: 'validSku', type: 'input', intlPrefix: 'inventories.' },
      { field: 'advanceQuantities', type: 'input', intlPrefix: 'inventories.' },
      { field: 'transmitQuantities', type: 'input', intlPrefix: 'inventories.' },
      { field: 'createTime', type: 'date', intlPrefix: 'inventories.', value: new Date(), options: [{ key: 'format', value: 'YYYY-MM-DD HH:mm:ss' }] },
    ],
    colNumber: 2
  },
  details: {
    operation: {
      fields: [
        {
          field: 'transactionCode',
          placeholder: '单号',
          type: 'input',
        },
        {
          field: 'transactionType',
          placeholder: '类型',
          type: 'select',
          options: [
            { key: '采购', value: 'Procurement' },
            { key: '退货', value: 'Refund' },
            { key: '销售入库', value: 'SalesIn' },
            { key: '销售出库', value: 'SalesOut' },
            { key: '调拨出库', value: 'TransferIn' },
            { key: '调拨入库', value: 'TransferOut' },
            { key: '入库', value: 'StorageIn' },
            { key: '出库', value: 'StorageOut' },
            { key: '其他出库', value: 'OthersStorageOut' },
            { key: '其他入库', value: 'OthersStorageIn' },
            { key: '分销商出库', value: 'CustomerStorageOut' },
            { key: '盘点更新', value: 'checkUpdate' },
          ],
        },
        {
          field: 'transactionTime',
          placeholder: ['开始时间', '结束时间'],
          type: 'range',
          format: 'YYYY-MM-DD',
          props: {
            style: {
              width: '240px'
            }
          }
        },
      ],
    },
    table: {
      columns: [
        { title: '仓库名', field: 'warehouseName' },
        { title: '类型', field: 'transactionType', valueType: 'statusTag' },
        {
          title: '单号', field: 'relationCode', valueType: 'iframe',
          options: {
            urlMap: {
              '^SAL': '#/sales',
              '^PUR': '#/procurements',
              '^IN': '#/storagesIn',
              '^OUT': '#/storagesOut',
              '^CHK': '#/checks',
              '^REF': '#/refunds',
              '^TRF': '#/transfers',
            },
            expectedField: 'relationCode',
            queryData: {
              type: 'query',
              tabs: '1',
              id: '{parentId}',
            }
          }
        },
        { title: '操作时间', field: 'transactionTime' },
        { title: '原有数量', field: 'beforeTransactionQuantities', align: 'right' },
        { title: '出库数量', field: 'outQuantities', align: 'right' },
        { title: '入库数量', field: 'inQuantities', align: 'right' },
        { title: '库存余量', field: 'validValue', align: 'right' },
        { title: '单位', field: 'skuUnit' },
        { title: '操作状态', field: 'resultType', render:(text) => {
          const textMap = {
            'Done': '成功',
            'Closed': '失败',
          };
          const colorMap = {
            'Done': '#389e0d',
            'Closed': '#f5222d',
          };
          return <span style={{color: colorMap[text]}}>{textMap[text] || '-'}</span>;
        } },
      ],
    }
  }
}
