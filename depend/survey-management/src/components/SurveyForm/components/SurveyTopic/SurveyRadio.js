import React from 'react';
import { Radio } from 'antd';
import SelectWrapped from './wrapped/SelectWrapped';
const RadioGroup = Radio.Group;

export default SelectWrapped(RadioGroup,Radio,'单选题');