import React from "react";

import style from "./RgbaCard.module.css";

const RgbaCard = () => {
  const { alphaContainer, alphaBox } = style;

  return (
    <div className={alphaContainer}>
      <div className={alphaBox}></div>
      <label>Alpha (0)</label>
    </div>
  );
};

export default RgbaCard;
