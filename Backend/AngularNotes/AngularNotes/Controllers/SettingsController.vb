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
    Public Class SettingsController
        Inherits System.Web.Http.ApiController

        Private db As New Database

        ' GET: api/Settings
        Function GetSettings() As IQueryable(Of Setting)
            Return db.Settings
        End Function

        ' GET: api/Settings/5
        <ResponseType(GetType(Setting))>
        Function GetSetting(ByVal id As Integer) As IHttpActionResult
            Dim setting As Setting = db.Settings.Find(id)
            If IsNothing(setting) Then
                Return NotFound()
            End If

            Return Ok(setting)
        End Function

        ' PUT: api/Settings/5
        <ResponseType(GetType(Void))>
        Function PutSetting(ByVal id As Integer, ByVal setting As Setting) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            If Not id = setting.ID Then
                Return BadRequest()
            End If

            db.Entry(setting).State = EntityState.Modified

            Try
                db.SaveChanges()
            Catch ex As DbUpdateConcurrencyException
                If Not (SettingExists(id)) Then
                    Return NotFound()
                Else
                    Throw
                End If
            End Try

            Return StatusCode(HttpStatusCode.NoContent)
        End Function

        ' POST: api/Settings
        <ResponseType(GetType(Setting))>
        Function PostSetting(ByVal setting As Setting) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            db.Settings.Add(setting)
            db.SaveChanges()

            Return CreatedAtRoute("DefaultApi", New With {.id = setting.ID}, setting)
        End Function

        ' DELETE: api/Settings/5
        <ResponseType(GetType(Setting))>
        Function DeleteSetting(ByVal id As Integer) As IHttpActionResult
            Dim setting As Setting = db.Settings.Find(id)
            If IsNothing(setting) Then
                Return NotFound()
            End If

            db.Settings.Remove(setting)
            db.SaveChanges()

            Return Ok(setting)
        End Function

        Protected Overrides Sub Dispose(ByVal disposing As Boolean)
            If (disposing) Then
                db.Dispose()
            End If
            MyBase.Dispose(disposing)
        End Sub

        Private Function SettingExists(ByVal id As Integer) As Boolean
            Return db.Settings.Count(Function(e) e.ID = id) > 0
        End Function
    End Class
End Namespace