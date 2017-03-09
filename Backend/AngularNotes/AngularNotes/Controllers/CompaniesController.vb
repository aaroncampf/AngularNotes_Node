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
    Public Class CompaniesController
        Inherits System.Web.Http.ApiController

        Private db As New Database

        ' GET: api/Companies
        Function GetCompanies() As IQueryable(Of Company)
            Return db.Companies
        End Function

        ' GET: api/Companies/5
        <ResponseType(GetType(Company))>
        Function GetCompany(ByVal id As Integer) As IHttpActionResult
            Dim company As Company = db.Companies.Find(id)
            If IsNothing(company) Then
                Return NotFound()
            End If

            Return Ok(company)
        End Function

        ' PUT: api/Companies/5
        <ResponseType(GetType(Void))>
        Function PutCompany(ByVal id As Integer, ByVal company As Company) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            If Not id = company.ID Then
                Return BadRequest()
            End If

            db.Entry(company).State = EntityState.Modified

            Try
                db.SaveChanges()
            Catch ex As DbUpdateConcurrencyException
                If Not (CompanyExists(id)) Then
                    Return NotFound()
                Else
                    Throw
                End If
            End Try

            Return StatusCode(HttpStatusCode.NoContent)
        End Function

        ' POST: api/Companies
        <ResponseType(GetType(Company))>
        Function PostCompany(ByVal company As Company) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            db.Companies.Add(company)
            db.SaveChanges()

            Return CreatedAtRoute("DefaultApi", New With {.id = company.ID}, company)
        End Function

        ' DELETE: api/Companies/5
        <ResponseType(GetType(Company))>
        Function DeleteCompany(ByVal id As Integer) As IHttpActionResult
            Dim company As Company = db.Companies.Find(id)
            If IsNothing(company) Then
                Return NotFound()
            End If

            db.Companies.Remove(company)
            db.SaveChanges()

            Return Ok(company)
        End Function

        Protected Overrides Sub Dispose(ByVal disposing As Boolean)
            If (disposing) Then
                db.Dispose()
            End If
            MyBase.Dispose(disposing)
        End Sub

        Private Function CompanyExists(ByVal id As Integer) As Boolean
            Return db.Companies.Count(Function(e) e.ID = id) > 0
        End Function
    End Class
End Namespace