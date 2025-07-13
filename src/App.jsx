import style from "./App.module.css";

const App = () => {
  const {
    container,
    baseBox,
    rgbContainer,
    rgbContent,
    rgbForm,
    btnContainer,
    buttonLabel
  } = style;

  const rgbLabels = [
    { label: "Red", color: "red" },
    { label: "Green", color: "green" },
    { label: "Blue", color: "blue" }
  ];

  const buttons = [
    { id: "random", label: "Random Color" },
    { id: "alpha", label: "Generate Alpha" },
    { id: "reset", label: "Reset Color" }
  ];

  const inputNumber = (e) => {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
  };

  return (
    <div className={container}>
      <div className={baseBox}></div>

      <div className={rgbContainer}>
        {rgbLabels.map((item, index) => (
          <div className={rgbContent} key={index}>
            <label style={{ color: item.color }}>{item.label}</label>
            <input
              className={rgbForm}
              type="number"
              name={item.label}
              min="0"
              max="999"
              onInput={inputNumber}
            />
          </div>
        ))}
      </div>

      <div className={btnContainer}>
        {buttons.map((btn, index) => (
          <div key={index}>
            <button className={`${buttonLabel} ${style[btn.id]}`}>
              {btn.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
