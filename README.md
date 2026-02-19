<!-- markdownlint-disable MD033 MD041 -->
<div align="center">

# AutoForm Glimpse

A developer tool for automatically filling forms in development environments.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-orange)](package.json)
[![Firefox Extension](https://img.shields.io/badge/Firefox-Extension-red)](https://www.mozilla.org/firefox/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-blue)](https://tailwindcss.com)

</div>

---

## 🚀 Features

- **Automatic Form Filling** - Instantly fill forms with realistic test data
- **Developer-Focused** - Designed specifically for development and testing environments
- **Smart Field Detection** - Automatically detects and categorizes form fields
- **Supports Multiple Input Types**:
  - Text fields
  - Email addresses
  - Numbers
  - Passwords
  - Checkboxes
  - Radio buttons
- **Local Development Ready** - Pre-configured for common localhost ports (3000, 5173, 8080, 4200)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Firefox Browser** - [Download](https://www.mozilla.org/firefox/) (for testing the extension)

---

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/dev-en-m/autoform-glimpse.git
cd autoform-glimpse
```

2. **Install dependencies**

```bash
npm install
```

---

## 🔨 Development

### Running the Extension in Development Mode

Use `web-ext` to run the extension in Firefox with automatic reloading:

```bash
npm run dev
```

This will:
- Build the CSS and JavaScript
- Open Firefox with the extension loaded
- Watch for file changes and reload automatically

### Building for Production

To create a production build:

```bash
npm run build
```

This generates:
- `dist/output.css` - Compiled Tailwind CSS
- `dist/main.js` - Bundled content script

---

## 📖 How to Use

### Method 1: Using web-ext (Recommended for Development)

```bash
npm run dev
```

1. The extension will automatically open in Firefox
2. Navigate to any local development URL (e.g., `http://localhost:3000`)
3. Click the extension icon in the Firefox toolbar
4. Click "Auto Fill" to fill all forms on the page

### Method 2: Manual Installation

1. **Build the extension:**
   ```bash
   npm run build
   ```

2. **Open Firefox and navigate to:**
   ```
   about:debugging#/runtime/this-firefox
   ```

3. **Click "Load Temporary Add-on"**

4. **Navigate to the project folder** and select `manifest.json`

5. **Click "Inspect"** to open the extension's console for debugging

---

## 🔍 Debugging Console Logs

Console logs appear in different locations depending on the script type:

| Script Type | How to Access |
|-------------|---------------|
| **Popup** (`src/popup.js`) | Right-click extension icon → "Inspect Popup" |
| **Content Script** (`src/content.js`) | Page DevTools (F12) → Console tab |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/autoform-glimpse.git
   ```

3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes** and test them:
   ```bash
   npm run dev
   ```

5. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add: Description of your feature"
   ```

6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly before submitting
- Update documentation if your changes affect usage
- Be respectful and constructive in discussions

### Good First Issues

Looking for ways to contribute? Here are some beginner-friendly tasks:

- [ ] Add support for more form field types (date, color, range)
- [ ] Add internationalization (i18n) support
- [ ] Improve field detection algorithms
- [ ] Add unit tests
- [ ] Improve UI/UX of the popup

---

## 📁 Project Structure

```
autoform-glimpse/
├── src/
│   ├── content.js      # Content script (injected into pages)
│   ├── popup.js       # Popup script (extension popup)
│   ├── index.html     # Popup UI
│   ├── style.css      # Tailwind source CSS
│   ├── icons/         # Extension icons
│   └── fonts/         # Custom fonts
├── dist/               # Build output (generated)
├── manifest.json       # Extension manifest (MV3)
├── tailwind.config.js # Tailwind configuration
├── package.json       # NPM dependencies and scripts
└── README.md          # This file
```

---

## 🏗️ Architecture

### Manifest V3

This extension uses [Manifest V3](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json), the latest Firefox extension specification.

### Components

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration and permissions |
| `src/content.js` | Runs in the context of web pages, handles form filling |
| `src/popup.js` | Handles popup UI interactions and messaging |
| `src/index.html` | Popup interface design |

### How It Works

1. User clicks the extension icon → Popup opens
2. Popup script queries the active tab
3. Sends message to content script requesting form data
4. Content script scans page for forms and returns data
5. User clicks "Auto Fill" → Message sent to content script
6. Content script fills all form fields with generated data

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) - For the beautiful UI
- [Faker.js](https://fakerjs.dev/) - For generating realistic test data
- [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) - For development tooling

---

## 🐛 Reporting Issues

Found a bug or have a feature request? Please open an issue:

1. Go to the [Issues](https://github.com/dev-en-m/autoform-glimpse/issues) page
2. Click "New Issue"
3. Fill out the template with detailed information

---

## 📬 Contact

- **GitHub**: [dev-en-m](https://github.com/dev-en-m)
- **Project Link**: [https://github.com/dev-en-m/autoform-glimpse](https://github.com/dev-en-m/autoform-glimpse)

---

<div align="center">

⭐ Star us on GitHub — it helps!

</div>

