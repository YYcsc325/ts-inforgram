import React, { FC, useRef, useState, useEffect } from "react";
import classNames from "classnames";

import styles from "./index.less";

interface IStepsProps {
  current: number;
}

interface IStepProps {
  readonly index?: number;
  readonly current?: number;
  readonly grow?: number;
  title: React.ReactNode;
}

const Steps: FC<IStepsProps> & {
  Step: FC<IStepProps>;
} = ({ children, current }) => {
  const childList = React.Children.toArray(children);
  return (
    <div className={styles.steps}>
      {childList.map((child: any, index: number) => {
        const targetIndex = index + 1;
        return React.cloneElement(child, {
          index: targetIndex,
          current,
          grow: childList.length === targetIndex ? 0 : 1,
        });
      })}
    </div>
  );
};

const Step: FC<IStepProps> = ({ index, title, current, grow }) => {
  const stepRef: any = useRef(null);
  const [computedWidth, setComputedWidth] = useState(0);

  useEffect(() => {
    const firstChildNode = stepRef.current.childNodes?.[0];
    const data = getComputedStyle(firstChildNode);
    const width = data.width.replace(/px/g, "");
    setComputedWidth(parseInt(width));
  }, []);

  return (
    <div className={styles.step} style={{ flexGrow: grow }} ref={stepRef}>
      <div className={styles["step-warp"]}>
        <span
          className={classNames(styles["step-index"], {
            [styles["step-active"]]: current === index,
          })}
        >
          {index}
        </span>
        <span className={styles["step-title"]}>{title}</span>
      </div>
      {Boolean(grow) && (
        <div
          className={styles["step-line"]}
          style={{
            width: `calc(100% - ${computedWidth + 20}px)`,
            left: `${computedWidth + 10}px`,
          }}
        />
      )}
    </div>
  );
};

Steps.displayName = "Steps";
Step.displayName = "Step";

Steps.Step = Step;

export default Steps;
