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
    Public Class QuoteLinesController
        Inherits System.Web.Http.ApiController

        Private db As New Database

		' GET: api/QuoteLines
		Function GetQuoteLines() As IQueryable(Of QuoteLine)
			Return db.QuoteLines
		End Function

		Function GetQuoteLines(QuoteID As Integer) As ICollection(Of QuoteLine)
			Return db.Quotes.Find(QuoteID).Lines
		End Function

		' GET: api/QuoteLines/5
		<ResponseType(GetType(QuoteLine))>
        Function GetQuoteLine(ByVal id As Integer) As IHttpActionResult
            Dim quoteLine As QuoteLine = db.QuoteLines.Find(id)
            If IsNothing(quoteLine) Then
                Return NotFound()
            End If

            Return Ok(quoteLine)
        End Function

        ' PUT: api/QuoteLines/5
        <ResponseType(GetType(Void))>
        Function PutQuoteLine(ByVal id As Integer, ByVal quoteLine As QuoteLine) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            If Not id = quoteLine.ID Then
                Return BadRequest()
            End If

            db.Entry(quoteLine).State = EntityState.Modified

            Try
                db.SaveChanges()
            Catch ex As DbUpdateConcurrencyException
                If Not (QuoteLineExists(id)) Then
                    Return NotFound()
                Else
                    Throw
                End If
            End Try

            Return StatusCode(HttpStatusCode.NoContent)
        End Function

        ' POST: api/QuoteLines
        <ResponseType(GetType(QuoteLine))>
        Function PostQuoteLine(ByVal quoteLine As QuoteLine) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            db.QuoteLines.Add(quoteLine)
            db.SaveChanges()

            Return CreatedAtRoute("DefaultApi", New With {.id = quoteLine.ID}, quoteLine)
        End Function

        ' DELETE: api/QuoteLines/5
        <ResponseType(GetType(QuoteLine))>
        Function DeleteQuoteLine(ByVal id As Integer) As IHttpActionResult
            Dim quoteLine As QuoteLine = db.QuoteLines.Find(id)
            If IsNothing(quoteLine) Then
                Return NotFound()
            End If

            db.QuoteLines.Remove(quoteLine)
            db.SaveChanges()

            Return Ok(quoteLine)
        End Function

        Protected Overrides Sub Dispose(ByVal disposing As Boolean)
            If (disposing) Then
                db.Dispose()
            End If
            MyBase.Dispose(disposing)
        End Sub

        Private Function QuoteLineExists(ByVal id As Integer) As Boolean
            Return db.QuoteLines.Count(Function(e) e.ID = id) > 0
        End Function
    End Class
End Namespace