# Presentation
CartoSI is a tool for the cartography of a complex information system 

![](https://github.com/TheMalloum/cartosi/blob/master/src/main/webapp/cartosi/img/logo.png "Cartography" )

#Prerequisites

	JAVA 6 or higher
	maven 3


## DEMO
Test CartoSI is simple, clone the project or [download ZIP]
compile the project with maven

    mvn clean install
  

And run the application 

    cd target/
    java -jar carto-0.0.1-SNAPSHOT-war-exec.jar


Have fun ! you can now appreciate CartoSI at this URL [http://localhost:8080/]
 
## API documentation

All api documentation is included in CartoSI at this URL [http://localhost:8080/apidocs/]
 


# Security

Authentication and Identity Service : Java Authentication and Authorization Service, or JAAS is the Java implementation of the standard Pluggable Authentication Module (PAM) information security framework.

Authentication and user management is very pluggable so that the CartoSI can:
Integrate with a Single Sign On system,
Integrate with an external source of users and groups,
Integrate easily any specific business logic tied to user management.
For that the Authentication and Identity services are separated in several components that can all be configured.

 
## Tech

CartoSI is composed by a RESTFull service and a HTML/JS/CSS interface build with angularjS:

* [RESTEasy] - RESTEasy is a JBoss project that provides various frameworks to help you build RESTful Web Services and RESTful Java applications.
* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps.
* [jQuery] - jQuery is a fast, small, and feature-rich JavaScript library.
* [AdminLTE Control Panel Template] - Best open source admin dashboard & control panel theme by [Abdullah Almsaeed].
* [ENUNCIATE] - Enumciate is an enhancement engine for your JAVA web service API.
 

[download ZIP]: <https://github.com/TheMalloum/cartosi/archive/master.zip>
[Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
[jQuery]: <http://jquery.com>
[AngularJS]: <http://angularjs.org>
[RESTEasy]: http://resteasy.jboss.org/
[http://localhost:8080/]: http://localhost:8080/
[http://localhost:8080/apidocs/]: http://localhost:8080/apidocs/
[AdminLTE Control Panel Template]:  https://almsaeedstudio.com/
[Abdullah Almsaeed]: https://almsaeedstudio.com/about
[ENUNCIATE]: http://enunciate.webcohesion.com/

   