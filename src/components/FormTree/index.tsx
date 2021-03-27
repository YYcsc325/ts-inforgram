import { Component } from "react";
import { Tree } from "antd";
import styles from "./index.less";

const { TreeNode } = Tree;

const defaultData = [
  {
    title: "互联网",
    key: "1",
    children: [
      {
        title: "购物",
        key: "1-1",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "音乐",
        key: "1-2",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "哈哈哈",
        key: "1-3",
      },
    ],
  },
  {
    title: "游戏",
    key: "2",
    children: [
      { title: "大话", key: "2-1" },
      { title: "梦幻", key: "2-2" },
      { title: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "教育",
    key: "3",
  },
];

function getValue(treeData, checkedKeys, mode) {
  let res = [];
  let realRes = [];
  for (let i = 0; i < treeData.length; i++) {
    const item = treeData[i];
    if (checkedKeys.indexOf(item.key) !== -1) {
      if (item.children && item.children.length > 0 && mode === "children") {
        const [nextRes, nextRealRes] = getValue(
          item.children,
          checkedKeys,
          mode
        );
        res = res.concat(nextRes);
        realRes = realRes.concat(nextRealRes);
      } else {
        res.push(item.key);
        realRes.push({ key: item.key, title: item.title });
      }
    } else if (item.children && item.children.length > 0) {
      const [nextRes, nextRealRes] = getValue(item.children, checkedKeys, mode);
      res = res.concat(nextRes);
      realRes = realRes.concat(nextRealRes);
    }
  }
  return [res, realRes];
}

// 初始化
function initValue(treeData, checkedKeys, mode = "all") {
  if (!checkedKeys) return [];

  let res = [];
  for (let i = 0; i < treeData.length; i++) {
    const item = treeData[i];
    item.children = item.children || [];
    if (checkedKeys === true) {
      res.push(item.key);
      const nextRes = initValue(item.children, true, mode);
      res = res.concat(nextRes);
    } else if (checkedKeys.indexOf(item.key) !== -1) {
      res.push(item.key);
      const nextRes = initValue(item.children, true, mode);
      res = res.concat(nextRes);
    } else {
      const nextRes = initValue(item.children, checkedKeys, mode);
      let flag = true;
      item.children.map((i) => {
        if (nextRes.indexOf(i.key) === -1) {
          flag = false;
        }
      });
      if (flag && nextRes.length > 0) {
        res.push(item.key);
      }
      res = res.concat(nextRes);
    }
  }
  return res;
}
/*
 * mode: all 全选不返回子节点， children， 只返回子节点
 * treeData: [title: '游戏', key: '2', children: []]
 * return resval: [keys], realVal: [{key, title}]
 */
class FormTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedKeys: props.expandedKeys || [],
      autoExpandParent: true,
      selectedKeys: props.selectedKeys || [],
      mode: props.mode || "all",
      treeData: props.treeData || defaultData,
    };
    this.state.checkedKeys = initValue(
      this.state.treeData,
      props.value,
      this.state.mode
    );
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const { onChange, onItemChange } = this.props;
    const { treeData, mode } = this.state;
    const [resval, realVal] = getValue(treeData, changedValue, mode);
    onChange && onChange(resval, realVal);
    onItemChange && onItemChange(resval, realVal);
  };

  onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = (checkedKeys, info) => {
    this.setState({ checkedKeys });
    this.triggerChange(checkedKeys);
    if (this.props.onCheck) {
      this.props.onCheck(checkedKeys, info);
    }
  };

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
    if (this.props.onSelect) {
      this.props.onSelect(selectedKeys, info);
    }
  };

  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    const { treeData } = this.state;
    const { disabled } = this.props;
    return (
      <Tree
        className={styles.treeStyles}
        checkable
        disabled={disabled}
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck.bind(this)}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}
export default FormTree;
