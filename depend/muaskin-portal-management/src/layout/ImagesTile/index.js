import React, { useState } from 'react';
import { Icon, Modal, Tooltip } from 'antd';
import './index.css';

export default (props) => {
  const { data, onModal } = props;
  const { name, url } = data;
  const [visible, setVisible] = useState(false);
  function handleSwitchVisible() {
    setVisible(!visible);
  }
  function handleSwitchEdit() {
    onModal({
      options: {
        modalTitle: '图片编辑',
        items: [
          {
            layout: 'DefaultForm',
            component: 'BaseForm',
            config: {
              API: {
                getAPI: `/api/gw/portal/images/${data.id}`,
                updateAPI: `/api/gw/portal/images/${data.id}`,
              },
              fields: [
                {
                  field: 'name',
                  label: '名称',
                  type: 'plain',
                },
                {
                  field: 'url',
                  label: '图片',
                  type: 'upload-image',
                  options: {
                    max: 1,
                    // API: '/api/gw/portal/uploadImages',
                    API: '/api/upload/files',
                    data: {
                      id: 'id',
                    }
                  }
                },
              ],
            },
          }
        ]
      }
    });
  }

  return <div className="imagesTile">
    <div className="image">
      <img src={url} alt={name} />
      <div className="mark">
        <div className="operation">
          <Icon type="eye" onClick={handleSwitchVisible} />
          <Icon type="edit" onClick={handleSwitchEdit} />
        </div>
      </div>
    </div>
    <div className="name">
      <Tooltip title={name}>{name}</Tooltip>
    </div>
    <Modal
      footer={null}
      visible={visible}
      onCancel={handleSwitchVisible}>
      <div style={{textAlign: 'center'}}>
        <img src={url} alt={name} className="modal-image" />
      </div>
    </Modal>
  </div>;
}