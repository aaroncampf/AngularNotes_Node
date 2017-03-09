Imports System.Data
Imports System.Data.Entity
Imports System.Data.Entity.Infrastructure
Imports System.Linq
Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports System.Web.Http.Description
Imports AngularNotes

Namespace Controllers
    Public Class NotesController
        Inherits System.Web.Http.ApiController

        Private db As New Database

        ' GET: api/Notes
        Function GetNotes() As IQueryable(Of Note)
            Return db.Notes
        End Function

        ' GET: api/Notes/5
        <ResponseType(GetType(Note))>
        Function GetNote(ByVal id As Integer) As IHttpActionResult
            Dim note As Note = db.Notes.Find(id)
            If IsNothing(note) Then
                Return NotFound()
            End If

            Return Ok(note)
        End Function

        ' PUT: api/Notes/5
        <ResponseType(GetType(Void))>
        Function PutNote(ByVal id As Integer, ByVal note As Note) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            If Not id = note.ID Then
                Return BadRequest()
            End If

            db.Entry(note).State = EntityState.Modified

            Try
                db.SaveChanges()
            Catch ex As DbUpdateConcurrencyException
                If Not (NoteExists(id)) Then
                    Return NotFound()
                Else
                    Throw
                End If
            End Try

            Return StatusCode(HttpStatusCode.NoContent)
        End Function

        ' POST: api/Notes
        <ResponseType(GetType(Note))>
        Function PostNote(ByVal note As Note) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            db.Notes.Add(note)
            db.SaveChanges()

            Return CreatedAtRoute("DefaultApi", New With {.id = note.ID}, note)
        End Function

        ' DELETE: api/Notes/5
        <ResponseType(GetType(Note))>
        Function DeleteNote(ByVal id As Integer) As IHttpActionResult
            Dim note As Note = db.Notes.Find(id)
            If IsNothing(note) Then
                Return NotFound()
            End If

            db.Notes.Remove(note)
            db.SaveChanges()

            Return Ok(note)
        End Function

        Protected Overrides Sub Dispose(ByVal disposing As Boolean)
            If (disposing) Then
                db.Dispose()
            End If
            MyBase.Dispose(disposing)
        End Sub

        Private Function NoteExists(ByVal id As Integer) As Boolean
            Return db.Notes.Count(Function(e) e.ID = id) > 0
        End Function
    End Class
End Namespace