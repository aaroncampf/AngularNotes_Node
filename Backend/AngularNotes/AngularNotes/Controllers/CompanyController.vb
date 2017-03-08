Imports System.Net
Imports System.Web.Http

Public Class CompanyController
	Inherits ApiController

	Dim db As New Database()

	<HttpPost>
	Public Sub CreateDatabase()
		db.Database.Create()
	End Sub

	<HttpPost>
	Public Sub DeleteDatabase()
		db.Database.Delete()
	End Sub




	' GET api/<controller>
	''' <summary>
	''' Test
	''' </summary>
	''' <returns></returns>
	Public Function GetValues() As IEnumerable(Of Company)
		Return db.Companies
	End Function

	' GET api/<controller>/5
	Public Function GetValue(ByVal id As Integer) As Company
		Return db.Companies.Find(id)
	End Function

	' POST api/<controller>
	Public Sub PostValue(<FromBody()> ByVal value As Company)

	End Sub

	' PUT api/<controller>/5
	Public Sub PutValue(ByVal id As Integer, <FromBody()> ByVal value As Company)

	End Sub

	' DELETE api/<controller>/5
	Public Sub DeleteValue(ByVal id As Integer)
		db.Companies.Remove(db.Companies.Find(id))
		db.SaveChanges()
	End Sub
End Class
