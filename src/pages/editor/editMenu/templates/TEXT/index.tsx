import React from "react";

import ImgBox from "@/pages/editor/components/ImgBox";
import classNames from "classnames";

import styles from "./index.less";

const renderList = [
  {
    customKey: "text1",
    name: "box",
    type: "H1",
    width: 180,
    height: 36,
    data: {
      url: "https://cdn.jifo.co/js/dist/44e7133bff8ab2e162e7051990c05910.jpg",
      text: "Type something",
    },
  },
  {
    customKey: "text2",
    name: "box",
    type: "H1",
    width: 180,
    height: 36,
    data: {
      url: "https://cdn.jifo.co/js/dist/c1cd049fa426e4f3fd087e14e17905df.jpg",
      text: "Write something",
    },
  },
];

const TextTemplate = () => {
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

export default TextTemplate;
