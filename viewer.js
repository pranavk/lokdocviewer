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

    open_document_cb: function () {
	log ("callback is called");
    },

    // Build the application's UI
    _testViewer: function () {
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
        this._sw.add(this._view);
        this._view.open_document(doc_path, null, this.open_document_cb, null);
        this._window.show_all();
    },

});

// Run the application
let app = new  LOKDocViewer();
app.application.run (ARGV);
