import React, { useState } from 'react';
import { Button } from 'antd';
import { update } from 'zero-element/lib/utils/request';

export default (props) => {
  const [loading, setLoading] = useState(false);
  function handleBuildHTML() {
    setLoading(true);
    update('/api/gw/portal/images/replace').then(({ code, message }) => {
      setLoading(false);
    });
  }
  const { children } = props;
  const [Advanced, General, Batch, ListAction] = children;
  return <div>
    {ListAction}
    <Button onClick={handleBuildHTML} loading={loading}>生成 HTML</Button>
  </div>
}