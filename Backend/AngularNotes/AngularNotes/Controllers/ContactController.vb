Imports System.Net
Imports System.Web.Http

Public Class ContactController
	Inherits ApiController

	Dim db As New Database()


	' GET api/<controller>
	''' <summary>
	''' Test
	''' </summary>
	''' <returns></returns>
	Public Function GetValues() As IEnumerable(Of Contact)
		Return db.Contacts
	End Function

	Public Function GetValues(CompanyID As Integer) As IEnumerable(Of Contact)
		Return db.Companies.Find(CompanyID).Contacts
	End Function


	' GET api/<controller>/5
	''' <summary>
	''' Get a contact
	''' </summary>
	''' <param name="id">The contact's id number</param>
	''' <returns></returns>
	Public Function GetValue(ByVal id As Integer) As Contact
		Return db.Contacts.Find(id)
	End Function

	' POST api/<controller>
	''' <summary>
	''' Post a contact
	''' </summary>
	''' <param name="CompanyID">The ID of the contact's company</param>
	''' <param name="value"></param>
	Public Function PostValue(CompanyID As Integer, <FromBody()> ByVal value As Contact) As Integer
		db.Companies.Find(CompanyID).Contacts.Add(value)
		db.SaveChanges()
		Return value.ID
	End Function

	' PUT api/<controller>/5
	''' <summary>
	'''	Put a contact
	''' </summary>
	''' <param name="id">The contact's ID</param>
	''' <param name="value">The updated contact</param>
	Public Sub PutValue(ByVal id As Integer, <FromBody()> ByVal value As Contact)
		Dim Record = db.Contacts.Find(id)
		Record.ID = value.ID
		Record.Name = value.Name
		Record.Phone = value.Phone
		Record.Email = value.Email
		Record.Position = value.Position

		db.SaveChanges()
	End Sub

	' DELETE api/<controller>/5
	Public Sub DeleteValue(ByVal id As Integer)
		db.Contacts.Remove(db.Contacts.Find(id))
		db.SaveChanges()
	End Sub

	'<Route("Contact/GetQuickSearch/")>
	<Route("api/Contact/GetQuickSearch")>
	<HttpGet>
	Public Function GetQuickSearch() As IEnumerable(Of Contact_QuickSearch)
		Dim Data = Aggregate Contact In db.Contacts Select Contact.Name, Contact.ID, CompanyID = Contact.Company.ID Into ToArray
		Return Data.Select(Function(x) New Contact_QuickSearch With {.ContactID = x.ID, .ContactName = x.Name, .CompanyID = x.CompanyID})
	End Function

End Class
