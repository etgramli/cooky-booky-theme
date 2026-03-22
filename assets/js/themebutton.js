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
if (currentThemeSetting === "dark") {
  document.getElementById('theme-toggle-icon').classList.add('bi-lightbulb-off');
  document.getElementById('theme-toggle-icon').classList.remove('bi-lightbulb');
}
const themeToggle = document.querySelector("[data-theme-toggle]");
themeToggle.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  document.querySelector("html").dataset.theme = newTheme;
  currentThemeSetting = newTheme;
  localStorage.setItem("theme", newTheme);
  document.getElementById('theme-toggle-icon').classList.toggle('bi-lightbulb');
  document.getElementById('theme-toggle-icon').classList.toggle('bi-lightbulb-off');
});
