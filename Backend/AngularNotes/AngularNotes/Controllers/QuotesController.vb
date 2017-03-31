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
    Public Class QuotesController
        Inherits System.Web.Http.ApiController

        Private db As New Database

		' GET: api/Quotes
		Function GetQuotes() As IQueryable(Of Quote)
			Return db.Quotes
		End Function

		Function GetQuotes(CompanyID As Integer) As ICollection(Of Quote)
			Return db.Companies.Find(CompanyID).Quotes
		End Function

		' GET: api/Quotes/5
		<ResponseType(GetType(Quote))>
        Function GetQuote(ByVal id As Integer) As IHttpActionResult
            Dim quote As Quote = db.Quotes.Find(id)
            If IsNothing(quote) Then
                Return NotFound()
            End If

            Return Ok(quote)
        End Function

        ' PUT: api/Quotes/5
        <ResponseType(GetType(Void))>
        Function PutQuote(ByVal id As Integer, ByVal quote As Quote) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            If Not id = quote.ID Then
                Return BadRequest()
            End If

            db.Entry(quote).State = EntityState.Modified

            Try
                db.SaveChanges()
            Catch ex As DbUpdateConcurrencyException
                If Not (QuoteExists(id)) Then
                    Return NotFound()
                Else
                    Throw
                End If
            End Try

            Return StatusCode(HttpStatusCode.NoContent)
        End Function

		' POST: api/Quotes
		<ResponseType(GetType(Quote))>
		Function PostQuote(ByVal CompanyID As Integer, <FromBody()> ByVal quote As Quote) As IHttpActionResult
			If Not ModelState.IsValid Then
				Return BadRequest(ModelState)
			End If

			db.Companies.Find(CompanyID).Quotes.Add(quote)
			db.SaveChanges()

			Return CreatedAtRoute("DefaultApi", New With {.id = quote.ID}, quote)
		End Function

		' DELETE: api/Quotes/5
		<ResponseType(GetType(Quote))>
        Function DeleteQuote(ByVal id As Integer) As IHttpActionResult
            Dim quote As Quote = db.Quotes.Find(id)
            If IsNothing(quote) Then
                Return NotFound()
            End If

            db.Quotes.Remove(quote)
            db.SaveChanges()

            Return Ok(quote)
        End Function

        Protected Overrides Sub Dispose(ByVal disposing As Boolean)
            If (disposing) Then
                db.Dispose()
            End If
            MyBase.Dispose(disposing)
        End Sub

        Private Function QuoteExists(ByVal id As Integer) As Boolean
            Return db.Quotes.Count(Function(e) e.ID = id) > 0
        End Function
    End Class
End Namespace