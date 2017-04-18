"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var note_model_1 = require("../models/note.model");
var notes_service_1 = require("../services/notes.service");
var data_share_service_1 = require("../services/data-share.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var NotesComponent = (function () {
    function NotesComponent(noteService, dataShareService, toastr) {
        this.noteService = noteService;
        this.dataShareService = dataShareService;
        this.toastr = toastr;
        this.selectedContact = {};
    }
    NotesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataShareService.contactSelected$
            .subscribe(function (contact) {
            _this.selectedContact = contact;
            if (contact.ID) {
                _this.noteService.getContactNotes(contact.ID)
                    .subscribe(function (notes) { return _this.notesCollection = notes; });
            }
            else {
                _this.noteService.getNotes()
                    .subscribe(function (notes) { return _this.notesCollection = notes; });
            }
        });
    };
    NotesComponent.prototype.addNote = function (contact) {
        var _this = this;
        var blankNote = note_model_1.newNote();
        this.noteService.newNote(blankNote, contact.ID)
            .subscribe(function () {
            _this.toastr.success('Note Created!');
            _this.noteService.getContactNotes(contact.ID)
                .subscribe(function (notes) { return _this.notesCollection = notes; });
        }, function (error) { return _this.toastr.error(error, 'Oops!'); });
    };
    NotesComponent.prototype.updateNote = function (note) {
        this.noteService.updateNote(note)
            .subscribe(function () { });
    };
    NotesComponent.prototype.removeNote = function (id) {
        var _this = this;
        this.noteService.deleteNote(id).subscribe(function () {
            _this.toastr.warning('Note Removed.');
            _this.noteService.getContactNotes(_this.selectedContact.ID)
                .subscribe(function (notes) { return _this.notesCollection = notes; });
        });
    };
    return NotesComponent;
}());
NotesComponent = __decorate([
    core_1.Component({
        selector: 'notes-component',
        template: "\n\t<h4>Contact Notes</h4>\n\t<button type=\"button\" class=\"btn btn-block\" (click)=\"addNote(selectedContact)\" [disabled]=\"!selectedContact.ID\" [class.disabled]=\"!selectedContact.ID\">Add Note</button>\n\t<div class=\"card-panel\" *ngFor=\"let note of notesCollection; let i = index;\">\n\t\t<i class=\"glyphicon glyphicon-remove pull-right\" (click)=\"removeNote(note.ID)\"></i>\n\t\t<strong>Note #{{note.ID}}</strong> - <strong>{{note.Date | date: 'MM/dd/yyyy' }}</strong>\n\t\t<input class=\"col-xs-8\" (blur)=\"updateNote(note, note.ID)\" [(ngModel)]=\"note.Title\"/>\n\t\t<textarea (blur)=\"updateNote(note, note.ID)\" [(ngModel)]=\"note.Text\"></textarea>\n\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [notes_service_1.NotesService,
        data_share_service_1.DataShareService,
        ng2_toastr_1.ToastsManager])
], NotesComponent);
exports.NotesComponent = NotesComponent;
//# sourceMappingURL=notes.component.js.map