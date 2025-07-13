import style from "./App.module.css";

const App = () => {
  const { container, baseBox, rgbContainer, rgbContent, rgbForm } = style;
  const rgbLabel = ["Red", "Green", "Blue"];

  const labelColorMap = {
    Red: "red",
    Green: "green",
    Blue: "blue"
  };
  return (
    <>
      <div className={container}>
        <div className={baseBox}></div>

        <div className={rgbContainer}>
          {rgbLabel.map((label, index) => {
            return (
              <div className={rgbContent} key={index}>
                <label style={{ color: labelColorMap[label] }}>{label}</label>
                <input className={rgbForm} type="number" name={label} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
