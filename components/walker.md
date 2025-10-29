### Component: Walker
- **Description:** Manages Walker, a fast, multi-purpose Wayland application launcher built with GTK4 and Rust. Walker provides prefix-based search for launching applications, browsing files, performing calculations, accessing emoji/symbols, clipboard history, web search, and more. It runs as a service and communicates with the Elephant backend for data providers.
- **Keywords:** walker, launcher, application, search, dmenu, prefix, emoji, calculator, files, clipboard, websearch, runner, elephant, provider
- **Configuration Files:**
  - **Primary Config (User Managed):** `~/.config/walker/config.toml`
  - **Theme Directory (User Managed):** `~/.config/walker/themes/`
  - **Installation Default (Reference, Config):** `~/.local/share/omarchy/config/walker/config.toml`
  - **Installation Default (Reference, Themes):** `~/.local/share/omarchy/default/walker/themes/`
  - **Backend Config:** `~/.config/elephant/elephant.toml` (for Elephant backend service)
- **Key Concepts & Syntax:**
  - **Config File Format:** TOML (for `config.toml` file).
  - **Theme Format:** TOML for layout (theme.toml) + GTK4 CSS for styling (style.css).
  - **Architecture:** Walker (frontend) + Elephant (backend service providing data providers).
  - **Prefixes:** Special characters that activate different search modes:
    - `.` - Files and folders (home directory search)
    - `:` - Emoji/Symbols
    - `=` - Calculator
    - `$` - Clipboard History
    - `>` - Command runner
    - `/` - File browser
    - `@` - Web search
    - `;` - Provider switcher
  - **Providers:** Modular plugins that provide different functionalities (applications, files, calculator, etc.). Managed by Elephant backend.
  - **Service Mode:** Walker runs as `--gapplication-service` for persistent background operation with socket-based activation.
- **Validation (File):**
  - **Config File (TOML):**
    - **Command:** `taplo check {file_path}` (if taplo is installed)
    - **Success Condition:** Exit code 0, no syntax errors reported.
  - **Runtime Validation:** `walker --debug` (runs Walker in debug mode to check for configuration errors)
- **Validation (Semantic):**
  - **Theme Exists:** Verify that the theme specified in `config.toml` exists in theme_location paths before applying.
  - **Providers Installed:** `elephant providers list` to verify required providers are installed.
  - **Backend Running:** `systemctl --user status elephant.service` to ensure Elephant backend is active.
- **Information Retrieval Hierarchy:**
  - **Priority 1 (Live Introspection):** Use `elephant providers list` to check available providers.
  - **Priority 2 (System Status):** Check service status with `systemctl --user status walker.service` and `systemctl --user status elephant.service`.
  - **Priority 3 (Debug Mode):** Run `walker --debug` to see configuration loading and errors.
  - **Priority 4 (File Introspection):** Examine Omarchy Default config file for existing patterns and comments.
  - **Priority 5 (Official Docs):** `https://benz.gitbook.io/walker/` or `https://github.com/abenz1267/walker`
- **Standard Procedures:**
  - **Procedure: Change a configuration setting**
    1. Read the user config file (`~/.config/walker/config.toml`).
    2. Identify the section and setting to modify (e.g., `[list]`, `max_entries`).
    3. Modify the TOML structure to update the setting.
    4. Validate the TOML syntax using the validation command.
    5. If validation succeeds, restart Walker to apply changes.
  - **Procedure: Enable/Configure a prefix-based provider**
    1. Ensure the provider is installed: `elephant providers list`
    2. If not installed, install the required provider (e.g., `yay -S elephant-calc`)
    3. Read the user config file (`~/.config/walker/config.toml`).
    4. Find or add the provider configuration in `[builtins.PROVIDER_NAME]`.
    5. Set `hidden = false` and configure the prefix in `[providers.prefixes]`.
    6. Validate and restart Walker.
  - **Procedure: Change theme**
    1. Verify the theme exists in `~/.config/walker/themes/` or default theme locations.
    2. Read the user config file (`~/.config/walker/config.toml`).
    3. Update the `theme = "theme-name"` setting.
    4. Validate and restart Walker (if `hotreload_theme = true`, CSS changes apply without restart).
  - **Procedure: Reload/Restart Walker**
    - **Command:** `omarchy-restart-walker`
    - **Manual:** `pkill walker && uwsm app -- walker --gapplication-service &`
    - **Note:** Configuration changes require full restart. CSS-only theme changes can hot-reload if enabled.
  - **Procedure: Verify configuration applied**
    - **Goal:** Confirm that settings have been applied correctly after restart.
    - **Method:** Run `walker --debug` and observe configuration loading messages, or test the feature directly.
  - **Procedure: Reset to Omarchy defaults**
    - **Command:** `omarchy-refresh-walker`
    - **Purpose:** Restores Walker configuration from Omarchy template and restarts the service.

