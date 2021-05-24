import React, { Component, Fragment } from "react";
import { Chart } from "@antv/g2";

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
];

interface ILineChartProps {
  id: string;
}

class LineChart extends Component<ILineChartProps> {
  chart: any;

  componentDidMount() {
    const { id, width, height } = this.props;
    const chart = new Chart({
      container: `chart_${id}`, // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 600, // 指定图表高度    可以不设置？ 外部容器加宽高自动撑满？
    });
    this.chart = chart;
    chart.data(data);

    // Step 3: 创建图形语法，绘制柱状图
    chart.interval().position("genre*sold");
    console.log(chart, "chart");
    // Step 4: 渲染图表
    chart.render();
  }

  render() {
    const { id } = this.props;
    console.log("执行了");
    const styles = {
      padding: "10px",
      width: "inherit",
      height: "inherit",
    };
    return <div id={`chart_${id}`} style={{ ...styles }}></div>;
  }
}

export default LineChart;
