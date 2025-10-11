### Component: Hyprland
- **Description:** Manages all aspects of the Hyprland Wayland compositor, including: window and workspace management, monitor and input device configuration, key bindings, animations and visual effects, window rules, and startup applications.
- **Keywords:** hyprland, window, workspace, monitor, shortcut, binding, border, gap, animation, theme, input, keyboard, mouse, touchpad, gesture, rule, exec-once
- **Configuration Files:**
  - **Primary Config (User Managed):** `~/.config/hypr/hyprland.conf`
  - **Primary Config (User Managed, Monitors):** `~/.config/hypr/monitor.conf`
  - **Installation Default (Reference):** `~/.local/share/omarchy/config/hypr/hyprland.conf`
  - **Installation Default (Reference, Monitors):** `~/.local/share/omarchy/config/hypr/monitor.conf`
- **Key Concepts & Syntax:**
  - **Structure:** Configuration is organized into `section { ... }` blocks.
  - **Variable Assignment:** `keyword = value` (e.g., `gaps_in = 5`).
  - **Keywords:** Special commands like `source=`, `monitor=`, `exec-once=`, `env=`.
  - **Key Bindings:** `bind = [MODS], [KEY], [DISPATCHER], [ARGS]`.
  - **Window Rules:** `windowrule = [RULE], [WINDOW]`.
- **Validation (File):**
  - **Command:** `hyprland --verify-config --config {file_path}`
  - **Purpose:** Validates the syntax of an entire configuration file without loading it.
  - **Success Condition:** Exit code 0.
- **Validation (Semantic):**
  - **Purpose:** To ensure that a proposed value is valid on the running system (beyond just syntax).
  - **Monitor Name:** `hyprctl monitors` (parse output for names like `eDP-1`, `HDMI-A-1`).
  - **Keyboard Variant:** `localectl list-x11-keymap-variants` (parse output for variants like `altgr-intl`, `dvorak`).
  - **Other (TBD):** Add commands for other dynamic values as needed.
- **Information Retrieval Hierarchy:**
  - **Priority 1 (Live Introspection):** Use `hyprctl getoption [category:keyword]` to check if an option exists and get its current live value.
  - **Priority 2 (Available System Values):** Query the system for lists of available values (e.g., `hyprctl monitors`, `localectl list-x11-keymap-variants`).
  - **Priority 3 (Schema):** Refer to the `Configuration Schema` section below for all available variables and their types.
  - **Priority 4 (File Introspection):** Search for keywords and comments in the Omarchy Default config file for context.
  - **Priority 5 (Official Docs):** `https://wiki.hypr.land/`
- **Standard Procedures:**
  - **Procedure: Change a setting**
    1. Use `hyprctl getoption` to check the current value of the setting.
    2. Consult the `Configuration Schema` to confirm the variable name and type.
    3. **Perform Semantic Validation (if applicable):**
       - If the value is a monitor name, query `hyprctl monitors` to ensure the name exists.
       - If the value is a keyboard variant, query `localectl list-x11-keymap-variants` to ensure it's available.
       - If the value is not semantically valid, inform the user and abort.
    4. Read the user override file (`~/.config/hypr/hyprland.conf`).
    5. Find and replace the setting, respecting the `section { ... }` structure.
    6. Save the result to a temporary file and validate it using the file validation command.
  - **Procedure: Reload configuration**
    - **Behavior:** Hyprland automatically watches its configuration files. Any saved modification to `~/.config/hypr/hyprland.conf` (or files it sources) will trigger an automatic reload. No manual command is necessary.
  - **Procedure: Verify a setting**
    - **Goal:** Confirm that a setting has been applied correctly after a reload.
    - **Command:** `hyprctl getoption [category:keyword]`
    - **Success Condition:** The output shows the new, expected value.
  - **Procedure: Change a keybind**
    - **Goal:** Change a keybind
    - **Details:**
      - If a keybind is already occupied by the defaults, you must unbind it and override the existing binding with a new bind.
      - If you for example call a script and the script should be present information or ask the user something, you must call it if with `$terminal -e`.
      - If you execute a GUI application, you call it with `uwsm app --the command`.

---

### Configuration Schema
This section defines the ground truth for all available configuration variables. The agent MUST only use variables and sections listed here.

#### `general` section
- `gaps_in`: `int`
- `gaps_out`: `int`
- `border_size`: `int`
- `col.active_border`: `gradient`
- `col.inactive_border`: `gradient`
- `col.group_border`: `gradient`
- `col.group_border_active`: `gradient`
- `layout`: `str` (e.g., `dwindle`, `master`)
- `no_focus_fallback`: `bool`
- `apply_sens_to_raw`: `bool`
- `resize_on_border`: `bool`
- `hover_icon_on_border`: `bool`
- `allow_tearing`: `bool`