---

## Walker-Specific Configuration Details

### Common Configuration Sections

#### Global Settings
```toml
force_keyboard_focus = true          # Force keyboard focus on launch
close_when_open = true               # Close when already active
click_to_close = true                # Close on external clicks
selection_wrap = true                # Enable list wrapping
theme = "default"                    # Active theme name
theme_location = ["~/.config/walker/themes/"]  # Theme search paths
hotreload_theme = true               # Auto-reload CSS changes
timeout = 60                         # Auto-close timeout (seconds)
```

#### List Configuration
```toml
[list]
max_entries = 200      # Maximum results to display
cycle = true           # Enable result cycling
```

#### Search Configuration
```toml
[search]
placeholder = "Search..."  # Placeholder text for search input
```

#### Providers Configuration
```toml
[providers]
default = ["applications", "commands"]  # Default search providers
empty = ["applications"]                # Providers for empty query
previews = ["files", "images"]          # Providers with preview support
max_results = 50                        # Global result limit

[providers.prefixes]
"." = "files"          # File search prefix
":" = "symbols"        # Emoji/symbols prefix
"=" = "calc"           # Calculator prefix
"$" = "clipboard"      # Clipboard history prefix
">" = "commands"       # Command runner prefix
"@" = "websearch"      # Web search prefix
";" = "providerlist"   # Provider switcher prefix
```

#### Built-in Provider Examples
```toml
[builtins.applications]
launch_prefix = "uwsm app -- "    # Omarchy launch prefix
hidden = false                     # Show in default search
history = true                     # Track launch history

[builtins.calc]
name = "Calculator"
icon = ""
min_chars = 3                     # Minimum characters to trigger
prefix = "="                      # Activation prefix
hidden = false                    # Show when prefix used

[builtins.finder]
use_fd = true                     # Use fd instead of find
icon = "file"
name = "Finder"
preview_images = true             # Show image previews
hidden = false
prefix = "."

[builtins.windows]
switcher_only = true              # Only in window switcher mode
hidden = false
```

### Keybinding Configuration
```toml
[keys.ai]
run_last_response = ["ctrl e"]

# Valid modifiers: ctrl, alt, shift, super
# Key names follow GDK key values
```

---

## Elephant Backend Management

### Essential Commands
- **List Providers:** `elephant providers list`
- **Enable Service:** `systemctl --user enable elephant.service`
- **Start Service:** `systemctl --user start elephant.service`
- **Check Status:** `systemctl --user status elephant.service`
- **View Logs:** `journalctl --user -u elephant.service -f`
- **Restart Service:** `systemctl --user restart elephant.service`

### Essential Providers (Required)
- `elephant-providerlist` - Provider switcher
- `elephant-desktopapplications` - Desktop applications

### Common Optional Providers
- `elephant-files` - File browser
- `elephant-runner` - Command runner
- `elephant-calc` - Calculator
- `elephant-websearch` - Web search
- `elephant-clipboard` - Clipboard history
- `elephant-symbols` - Symbol picker
- `elephant-bookmarks` - Bookmarks

---

## Integration with Hyprland/Omarchy

### Autostart Configuration
**Location:** `~/.local/share/omarchy/default/hypr/autostart.conf`
```conf
# Launch Walker as service on startup
exec-once = uwsm app -- walker --gapplication-service
```

### Keybinding Configuration
**Location:** `~/.config/hypr/hyprland.conf` or included configs
```conf
# Launch Walker
bind = SUPER, SPACE, exec, walker
```

