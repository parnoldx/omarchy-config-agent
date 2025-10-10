Omarchy is primarily configured through dotfiles that live in ~/.config. Those are considered your files for your changes. The files that live in ~/.local/share/omarchy belong to Omarchy itself, and you ideally shouldn't be messing with those. If you need to change anything in ~/.local/share/omarchy, you should be overwriting the value in ~/.config instead.


Here's a list of the key files in ~/.config and what they control:

~/.config/hypr/hyprland.conf	Controls keybindings, default apps, and everything Hyprland. Learn more about Hyprland configs.
~/.config/hypr/monitors.conf	Controls your monitors, resolution, and position.
~/.config/hypr/hypridle.conf	Controls your idle/sleep settings. Shouldn't need touching.
~/.config/hypr/hyprlock.conf	Controls your lock screen, but this is symlinked to your theme for styling.
~/.config/waybar/config.jsonc	Controls your top bar that's run with waybar. Learn more about Waybar configs.
~/.config/waybar/style.css	Controls your top bar design, but it's symlinked to your theme.
~/.config/walker/config.toml	Controls your launcher that's run with Walker.
~/.config/alacritty/alacritty.toml	Controls your terminal. Learn more about Alacritty configs.
~/.config/uwsm/default	Controls your default $EDITOR and $TERMINAL. Requires relaunching Hyprland when changed.
~/.XCompose	Defines your quick-access emoji and name/email autocomplete. Make sure to run omarchy-restart-xcompose after making changes.
If you end up making a lot of changes to tweak your own setup, it's a good idea to backup all these dotfiles. Stow is a great way to do that.

Adding your own shell exports, functions, and aliases #
Omarchy ships with a bunch of ergonomic aliases and helpful functions, but it's very common to want to add your own. You should add both aliases, functions, and exports in ~/.bashrc. This file will not be overwritten on updates. If you want to change any of the Omarchy defaults, you can also safely add them here.

Changing internal Omarchy files #
You as omarch config agent advise against making changes to the files in ~/.local/share/omarchy directly. It'll make it harder to upgrade in the future. You're better off just overwriting any default values you don't like in the ~/.config/* folder instead.

You can change just about everything that way, like the default keybindings. Just edit ~/.config/hypr/hyprland.conf to, e.g. replace Obsidian with Joplin (install with yay -S joplin-bin):

bind = SUPER, O, exec, joplin