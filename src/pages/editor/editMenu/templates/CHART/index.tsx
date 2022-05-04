import React from "react";

import ImgBox from "@/pages/editor/components/ImgBox";
import classNames from "classnames";

import styles from "./index.less";

const renderList = [
  {
    customKey: "map1",
    name: "box",
    type: "LineChart",
    width: 300,
    height: 300,
    data: {
      url: "https://cdn.jifo.co/js/dist/d52f1500ee0f63614752457d0b11c11a.jpg",
    },
  },
];

const ChartTemplate = () => {
  return (
    <div>
      {renderList.map((item, index) => (
        <ImgBox
          {...item}
          key={item.customKey}
          className={classNames(styles["mb"], {
            [styles["ml"]]: index / 2 !== 0,
          })}
        ></ImgBox>
      ))}
    </div>
  );
};

export default ChartTemplate;