### Layer Rules
**Location:** `~/.local/share/omarchy/default/hypr/apps/walker.conf`
```conf
# Disable animations for faster appearance
layerrule = noanim, walker
```

---

## Known Issues and Workarounds

### Memory Leak in Service Mode
**Issue:** Walker's `--gapplication-service` mode has a known memory leak that can cause RAM usage to grow beyond 1.2 GB.

**Workaround:**
- The Omarchy team is aware of this issue.
- Use `omarchy-restart-walker` periodically if memory usage becomes problematic.
- Reference: https://github.com/basecamp/omarchy/issues/698

### Walker Missing After System Update
**Issue:** After Arch Linux system updates, Walker and Elephant may be removed or become non-functional.

**Solution:**
```bash
# Reinstall Walker and Elephant
yay -S walker-git elephant-git

# Or use Omarchy's refresh mechanism
omarchy-refresh-walker

# Check and reinstall providers
elephant providers list
yay -S elephant-providerlist elephant-desktopapplications
```

---

## Troubleshooting Procedures

### Walker Won't Start
1. **Check Elephant Backend:**
   ```bash
   systemctl --user status elephant.service
   systemctl --user start elephant.service  # If not running
   ```

2. **Verify Providers Installed:**
   ```bash
   elephant providers list
   # Install if missing:
   yay -S elephant-providerlist elephant-desktopapplications
   ```

3. **Validate Configuration:**
   ```bash
   taplo check ~/.config/walker/config.toml
   walker --debug
   ```

### Configuration Changes Not Applied
```bash
# Ensure Walker is completely killed
pkill -9 walker
sleep 1

# Restart
omarchy-restart-walker
```

### Applications Not Showing
```bash
# Ensure provider is installed
yay -S elephant-desktopapplications

# Restart Elephant
systemctl --user restart elephant.service

# Restart Walker
omarchy-restart-walker

# Verify in config.toml
[builtins.applications]
hidden = false  # Should be false
```

### Theme Not Loading
1. Verify theme exists: `ls -la ~/.config/walker/themes/YOUR_THEME/`
2. Check `theme_location` in config.toml includes the correct path
3. Ensure `style.css` exists in theme directory
4. Test with default theme: set `theme = "default"` and restart

---

## Rollback Procedures

### Backup Before Changes
```bash
# Backup config file
cp ~/.config/walker/config.toml ~/.config/walker/config.toml.backup

# Backup with timestamp
cp ~/.config/walker/config.toml ~/.config/walker/config.toml.$(date +%Y%m%d_%H%M%S)
```

### Restore from Backup
```bash
# Restore previous config
cp ~/.config/walker/config.toml.backup ~/.config/walker/config.toml
omarchy-restart-walker
```

### Reset to Omarchy Defaults
```bash
# Use Omarchy's refresh mechanism (recommended)
omarchy-refresh-walker

# Or manual reset
rm ~/.config/walker/config.toml
cp ~/.local/share/omarchy/config/walker/config.toml ~/.config/walker/config.toml
omarchy-restart-walker
```

---

## Safety Considerations

1. **Always Backup:** Create backup of config.toml before making changes.
2. **Validate TOML:** Use `taplo check` to validate syntax before restarting.
3. **Test in Debug Mode:** Run `walker --debug` to catch configuration errors.
4. **Verify Providers:** Check `elephant providers list` before enabling provider features.
5. **Elephant Dependency:** Ensure Elephant backend is running for Walker to function.
6. **Use Omarchy Commands:** Prefer `omarchy-restart-walker` and `omarchy-refresh-walker` for safety.
7. **Non-interactive Commands:** When using package managers in automated scripts, use `--noconfirm` flag.

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Restart Walker | `omarchy-restart-walker` |
| Reset to defaults | `omarchy-refresh-walker` |
| Validate config | `taplo check ~/.config/walker/config.toml` |
| Debug mode | `walker --debug` |
| List providers | `elephant providers list` |
| Check Elephant | `systemctl --user status elephant.service` |
| Start Elephant | `systemctl --user start elephant.service` |
| View logs | `journalctl --user -u walker.service -f` |
| Launch Walker | `walker` |
| Launch in dmenu mode | `walker --dmenu -p "prompt"` |
| Launch specific mode | `omarchy-launch-walker -m symbols` |
