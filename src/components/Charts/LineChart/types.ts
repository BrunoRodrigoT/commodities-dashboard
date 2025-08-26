import {
    CartesianGridProps,
    LabelListProps,
    LegendProps,
    TooltipProps,
    XAxisProps,
    YAxisProps,
} from 'recharts';
import { Margin } from 'recharts/types/util/types';
import React, { ReactElement } from 'react';


export interface GradientProps {
    id: string;
    from: string;
    to: string;
    x1?: string;
    x2?: string;
    y1?: string;
    y2?: string;
}

export interface LineProps {
    key: string;
    type?: 'monotone' | 'linear' | 'step' | 'natural' | 'basis';
    color?: string;
    gradient?: string;
    dote?: boolean | ReactElement<SVGElement>;
}

export interface ILineChartProps<T> {
    data: T[];
    lines?: LineProps[];
    layout: 'horizontal' | 'vertical';
    margin?: Margin;
    animation?: boolean;
    cartesianGrid?: CartesianGridProps;
    gradients?: GradientProps[];
    radius?: number;
    lineSize?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    label?: LabelListProps<any>;
    legend?: LegendProps;
    tooltip?: TooltipProps<number, string>;
    x: XAxisProps;
    y: YAxisProps;
    limit?: number;
    className?: string;
    style?: React.CSSProperties;
}
