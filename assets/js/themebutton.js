function claculateSettingAsThemeString({localStorageTheme, systemSettingDark}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }
  if (systemSettingDark.matches) {
    return "dark";
  }
  return "light";
};
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
let currentThemeSetting = claculateSettingAsThemeString({localStorageTheme, systemSettingDark});
document.querySelector("html").dataset.theme = currentThemeSetting;
const themeToggleIconUse = document.getElementById('theme-toggle-icon-use');
const setThemeIcon = (theme) => {
  themeToggleIconUse.setAttribute('href', theme === 'dark' ? '#theme-lightbulb-off' : '#theme-lightbulb');
};
setThemeIcon(currentThemeSetting);
const themeToggle = document.querySelector("[data-theme-toggle]");
themeToggle.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  document.querySelector("html").dataset.theme = newTheme;
  currentThemeSetting = newTheme;
  localStorage.setItem("theme", newTheme);
  setThemeIcon(newTheme);
});
