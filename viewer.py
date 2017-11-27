import gi
from gi.repository import Gtk, Gio, LOKDocView
import sys

class MyApplication(Gtk.Application):
    def __init__(self):
        Gtk.Application.__init__(self,
                                 application_id="org.lokdocviewer.pyviewer",
                                 flags=Gio.ApplicationFlags.FLAGS_NONE)

    def do_activate(self):
        win = Gtk.ApplicationWindow(application=self,
                                    title="LOK Document Viewer",
                                    default_height=600, default_width=800)
        view = LOKDocView.View.new(None, None)

        sw = Gtk.ScrolledWindow(hexpand=True, vexpand=True)
        win.add(sw)
        sw.add(view)

        view.open_document("/opt/orig.odt", "{}", None, None, None)
        win.show_all()

if __name__ == '__main__':
    app = MyApplication()
    app.run(sys.argv)
