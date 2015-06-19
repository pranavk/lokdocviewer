#!/usr/bin/gjs

const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const LOKDocView = imports.gi.LOKDocView;

const inst_path = "/opt/libreoffice/instdir/program";
const doc_path = "/opt/orig.odt"

const LOKDocViewer = new Lang.Class ({
    Name: 'lokdocviewer',

    // Create the application itself
    _init: function () {
        this.application = new Gtk.Application ();

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', Lang.bind(this, this._onActivate));
        this.application.connect('startup', Lang.bind(this, this._onStartup));
    },

    // Callback function for 'activate' signal presents windows when active
    _onActivate: function () {
        this._window.present ();
    },

    // Callback function for 'startup' signal builds the UI
    _onStartup: function () {
        this._testViewer ();
    },

    _onKeyPress: function (widget, event) {
        this._view.post_key (event);
    },

    // Build the application's UI
    _testViewer: function () {

        // Create the application window
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            title: "LOK Document Viewer",
            default_height: 600,
            default_width: 800,
        });

        this._sw = new Gtk.ScrolledWindow({ hexpand: true,
                                            vexpand: true });

        this._window.add (this._sw);
        
        this._view = LOKDocView.View.new(inst_path, null, null);
        this._view.open_document(doc_path);
        
        // Put the webview into the window
        this._sw.add(this._view);
        this._window.connect ('key-press-event', Lang.bind (this, this._onKeyPress));
        this._window.connect ('key-release-event', Lang.bind (this, this._onKeyPress));
        // Show the window and all child widgets
        this._window.show_all();
    },

});

// Run the application
let app = new  LOKDocViewer();
app.application.run (ARGV);
