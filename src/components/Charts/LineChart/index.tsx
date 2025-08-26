"use client";

import React, { useMemo } from "react";
import {
  LineChart as ChartLine,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  LabelList,
  CartesianGrid,
  Tooltip,
} from "recharts";
import useUtils from "../../../utils/useUtils";
import { ILineChartProps } from "./types";

export default function LineChart<T>({
  data,
  lines,
  gradients,
  legend,
  tooltip,
  layout = "horizontal",
  radius = 0,
  lineSize = 0.2,
  margin = {},
  animation = true,
  cartesianGrid,
  x,
  y,
  label,
  limit,
  className,
  style,
}: ILineChartProps<T>) {
  const { numberToRem } = useUtils();

  const linesComponent = useMemo(
    () =>
      lines?.map((line) => (
        <Line
          key={line.key}
          dataKey={line.key}
          type={line?.type || "monotone"}
          strokeWidth={numberToRem(lineSize)}
          dot={false}
          connectNulls
          stroke={
            line.gradient
              ? `url(#line-${line.gradient})`
              : line.color || "#1f2937"
          }
          radius={radius}
          isAnimationActive={animation}
        >
          {label && (
            <LabelList dataKey={line.key} fontFamily="Rubik" {...label} />
          )}
        </Line>
      )),
    [lines, lineSize, animation, label, radius, numberToRem]
  );

  const gradientsComponent = useMemo(
    () =>
      gradients?.map((gradient, index) => (
        <defs key={gradient.id}>
          <linearGradient
            id={`line-${gradient.id || index}`}
            x1={gradient.x1 || "0"}
            x2={gradient.x2 || "0"}
            y1={gradient.y1 || "1"}
            y2={gradient.y2 || "0"}
          >
            <stop
              offset="5%"
              stopColor={gradient.to || "#d1d5db"}
              stopOpacity={0.9}
            />
            <stop
              offset="95%"
              stopColor={gradient.from || "#1f2937"}
              stopOpacity={0.7}
            />
          </linearGradient>
        </defs>
      )),
    [gradients]
  );

  return (
    <div className={`w-full h-full ${className || ""}`} style={style}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartLine data={data} layout={layout} margin={margin}>
          {cartesianGrid && (
            <CartesianGrid {...cartesianGrid} stroke="#f9fafb" />
          )}
          {gradientsComponent}
          {linesComponent}
          <XAxis
            fontSize="0.6rem"
            {...x}
            domain={[0, limit || (x?.dataKey as string)]}
          />
          <YAxis
            fontSize="0.6rem"
            {...y}
            domain={[0, limit || (y?.dataKey as string)]}
          />
          <Tooltip {...tooltip} />
          {!!legend && (
            <Legend
              layout={legend.layout || "horizontal"}
              verticalAlign={legend.verticalAlign || "top"}
              iconSize={legend.iconSize}
              align={legend.align || "right"}
              wrapperStyle={legend.wrapperStyle || {}}
            />
          )}
        </ChartLine>
      </ResponsiveContainer>
    </div>
  );
}
