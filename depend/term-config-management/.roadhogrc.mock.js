import mockjs from 'mockjs';
// import { getRule, postRule } from './mock/rule';
// import { getActivities, getNotice, getFakeList } from './mock/api';
// import { getFakeChartData } from './mock/chart';
// import { imgMap } from './mock/utils';
// import { getProfileBasicData } from './mock/profile';
// import { getProfileAdvancedData } from './mock/profile';
// import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {

  'POST /api/oauth/login': (req, res) => {
    res.send({
      code: 200,
      data: {
        account: 'admin',
        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0ZW5hbnRJZCI6Ijg3NjcwODA4MjQzNzE5NzgyNCIsInVzZXJJZCI6Ijg3NjcwODA4MjQzNzE5NzgyNyIsImFjY291bnQiOiJhZG1pbiIsImlhdCI6MTUyMTUyNzM2MywianRpIjoiODc2NzA4MDgyNDM3MTk3ODI3Iiwic3ViIjoiYWRtaW4iLCJleHAiOjE1MjE3ODY1NjN9.CkGoMyEMg9T1DTVDot5YV-eghaPXVHsnfS2bLVBzs3ziJJDxzltWZab7kyvUlXREzV6B0jldldIg3LZ5Hkd4dQ'
      }
    });
  },

};

export default noProxy ? {} : delay(proxy, 1000);
