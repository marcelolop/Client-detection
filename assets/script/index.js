"use strict";

//utility functions
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
  return parent.querySelector(selector);
}

function selectById(selector, parent = document) {
  return parent.getElementById(selector);
}

function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

function create(element, parent = document) {
  return parent.createElement(element);
}

function print(...args) {
  return console.log(args.join(", "));
}

//*SYSTEM SECTION*/

//system objects

const systemOs = select(".system-OS");
const systemLanguage = select(".system-language");
const currentBrowser = select(".current-browser");
const currentDevice = select(".current-device");

function getOperatingSystemName() {
  const userAgent = window.navigator.userAgent;
  let osName = "Unknown";
  if (userAgent.includes("Win")) {
    osName = "Windows";
  } else if (userAgent.includes("Mac")) {
    osName = "MacOS";
  } else if (userAgent.includes("Linux")) {
    osName = "Linux";
  } else if (userAgent.includes("Android")) {
    osName = "Android";
  } else if (userAgent.includes("like Mac")) {
    osName = "iOS";
  }
  return `Current OS: ${osName}`;
}

function getSystemLanguage() {
  const language = window.navigator.language;
  return `System language: ${language}`;
}

function getBrowserName() {
  const browserMatch = window.navigator.userAgent.match(/(Edg)\/([\d.]+)/);
  if (browserMatch && browserMatch[1] === "Edg") {
    const browserVersion = browserMatch[2];
    return `Current browser: Edge V.${browserVersion}`;
  }
  const otherBrowsersMatch = window.navigator.userAgent.match(
    /(Chrome|Firefox|Safari|OPR)\/([\d.]+)/
  );
  if (otherBrowsersMatch) {
    const browserName = otherBrowsersMatch[1];
    const browserVersion = otherBrowsersMatch[2];
    return `Current browser: ${browserName} V.${browserVersion}`;
  }
  return "Current browser: Unknown";
}

function getCurrentDevice() {
  const userAgent = window.navigator.userAgent;
  const deviceMatch = userAgent.match(/Mobile|Tablet/);
  if (deviceMatch) {
    return `Current device: ${deviceMatch[0]}`;
  } else if (userAgent.includes("Windows") || userAgent.includes("Macintosh")) {
    return "Current device: Desktop";
  } else {
    return "Unknown";
  }
}

// Update the HTML elements with the retrieved information
systemOs.innerText = getOperatingSystemName();
systemLanguage.innerText = getSystemLanguage();
currentBrowser.innerText = getBrowserName();
currentDevice.innerText = getCurrentDevice();

//*END OF SYSTEM SECTION*/

//*WINDOW SECTION*/

//window objects
const windowWidth = select(".page-w");
const windowHeight = select(".page-h");
const pageOrientation = select(".page-orientation");

//window functions
function setWindowDimensions() {
  windowWidth.innerText = `Window width: ${window.innerWidth}px`;
  windowHeight.innerText = `Window height: ${window.innerHeight}px`;
  pageOrientation.innerText = `Orientation: ${getOrientation()}`;
}

function getOrientation() {
  if (window.innerWidth > window.innerHeight) {
    return "Landscape";
  } else {
    return "Portrait";
  } 
}

// window events
onEvent("load", window, () => {
  setWindowDimensions();
});

onEvent("resize", window, () => {
  setWindowDimensions();
});

//*END OF WINDOW SECTION*/

//*BATTERY SECTION*/

//battery objects

const batteryLevel = select(".battery-level");
const batteryStatus = select(".battery-status");

// battery functions
function getBatteryLevel() {
  navigator.getBattery().then((battery) => {
    batteryLevel.innerText = `Battery level: ${battery.level * 100}%`;
  });
}

function getBatteryStatus() {
  navigator
    .getBattery()
    .then((battery) => {
      if (battery.charging) {
        batteryStatus.innerText = "Battery status: charging";
      } else {
        batteryStatus.innerText = "Battery status: not charging";
      }
    })
    .catch(() => {
      batteryStatus.innerText = "Battery status: not available";
    });
}

// battery events
onEvent("load", window, () => {
  if ("getBattery" in navigator) {
    getBatteryLevel();
    getBatteryStatus();
  } else {
    batteryLevel.innerText =
      "Battery level: not available";
    batteryStatus.innerText =
      "Battery status: not available";
  }
});

//*END OF BATTERY SECTION*/

//*NETWORK STATUS SECTION*/
// Button offline/online status
const onlineOfflineBtn = select(".online-offline-btn");

function getNetworkStatus() {
  if (navigator.onLine) {
    onlineOfflineBtn.style.backgroundColor = "#47fd60";
    onlineOfflineBtn.innerText = "Online";
  } else {
    onlineOfflineBtn.style.backgroundColor = "#ff0000";
    onlineOfflineBtn.innerText = "Offline";
  }
}

// Network status events
onEvent("online", window, () => {
  getNetworkStatus();
});

onEvent("offline", window, () => {
  getNetworkStatus();
});

//*END OF NETWORK STATUS SECTION*/