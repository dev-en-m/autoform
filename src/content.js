import { simpleFaker, faker } from "@faker-js/faker";

function textValueGenerater(input) {
  let minLength = parseInt(input.minLength);
  let maxLength = parseInt(input.maxLength);
  let length = maxLength > 0 ? maxLength : minLength > 0 ? minLength : 5;
  return simpleFaker.string.alpha({ length: length, casing: "lower" });
}

function numberValueGenerator(input) {
  const min = input.min !== "" ? parseInt(input.min) : 0;
  const max = input.max !== "" ? parseInt(input.max) : min + 100;
  const step =
    input.step !== "" && input.step !== "any" ? Number(input.step) : 1;

  const steps = Math.floor((max - min) / step);
  const value = min + step * Math.floor(Math.random() * (steps + 1));

  return value;
}

function passwordValueGenerator(passWordFields) {
  const password = faker.internet.password();
  passWordFields.forEach((item) => (item.value = password));
}

// Get form elements safely
function getFormElements() {
  try {
    return document.querySelectorAll("form");
  } catch (e) {
    console.warn("AutoForm: Unable to query forms", e);
    return [];
  }
}

function inject() {
  const formElements = getFormElements();

  // Handle case where no forms exist
  if (!formElements || formElements.length === 0) {
    console.log("AutoForm: No forms found on this page");
    return { success: false, message: "No forms found" };
  }

  formElements.forEach((form) => {
    try {
      const inputFields = form.querySelectorAll("input,textarea,select");
      var passWordFields = [];
      inputFields.forEach((field) => {
        const itemName = field.name;
        const itemType = field.type;
        if (
          itemName.toLowerCase().includes("password") ||
          itemType == "password"
        ) {
          passWordFields.push(field);
        }

        if (itemType == "text" || itemType == "textarea") {
          field.value = textValueGenerater(field);
        }
        if (itemType == "number") {
          field.value = numberValueGenerator(field);
        }
        if (itemType == "email") {
          field.value = faker.internet.email();
        }
        if (itemType == "checkbox") {
          field.checked = true;
        }
        if (itemType == "radio") {
          field.checked = true;
        }
        if (itemType == "url") {
          field.value = faker.internet.url();
        }
      });
      passwordValueGenerator(passWordFields);
    } catch (e) {
      console.error("AutoForm: Error processing form", e);
    }
  });

  return { success: true, message: "Forms filled successfully" };
}

function getPageData() {
  const formElements = getFormElements();

  // Return safe default values if no forms
  if (!formElements || formElements.length === 0) {
    return {
      url: document.URL,
      totalFieldsPerPage: 0,
      totalRadioCheckPerPage: 0,
      inputFields: [],
    };
  }

  const allInputs = [];
  formElements.forEach((form) => {
    try {
      const inputFields = form.querySelectorAll("input,select,textarea");
      inputFields.forEach((input) => {
        allInputs.push({
          name: input.name || "",
          type: input.type || "text",
        });
      });
    } catch (e) {
      console.warn("AutoForm: Error querying inputs", e);
    }
  });

  const totalFieldsPerPage = allInputs.length;
  const totalRadioCheckPerPage = allInputs.filter(
    (i) => i.type === "checkbox" || i.type === "radio",
  ).length;

  return {
    url: document.URL,
    totalFieldsPerPage,
    totalRadioCheckPerPage,
    inputFields: allInputs,
  };
}

// Handle messages from popup
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "AUTO_FILL") {
    const result = inject();
    sendResponse(result);
  } else if (msg.type === "GET_PAGE_DATA") {
    const pageData = getPageData();
    sendResponse(pageData);
  }
  return true; // Required for async sendResponse
});
