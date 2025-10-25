#!/usr/bin/gjs

// GTK CSS validation script for Waybar
// Usage: gjs validate-gtk-css.js <css-file-path>

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const System = imports.system;

if (ARGV.length < 1) {
    print("Usage: gjs validate-gtk-css.js <css-file-path>");
    System.exit(1);
}

const cssFile = ARGV[0];
const file = Gio.File.new_for_path(cssFile);

if (!file.query_exists(null)) {
    print(`Error: File '${cssFile}' not found`);
    System.exit(1);
}

try {
    // Initialize GTK
    Gtk.init(null);
    
    // Create a CSS provider
    const cssProvider = new Gtk.CssProvider();
    
    // Load and parse the CSS file
    const [success, data] = file.load_contents(null);
    if (!success) {
        print("Error: Could not read CSS file");
        System.exit(1);
    }
    
    // Try to parse the CSS - this will throw an error for invalid CSS
    cssProvider.load_from_data(data);
    
    print("CSS validation: OK");
    System.exit(0);
    
} catch (e) {
    print(`CSS validation failed: ${e.message}`);
    System.exit(1);
}