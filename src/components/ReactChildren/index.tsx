import React from 'react';

const ReactChild = ({ children, onChange, ...reset }) => {
  function clickKey(key) {
    onChange(key);
  }
  return (
    <div {...reset}>
      <div>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onClick: () => {
              clickKey(child.props);
            },
          }),
        )}
      </div>
    </div>
  );
};
ReactChild.displayName = 'ReactChild';

const Comtab = ({ children, onChange, label, ...reset }) => {
  return (
    <div {...reset}>
      <span>label: {label}</span>
      {React.cloneElement(children, {
        onClick: () => {
          onChange({ ...children.props });
        },
      })}
    </div>
  );
};
// displayName 给组件标注名称，容易定位问题
Comtab.displayName = 'Comtab';

ReactChild.CustomTab = Comtab;
export default ReactChild;