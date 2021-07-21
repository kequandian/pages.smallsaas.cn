import React from 'react';
import './ProductItem.css';
import { FlexLayout } from 'kqd-layout-flex';
import { ImageAdaptive, TextEllipsis } from 'kqd-common';

const { FlexItem } = FlexLayout;

const ReportLayout = (props) => {
  const data = props.data;
  return (
    <div className="report-reportLayout" title={data.name}>
      <FlexLayout>
        <FlexItem>
          <ImageAdaptive data={{
            width: '60px',
            height: '60px',
            url: data.cover,
            alt: '商品图片'
          }} />
        </FlexItem>
        <FlexItem flex={1}>
          <div className="report-infoBox">
            <TextEllipsis data={{
              title: data.name,
              row: 2,
            }}
              className={`--ab-listItem-title report-shopIntroduce`}
            />
          </div>
        </FlexItem>
      </FlexLayout>
    </div>
  );
}
export default ReportLayout;