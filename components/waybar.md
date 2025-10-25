### Component: Waybar
- **Description:** Manages the configuration and styling of the Waybar status bar for Wayland compositors like Hyprland.
- **Keywords:** waybar, bar, status, widget, module, config, style, css, json, clock, battery, pulseaudio, network
- **Configuration Files:**
  - **Primary Config (User Managed):** `~/.config/waybar/config`
  - **Primary Style (User Managed):** `~/.config/waybar/style.css`
  - **Installation Default (Reference, Config):** `~/.local/share/omarchy/config/waybar/config`
  - **Installation Default (Reference, Style):** `~/.local/share/omarchy/config/waybar/style.css`
- **Key Concepts & Syntax:**
  - **Config File Format:** JSON (for `config` file).
  - **Style File Format:** CSS (for `style.css` file).
  - **Modules:** Waybar is composed of various modules (e.g., `clock`, `battery`, `pulseaudio`, `network`). Each module has specific configuration options.
- **Validation (File):**
  - **Config File (JSON):** `jq . {file_path}` (Success if exit code 0).
  - **Style File (CSS - GTK Validation):** `gjs ./validate-gtk-css.js {file_path}`
    - **Purpose:** Validates CSS syntax using GTK's CSS parser via gjs for comprehensive validation.
    - **Success Condition:** Output is "CSS validation: OK" and exit code 0.
- **Information Retrieval Hierarchy:**
  - **Priority 1 (Direct Command Help):** `man waybar` (if available).
  - **Priority 2 (Official Docs):** `https://github.com/Alexays/Waybar/wiki`
  - **Priority 3 (File Introspection):** Examine Omarchy Default config/style files for existing patterns and comments.
- **Standard Procedures:**
  - **Procedure: Change a module setting**
    1. Identify the target module and setting in the `config` file.
    2. Read the user override config file (`~/.config/waybar/config`).
    3. Modify the JSON structure to update the setting.
    4. Pipe the modified content to the JSON validation command (`jq .`) to validate.
  - **Procedure: Change a style setting**
    1. Identify the target CSS selector and property in the `style.css` file.
    2. Read the user override style file (`~/.config/waybar/style.css`).
    3. Modify the CSS to update the setting.
    4. Pipe the modified content to the CSS validation command to validate.
  - **Procedure: Reload configuration**
    - **Command:** `omarchy-restart-waybar` (This command forces Waybar to reload its configuration and style).
