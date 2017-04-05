"use strict";
function newNote() {
    var date = new Date().toISOString();
    var note = {};
    note.Date = date;
    return note;
}
exports.newNote = newNote;
//# sourceMappingURL=note.model.js.map