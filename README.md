### My Approach
Based off of my lonewolf player tracking app, I decided to approach this challenge using AngularJS and Firebase. Firebase is a cloud services provider and backend as a service provider. It provides realtime monitoring of events. I found this solution to be capable of performing the task because I am not a backend (php, MySQL) developer and having worked with this in the past, made it my go-to choice.

### Code
/app directory is where you'll find the files I worked on.
* app.js
* app.css
* index.html
* templates/

### Enjoy
Everything posted below this is jargon from the angular-seed app I used to scaffold this project.

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.
