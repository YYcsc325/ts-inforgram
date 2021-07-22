import React, { Component } from "react";

interface IDragItemProps {
  name: string;
  _setValue?: (params: any) => void;
}

export default class DragItem extends Component<IDragItemProps> {
  render() {
    const { name, children, _setValue } = this.props;

    const child: any = React.Children.only(children);

    return (
      <div data-name={name}>
        {React.cloneElement(child, {
          onChange: (e: any) => {
            let targetValue = e;
            if (e?.type) {
              targetValue = e.target.value || e.currentTarget.value;
            }
            child.props.onChange?.(targetValue);
            _setValue?.(targetValue);
          },
        })}
      </div>
    );
  }
}
