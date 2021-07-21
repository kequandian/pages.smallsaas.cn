import React from 'react';
import Grid from './Grid';
import MS from './MS'

export const Grid_1 = Grid(1);
export const Grid_2 = Grid(2);
export const Grid_3 = Grid(3);
export const Grid_4 = Grid(4);
export const Grid_6 = Grid(6);

export const MS_left = MS;
export const MS_right = (props) => <MS { ...props } master="right" />;