# Interactive Calendar Tooltip for Clock Module

## Use Case
Add an interactive calendar tooltip to Waybar's clock module with:
- Month/year view toggle
- Scrollable months/years
- Color-coded calendar elements
- Week numbers
- Highlighted current date

## Configuration

Add to `clock` module in `config/waybar/config.jsonc`:

```jsonc
"clock": {
  "format": "{:L%A %H:%M}",
  "format-alt": "{:L%d %B W%V %Y}",
  "locale": "en_GB.UTF-8", // week start on Monday
  "tooltip-format": "<tt><small>{calendar}</small></tt>",
  "calendar": {
    "mode": "month",
    "mode-mon-col": 3,
    "weeks-pos": "right",
    "on-scroll": 1,
    "format": {
      "months": "<span color='#ffead3'><b>{}</b></span>",
      "days": "<span color='#ecc6d9'>{}</span>",
      "weeks": "<span color='#99ffdd'><b>W{}</b></span>",
      "weekdays": "<span color='#ffcc66'><b>{}</b></span>",
      "today": "<span color='#ff6699'><b><u>{}</u></b></span>"
    }
  },
  "actions": {
    "on-click-middle": "mode",
    "on-scroll-up": "shift_up",
    "on-scroll-down": "shift_down"
  }
}
```

## Features

### Interactions
- **Hover**: Display calendar tooltip
- **Middle click**: Toggle month ↔ year view
- **Scroll up/down**: Navigate months (in month view) or years (in year view)

### Color Scheme
- **Month headers**: `#ffead3` (beige/cream)
- **Days**: `#ecc6d9` (light pink)
- **Week numbers**: `#99ffdd` (cyan, bold)
- **Weekdays**: `#ffcc66` (yellow/gold, bold)
- **Today**: `#ff6699` (pink, underlined, bold)

### Locale
- Set to `en_GB.UTF-8` for Monday-first week start
- Adjust locale for different regional preferences

## Styling Customization

Colors can be customized to match your theme. Adjust the hex values in the `calendar.format` section.

## References
- [Waybar Clock Module Docs](https://github.com/Alexays/Waybar/wiki/Module:-Clock#style)
- [Original PR](https://github.com/basecamp/omarchy/pull/3021)
