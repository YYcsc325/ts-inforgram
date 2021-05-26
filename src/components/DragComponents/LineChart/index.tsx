import React, { Component } from "react";
import { Chart } from "@antv/g2";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("line-chart", styles);

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
];

interface ILineChartProps {
  id: string;
  width: number;
  height: number;
  left: number;
  top: number;
}

class LineChart extends Component<ILineChartProps> {
  $chart: any;

  componentDidMount() {
    const { id, width = 300, height = 300 } = this.props;
    const chart = new Chart({
      container: `line-chart_${id}`, // 指定图表容器 ID
      width,
      height,
    });
    this.$chart = chart;
    chart.data(data);

    // Step 3: 创建图形语法，绘制柱状图
    chart.interval().position("genre*sold");

    // Step 4: 渲染图表
    chart.render();
  }

  componentDidUpdate(preProps: ILineChartProps) {
    if (
      preProps.width !== this.props.width ||
      preProps.height !== this.props.height
    ) {
      this.$chart.changeSize(this.props.width, this.props.height);
    }
  }

  render() {
    const { id } = this.props;
    return <div id={`line-chart_${id}`} className={prefixCls()}></div>;
  }
}

export default LineChart;