#### `decoration` section
- `rounding`: `int`
- `multisample_edges`: `bool`
- `active_opacity`: `float`
- `inactive_opacity`: `float`
- `fullscreen_opacity`: `float`
- `col.shadow`: `color`
- `col.shadow_inactive`: `color`
- `shadow_range`: `int`
- `shadow_render_power`: `int`
- `shadow_ignore_window`: `bool`
- `shadow_offset`: `vec2`
- `shadow_scale`: `float`
- `dim_inactive`: `bool`
- `dim_strength`: `float`
- `dim_special`: `float`
- `blur` (section)
  - `enabled`: `bool`
  - `size`: `int`
  - `passes`: `int`
  - `new_optimizations`: `bool`
  - `xray`: `bool`
  - `noise`: `float`
  - `contrast`: `float`
  - `brightness`: `float`

#### `animations` section
- `enabled`: `bool`
- `bezier`: `str, float, float, float, float`
- `animation`: `str, bool, int, str, str`

#### `input` section
- `kb_layout`: `str`
- `kb_variant`: `str`
- `kb_model`: `str`
- `kb_options`: `str`
- `kb_rules`: `str`
- `follow_mouse`: `int`
- `sensitivity`: `float`
- `accel_profile`: `str`
- `force_no_accel`: `bool`
- `left_handed`: `bool`
- `scroll_method`: `str`
- `natural_scroll`: `bool`
- `touchpad` (section)
  - `disable_while_typing`: `bool`
  - `natural_scroll`: `bool`
  - `scroll_factor`: `float`
  - `middle_button_emulation`: `bool`
  - `tap-to-click`: `bool`
  - `drag_lock`: `bool`

#### `gestures` section
- `workspace_swipe`: `bool`
- `workspace_swipe_fingers`: `int`
- `workspace_swipe_distance`: `int`
- `workspace_swipe_invert`: `bool`
- `workspace_swipe_min_speed_to_force`: `int`

#### `misc` section
- `disable_hyprland_logo`: `bool`
- `disable_splash_rendering`: `bool`
- `vfr`: `bool`
- `vrr`: `int`
- `mouse_move_enables_dpms`: `bool`
- `key_press_enables_dpms`: `bool`
- `always_follow_on_dnd`: `bool`
- `layers_hog_keyboard_focus`: `bool`
- `animate_manual_resizes`: `bool`
- `disable_autoreload`: `bool`
- `enable_swallow`: `bool`
- `swallow_regex`: `str`

#### `binds` section
- `pass_mouse_when_bound`: `bool`
- `scroll_event_passes_to_clients`: `bool`
- `workspace_back_and_forth`: `bool`

#### `xwayland` section
- `use_nearest_neighbor`: `bool`
- `force_zero_scaling`: `bool`

#### `opengl` section
- `nvidia_anti_flicker`: `bool`

## 7. Keyword Schemas
This section defines the expected syntax for complex keywords that take multiple arguments.

### `monitor` keyword
- **Syntax:** `monitor = <name>, <resolution>, <position>, <scale>`
- **Arguments:**
  - `<name>`: `str` (e.g., `eDP-1`, `HDMI-A-1`). Can be `all` or a specific output name.
  - `<resolution>`: `str` (e.g., `1920x1080`, `1440x900@60`). Can be `auto` or `preferred`.
  - `<position>`: `str` (e.g., `0x0`, `1920x0`).
  - `<scale>`: `float` (e.g., `1.0`, `1.25`).
- **High-Risk Arguments:** `<resolution>`, `<position>`. Changes to these arguments require the failsafe.
- **Low-Risk Arguments:** `<scale>`. Changes to this argument do NOT require the failsafe.

## 8. High-Risk Procedures

### Procedure: Change Monitor Configuration (Failsafe)
- **Trigger:** This procedure MUST be used when modifying the `monitor` keyword where `<resolution>` or `<position>` arguments are changed. It MUST NOT be used for changes only to `<scale>`.
- **Risk Level:** High (Potential for loss of video output).
- **Workflow:**
  1. Create a safety net before applying changes.
  2. Apply the configuration change (write to `~/.config/hypr/monitor.conf`). Hyprland will auto-reload.
  3. **Start a 10-second timer.**
  4. **Prompt user for confirmation:** "Did the monitor configuration change work correctly? Please type 'yes' to confirm within 10 seconds."
  5. **If user confirms 'yes' within 10 seconds:**
     - Finalize the safety net.
     - Report success.
  6. **If 10 seconds elapse without 'yes' confirmation:**
     - Inform the user: "No confirmation received. Initiating automatic rollback of monitor configuration."
     - Trigger the rollback procedure.
     - Report rollback status.
