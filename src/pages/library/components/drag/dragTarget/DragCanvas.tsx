import React, { Component } from "react";
import { getMaxMin } from "./utils";

const l = 0.5;

class DragCanvas extends Component {
  componentDidMount() {
    let canvasHtml = this.canvasRef;
    this.canvasHtml = canvasHtml;
    this.ctx = canvasHtml.getContext("2d");
  }
  drawLine = () => {};
  render() {
    let { clickId } = this.props;
    let { ctx, canvasHtml } = this;
    let allPosition = { ...(this.props.allPosition || {}) };
    if (ctx) {
      // 正在拖拽的目标元素坐标
      let dragTarget = allPosition[clickId] || {};

      // 所有拖拽元素的坐标, 除去当前拖拽元素
      delete allPosition[clickId];
      let allArray = Object.values(allPosition);

      // 所有x坐标的数值
      let mapX = {};

      // 所有y坐标的数值
      let mapY = {};

      allArray.map((item) => {
        const { left, top, right, bottom, id } = item;

        // 记录所有4个角的坐标，并且记录哪个元素
        mapX[left] ? mapX[left].push(id) : (mapX[left] = [id]);
        mapX[right] ? mapX[right].push(id) : (mapX[right] = [id]);
        mapY[top] ? mapY[top].push(id) : (mapY[top] = [id]);
        mapY[bottom] ? mapY[bottom].push(id) : (mapY[bottom] = [id]);
      });
      // 画四个坐标线
      if (mapX[dragTarget.left]) {
        // 拖拽元素的左边对齐, 画纵线, 取到对齐目标中top跟bottom的值进行比较，取最大最小
        const { min, max } = getMaxMin(
          dragTarget,
          mapX[dragTarget.left],
          allPosition,
          "top",
          "bottom"
        );
        ctx.beginPath();
        ctx.moveTo(dragTarget.left - 1 + l, min - 20 + l);
        ctx.lineTo(dragTarget.left - 1 + l, max + 20 + l);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,0,0,0.5)";
        ctx.stroke();
      } else if (mapX[dragTarget.right]) {
        // 拖拽元素的右边对齐
        const { min, max } = getMaxMin(
          dragTarget,
          mapX[dragTarget.right],
          allPosition,
          "top",
          "bottom"
        );
        ctx.beginPath();
        ctx.moveTo(dragTarget.right + 1 + l, min - 20 + l);
        ctx.lineTo(dragTarget.right + 1 + l, max + 20 + l);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,0,0,0.5)";
        ctx.stroke();
      } else if (mapY[dragTarget.top]) {
        // 拖拽元素的上边对齐
        ctx.beginPath();
        const { min, max } = getMaxMin(
          dragTarget,
          mapY[dragTarget.top],
          allPosition,
          "left",
          "right"
        );
        ctx.beginPath();
        ctx.moveTo(min - 20 + l, dragTarget.top - 1 + l);
        ctx.lineTo(max + 20 + l, dragTarget.top - 1 + l);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,0,0,0.5)";
        ctx.stroke();
      } else if (mapY[dragTarget.bottom]) {
        // 拖拽元素的下面对齐
        const { min, max } = getMaxMin(
          dragTarget,
          mapY[dragTarget.bottom],
          allPosition,
          "left",
          "right"
        );
        ctx.beginPath();
        ctx.moveTo(min - 20 + l, dragTarget.bottom + 1 + l);
        ctx.lineTo(max + 20 + l, dragTarget.bottom + 1 + l);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,0,0,0.5)";
        ctx.stroke();
      } else {
        // 这种清除会保留之前的绘画
        ctx.clearRect(0, 0, canvasHtml.width, canvasHtml.height);
      }
    }
    return (
      <canvas
        id={"myCanvas"}
        ref={(refs) => (this.canvasRef = refs)}
        width={1200}
        height={600}
      ></canvas>
    );
  }
}
export default DragCanvas;
