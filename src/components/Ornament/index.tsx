import React, { Component } from "react";

/**
 * @name 方法一直接在原型上改，可读性不是很好
 * @param checked
 */
export function ornamenta(checked: boolean) {
  return (WarpComponent: any) => {
    WarpComponent.prototype.getName = () => console.log("ornamenta");
    WarpComponent.prototype.checked = checked;
    WarpComponent.age = "ornamenta";
  };
}
// 使用
@ornamenta(true)
class Ornamenta extends Component {
  static age = "Ornamenta";
  checked = false;
  getName = () => console.log("Ornamenta");
}

/**
 * @name 相比较于上一种方式，这种继承方式更合理
 * @param checked
 */
const ornamentb = (checked: boolean) => (WarpComponent: any) => {
  return class extends WarpComponent {
    static age = "ornamentb";
    checked = checked;
    getName = () => console.log("ornamentb");
  };
};

// 使用
@ornamentb(true)
class Ornamentb extends Component {
  static age = "Ornamentb";
  checked = false;
  getName = () => console.log("Ornamentb");
}

/**
 * @name 这种类装饰器可以进行一次属性注入
 * @param checked
 */

const ornamentc = (checked: boolean) => (WarpComponent: any) => {
  return class extends Component {
    constructor(props: any) {
      super(props);
      this.state = {
        height: 0,
      };
    }
    checked = checked;

    componentDidMount() {
      this.setState({
        height: 100,
      });
    }
    render() {
      const { height } = this.state;
      return (
        <div>
          <WarpComponent height={height} {...this.props} />
        </div>
      );
    }
  };
};

@ornamentc(true)
class Ornamentc extends Component {
  render() {
    const { height } = this.props;
    return <div>{height}</div>;
  }
}
