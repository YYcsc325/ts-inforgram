import React, { useState, useEffect } from "react";
import styles from "./index.less";
import ReactEcharts from 'echarts-for-react/lib/core'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const DataVisualization = ({ dataList = [], typeNum = 0 }: { dataList: string[]; typeNum?: number }) => {
  let [main, setMain] = useState('')



  const option = {
    title: { text: 'ECharts 入门示例' },
    tooltip: {
      trigger: 'item',
      show: false,
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  }
  useEffect(() => {
    var node = document.getElementById('main')
    setMain(node)
  }, [])
  // 基于准备好的dom，初始化echarts实例
  if (main !== "") {
    var myChart = echarts.init(main);
    console.log('myChart',myChart);
    
    myChart.setOption(option);
  }


  return (
    <div className={styles['dataVisualization']}>
      <div id="main" style={{ width: '500px', height: '500px' }}></div>
      <ReactEcharts
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{
          height: 540,
          width: '100%',
        }}
      // onEvents={this.onclick}
      />
    </div>
  );
};

export default DataVisualization;
