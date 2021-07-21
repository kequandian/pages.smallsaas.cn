import React from 'react';

export default (ChartComponent, count) => {
  return props => {
    // 这里没有把 name 、title 传递下去
    const { name, title,  rates = [], ...rest } = props;
    const series = [];
    const axis = [];
    const nameList = name.split('|');
    for (let index = 0; index < count; index++) {
      series.push({
        name: nameList[index],
        // type: props.name,
        data: [],
      })
    }
    rates.forEach((item, i) => {
      if (i % count === 0) {
        axis.push(item.name);
      }
      series[i % count].data.push(item.value);
    });

    return <ChartComponent {...rest} axis={axis} series={series} />;
  }
}