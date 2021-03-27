import React, { Component, Fragment } from "react";
import { Chart } from "@antv/g2";

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
];

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { id, width, height } = this.props;
    const chart = new Chart({
      container: `c${id}`, // 指定图表容器 ID
      width: width, // 指定图表宽度
      height: height, // 指定图表高度    可以不设置？ 外部容器加宽高自动撑满？
    });
    this.chart = chart;
    chart.data(data);

    // Step 3: 创建图形语法，绘制柱状图
    chart.interval().position("genre*sold");

    // Step 4: 渲染图表
    chart.render();
  }

  // componentWillReceiveProps(nextProps) {

  //     if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
  //         const { width, height } = nextProps;
  //         console.log(this.chart, 'chart')
  //         this.Chart.width = width;
  //         this.chart.height = height;
  //     }

  // }

  render() {
    const { id, width, height } = this.props;
    const styles = {
      padding: "10px",
      // width: `${width - 12}px`,
      // height: `${height - 12}px`
    };
    return <div id={`c${id}`} style={{ ...styles }}></div>;
  }
}

export default LineChart;
