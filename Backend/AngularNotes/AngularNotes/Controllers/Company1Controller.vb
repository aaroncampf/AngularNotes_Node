Imports System.Net
Imports System.Web.Http

Public Class Company1Controller
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
	''' 
	''' </summary>
	''' <returns></returns>
	Public Function GetValues() As IEnumerable(Of Company)
		Return db.Companies
	End Function

	' GET api/<controller>/5
	''' <summary>
	''' 
	''' </summary>
	''' <param name="id"></param>
	''' <returns></returns>
	Public Function GetValue(ByVal id As Integer) As Company
		Return db.Companies.Find(id)
	End Function

	' POST api/<controller>
	''' <summary>
	''' 
	''' </summary>
	''' <param name="value"></param>
	Public Sub PostValue(<FromBody()> ByVal value As Company)
		db.Companies.Add(value)
		db.SaveChanges()
	End Sub

	' PUT api/<controller>/5
	''' <summary>
	''' 
	''' </summary>
	''' <param name="id"></param>
	''' <param name="value"></param>
	Public Sub PutValue(ByVal id As Integer, <FromBody()> ByVal value As Company)
		Dim Record = db.Companies.Find(id)
		Record.ID = value.ID
		Record.Name = value.Name
		Record.Address = value.Address
		Record.City = value.City
		Record.Phone = value.Phone
		Record.Zip = value.Zip
		Record.Misc = value.Misc

		db.SaveChanges()
	End Sub

	' DELETE api/<controller>/5
	''' <summary>
	''' 
	''' </summary>
	''' <param name="id"></param>
	Public Sub DeleteValue(ByVal id As Integer)
		db.Companies.Remove(db.Companies.Find(id))
		db.SaveChanges()
	End Sub
End Class
