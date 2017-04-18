"use strict";
exports.__esModule = true;
function newNote() {
    var date = new Date().toISOString();
    var note = {};
    note.Date = date;
    return note;
}
exports.newNote = newNote;
