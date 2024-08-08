const wakeLockLabel = document.getElementById("switch-keep-on-label");

var wakeLock = null;
const toggleWakeLock = async () => {
  if (wakelockSwitch.checked) {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) { // the wake lock request fails - usually system related, such being low on battery
      console.log(`${err.name}, ${err.message}`);
      wakelockSwitch.checked = false;
    }
    wakeLockLabel.classList.toggle("bi-lightbulb-off");
    wakeLockLabel.classList.toggle("bi-lightbulb");
    wakeLock.addEventListener("release", () => {
      wakeLockLabel.classList.toggle("bi-lightbulb-off");
      wakeLockLabel.classList.toggle("bi-lightbulb");
    });
  } else {
    wakeLock.release().then(() => {wakeLock = null;});
  }
}

// Enable button if wakelock is supported
const wakelockContainer = document.getElementById("switch-keep-on-container");
const wakelockSwitch = document.getElementById("switch-keep-on");
if ("wakeLock" in navigator) {
  wakelockContainer.style.visibility = "visible";
  wakelockSwitch.addEventListener('click', toggleWakeLock);
} else {
  wakelockContainer.style.visibility = "hidden";
}
