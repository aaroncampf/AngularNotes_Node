﻿Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Net.Http
Imports System.Web.Http

Public Module WebApiConfig
	Public Sub Register(ByVal config As HttpConfiguration)
		' Web API configuration and services

		' Web API routes
		config.MapHttpAttributeRoutes()
		config.Routes.MapHttpRoute(
			name:="DefaultApi",
			routeTemplate:="api/{controller}/{id}",
			defaults:=New With {.id = RouteParameter.Optional}
		)

		Dim Cors = New Cors.EnableCorsAttribute("*", "*", "*")
		config.EnableCors(Cors)
	End Sub
End Module
