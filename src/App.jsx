import { useState } from "react";
import style from "./App.module.css";

const App = () => {
  const {
    container,
    baseBox,
    rgbContainer,
    rgbContent,
    rgbForm,
    btnContainer,
    buttonLabel,
    alphaContent,
    alphaContainer,
    alphaBox
  } = style;

  const buttons = [
    { id: "random", label: "Random Color" },
    { id: "alpha", label: "Generate Alpha" },
    { id: "reset", label: "Reset Color" }
  ];

  const [red, setRed] = useState("");
  const [green, setGreen] = useState("");
  const [blue, setBlue] = useState("");

  const [appliedRGB, setAppliedRGB] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const inputNumber = (e, setColor) => {
    let val = e.target.value.slice(0, 3);
    if (Number(val) > 255) val = "255";
    setColor(val);
  };

  const handleRandom = () => {
    setRed(Math.floor(Math.random() * 256));
    setGreen(Math.floor(Math.random() * 256));
    setBlue(Math.floor(Math.random() * 256));
    setAppliedRGB(null);
  };

  const handleReset = () => {
    setRed("");
    setGreen("");
    setBlue("");
    setAppliedRGB(null);
  };

  const handleGenerateAlpha = () => {
    if (red !== "" && green !== "" && blue !== "") {
      setAppliedRGB({
        red: Math.min(255, Math.max(0, Number(red))),
        green: Math.min(255, Math.max(0, Number(green))),
        blue: Math.min(255, Math.max(0, Number(blue)))
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && red && green && blue) {
      handleGenerateAlpha();
    }
  };

  const getRGBString = (r, g, b) => `rgb(${r}, ${g}, ${b})`;
  const getRGBAString = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

  const hasAppliedRGB = appliedRGB !== null;

  return (
    <div className={container}>
      <div
        className={baseBox}
        style={{
          backgroundColor: hasAppliedRGB
            ? getRGBString(appliedRGB.red, appliedRGB.green, appliedRGB.blue)
            : "transparent"
        }}
      ></div>

      <div className={rgbContainer}>
        <div className={rgbContent}>
          <label style={{ color: "red" }}>Red</label>
          <input
            className={rgbForm}
            type="number"
            required
            min="0"
            max="255"
            value={red}
            onChange={(e) => inputNumber(e, setRed)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={rgbContent}>
          <label style={{ color: "green" }}>Green</label>
          <input
            className={rgbForm}
            type="number"
            required
            min="0"
            max="255"
            value={green}
            onChange={(e) => inputNumber(e, setGreen)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={rgbContent}>
          <label style={{ color: "blue" }}>Blue</label>
          <input
            className={rgbForm}
            type="number"
            required
            min="0"
            max="255"
            value={blue}
            onChange={(e) => inputNumber(e, setBlue)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className={btnContainer}>
        {buttons.map((btn, index) => (
          <div key={index}>
            <button
              className={`${buttonLabel} ${style[btn.id]}`}
              onClick={
                btn.id === "random"
                  ? handleRandom
                  : btn.id === "reset"
                  ? handleReset
                  : btn.id === "alpha"
                  ? handleGenerateAlpha
                  : null
              }
            >
              {btn.label}
            </button>
          </div>
        ))}
      </div>

      <div className={alphaContent}>
        {Array.from({ length: 9 }).map((_, index) => {
          const alpha = index + 1;
          const alphaValue = `0.${alpha}`;
          const rgbaText = hasAppliedRGB
            ? getRGBAString(
                appliedRGB.red,
                appliedRGB.green,
                appliedRGB.blue,
                alphaValue
              )
            : "";

          const alphaColor = hasAppliedRGB ? rgbaText : "transparent";

          const handleCopy = () => {
            if (!rgbaText) return;
            navigator.clipboard.writeText(rgbaText);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 1000);
          };

          return (
            <div className={alphaContainer} key={alpha} onClick={handleCopy}>
              <div
                className={alphaBox}
                style={{
                  backgroundColor: alphaColor
                }}
              ></div>
              <label style={{ textAlign: "center" }}>
                {copiedIndex === index ? "Copied!" : `Alpha (${alphaValue})`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
