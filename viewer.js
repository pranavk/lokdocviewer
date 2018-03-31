#!/usr/bin/gjs

const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const LOKDocView = imports.gi.LOKDocView;

const doc_path = "/opt/orig.odt"

const LOKDocViewer = new Lang.Class ({
    Name: 'lokdocviewer',

    // Create the application itself
    _init: function () {
       this.application = new Gtk.Application ();

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('startup', Lang.bind(this, this._onStartup));
    },

    open_document_cb: function () {
        this._view.set_edit(true);
    },

    // Callback function for 'startup' signal builds the UI
    _onStartup: function () {
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            title: "LOK Document Viewer",
            default_height: 600,
            default_width: 800,
        });
        this._view = LOKDocView.View.new(null, null);

        this._sw = new Gtk.ScrolledWindow({ hexpand: true, vexpand: true });
	this._window.add(this._sw);
        this._sw.add(this._view);

        this._view.open_document(doc_path, "{}", null, Lang.bind(this,this.open_document_cb));
        this._window.show_all();
    },
});

// Run the application
let app = new  LOKDocViewer();
app.application.run (ARGV);
