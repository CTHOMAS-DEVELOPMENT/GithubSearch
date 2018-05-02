Angular (1.6.5) Github Search.

Introduction
------------
An example consuming an Api, that also features a paginating service. The application can be cloned and enhanced as it contains a workflow for
(A) Code in ES6
(B) Tests the newly formed ES5 files
(C) Fires workflow to build a bulk.js file

Technical overview
------------------
Using the immediately-invoked function expressions development pattern that is readily available (and/or easily implementable) this example provides a good example of a fairly flexible and easy to use search application. The amount of code used is remakably low.

Install
-------
Clone this repository : git clone https://github.com/CTHOMAS-DEVELOPMENT/GithubSearch.git

This will bring down the following application structure:

index.html--css
          --dist
          --images
          --javascript
                      --app.js
                      --controllers
                      --directives
                      --filters
                      --services
          --src
                      --app.js
                      --controllers
                      --directives
                      --filters
                      --services
          --templates

Make sure the index file is located at the root so that your server application will pick this up. Eg: http://localhost:3002 (or the port necessary for your local server)

On the command line that is pointing to the same folder containing the index.html (application root) type "npm install"

Check you can see the application working in your browser which should contain "http://localhost:< the port necessary for your local server >"

Setting up the working environment
----------------------------------
Open a Command window that will be used for automatic testing.
(1) Type "karma start"
(2) If all is well an instance of the chrome browser opens and all tests pass with a "SUCCESS" report on the command line.

Open a Command window that will be used for Grunt tasks.
(1) In the new command window type "grunt"
(2) If all is well you should get the below messages:
Running "watch" task
Waiting...

Open a Command window that will be used for coding in ES6.
(1) In the new command window type "npm run build"
(2) If all is well you should get the below messages:
> babel src -d javascript

src\app.js -> javascript\app.js
src\controllers\main.js -> javascript\controllers\main.js
src\controllers\repo.js -> javascript\controllers\repo.js
src\controllers\user.js -> javascript\controllers\user.js
src\directives\directives.js -> javascript\directives\directives.js
src\filters\capitalize.js -> javascript\filters\capitalize.js
src\services\pager.js -> javascript\services\pager.js
src\services\services.js -> javascript\services\services.js

Changing/Adding your first line of ES6 code.
--------------------------------------------
Any code changes should be performed on the files in the "src" directory. Eg: "src\app.js"

In the ES6 command window run "npm run build" and (given no syntax errors) all the application files will be transpiled to ES5 and pushed to the "javascript" folder.

Once new ES5 files hit the "javascript" folder:
(1)The grunt tasks are performed which includes producing 1 file to the "dist" folder and the css file being updated.
(2)The test files being tested to see if all tests still pass on the application.

