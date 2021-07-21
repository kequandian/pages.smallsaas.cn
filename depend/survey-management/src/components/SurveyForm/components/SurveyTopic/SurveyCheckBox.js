import React from 'react';
import { Checkbox } from 'antd';
import SelectWrapped from './wrapped/SelectWrapped';
const CheckboxGroup = Checkbox.Group;

export default SelectWrapped(CheckboxGroup,Checkbox,'多选题');