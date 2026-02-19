// Function to create field list element
function createFieldElement(name, type) {
  const li = document.createElement("li");
  li.className =
    "flex items-center justify-between py-1.5 text-xs border-b border-border-dark/50 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded transition-colors";

  const keySpan = document.createElement("span");
  keySpan.className = "font-mono text-text-secondary";
  keySpan.textContent = name || "N/A";

  const valueSpan = document.createElement("span");
  valueSpan.className =
    "px-1.5 py-0.5 bg-white/10 rounded text-text-secondary font-mono text-[10px]";
  valueSpan.textContent = type;

  li.appendChild(keySpan);
  li.appendChild(valueSpan);
  return li;
}

// Function to fetch page data from content script
async function loadPageData() {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tab = tabs[0];

    // Skip special pages
    if (
      !tab.url ||
      tab.url.startsWith("about:") ||
      tab.url.startsWith("chrome:") ||
      tab.url.startsWith("moz-extension:")
    ) {
      updateUI({
        url: "Special page",
        totalFieldsPerPage: 0,
        totalRadioCheckPerPage: 0,
        inputFields: [],
        disable: true,
      });
      return;
    }

    const response = await browser.tabs.sendMessage(tab.id, {
      type: "GET_PAGE_DATA",
    });
    updateUI(response);
  } catch (error) {
    console.error("AutoForm: Error loading page data:", error);
    // Update UI with default values on error
    updateUI({
      url: "Unable to access page",
      totalFieldsPerPage: 0,
      totalRadioCheckPerPage: 0,
      inputFields: [],
      disable: true,
    });
  }
}

// Update the popup UI with page data
function updateUI(data) {
  if (data.disable) {
    const formFillButton = document.getElementById("auto-fill-btn");
    formFillButton.disabled = true;
  }

  const urlPara = document.getElementById("url-paragraph");
  const inputPara = document.getElementById("no-of-input-paragraph");
  const checkPara = document.getElementById("no-of-checkbox-paragraph");
  const detectedPara = document.getElementById("detected-field");
  const fieldList = document.getElementById("input-field-map");

  if (urlPara) {
    urlPara.textContent = data.url;
    urlPara.title = data.url;
  }
  if (inputPara) {
    inputPara.textContent = data.totalFieldsPerPage;
  }
  if (checkPara) {
    checkPara.textContent = data.totalRadioCheckPerPage;
  }
  if (detectedPara) {
    detectedPara.textContent = `Detected Fields (${data.totalFieldsPerPage})`;
  }

  // Populate field list
  if (fieldList) {
    fieldList.innerHTML = "";
    data.inputFields.forEach((field) => {
      fieldList.appendChild(createFieldElement(field.name, field.type));
    });
  }
}

// Handle auto-fill button click
document.getElementById("auto-fill-btn").addEventListener("click", async () => {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const response = await browser.tabs.sendMessage(tabs[0].id, {
      type: "AUTO_FILL",
    });

    if (response && !response.success) {
      alert(response.message || "Failed to fill forms");
    }
  } catch (error) {
    console.error("AutoForm: Error filling forms:", error);
    alert("Unable to fill forms. Make sure you're on a webpage with forms.");
  }
});

// Load page data when popup opens
document.addEventListener("DOMContentLoaded", loadPageData);