import SunSvg from "./Sun.svg";
import MoonSvg from "./Moon.svg";

import "./DarkMode.css";

const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };
  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <img  width={"20px"} className=" sun" src={SunSvg} />
        <img width={"20px"} className="moon" src={MoonSvg} />
      </label>
    </div>
  );
};

export default DarkMode;
