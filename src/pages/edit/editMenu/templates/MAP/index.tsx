import React from "react";

import ImgBox from "@/pages/edit/components/ImgBox";
import classNames from "classnames";

import styles from "./index.less";

const renderList = [
  {
    customKey: "chart1",
    name: "box",
    type: "Img",
    width: 200,
    height: 200,
    data: {
      url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    },
  },
  {
    customKey: "chart2",
    name: "box",
    type: "Img",
    width: 200,
    height: 200,
    data: {
      url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    },
  },
];

const MapTemplate = () => {
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

export default MapTemplate;
