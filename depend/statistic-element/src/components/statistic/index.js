import StatisticWrapped from './Statistic';

// import NumberRows from '../numberRows/NumberRows';
// import ColumnTotal from '../columnTotal/ColumnTotal';
import ColumnChain from './components/ColumnChain';
// import Pie from '../general-chart/Pie';
import Bar from '../general-chart/Bar';
import Line from '../general-chart/Line';

import Num from './components/Num';
import GroupCard from './components/GroupCard';
import Table from './components/Table';
import Br from './components/Br';

import timeline from './wrapped/timeline';
import group from './wrapped/group';

export default StatisticWrapped({
  // NumberRows,
  // ColumnTotal,
  ColumnChain,
  // Pie,
  Bar,
  BarTimeline: timeline(Bar),
  BarGroup_2: group(Bar,2),
  BarGroup_3: group(Bar,3),
  BarGroup_4: group(Bar,4),

  Line,
  LineTimeline: timeline(Line,{
    levelDisplay: false,
    echart: {
      series: {
        smooth: true,
      }
    }
  }),
  LineGroup_2: group(Line,2),
  LineGroup_3: group(Line,3),
  LineGroup_4: group(Line,4),

  Num,
  GroupCard,
  GroupCardTimeline: timeline(GroupCard),
  Table,
  Br,
})
