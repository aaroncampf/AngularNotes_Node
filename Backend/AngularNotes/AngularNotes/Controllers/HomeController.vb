Public Class HomeController
	Inherits System.Web.Mvc.Controller

	Function Index() As ActionResult
		ViewData("Title") = "Home Page"


		Return View()
	End Function


	Function RebuildDatabase() As ActionResult
		ViewData("Title") = "Home Page"

		Dim db As New Database()
		db.Database.CreateIfNotExists()
		db.Database.Delete()
		db.Database.Create()

		Return View("Index")
	End Function

End Class
