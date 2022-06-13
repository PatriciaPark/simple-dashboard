# simple-dashboard

# Demo > https://simple-dashboard-pyjee8.herokuapp.com/index

# Story board > https://ovenapp.io/view/ceDKa3XTdMa3HjwRIahZWT8RT3jBSbtS/A9KTv

# Source code directory
public
-index.html : index page (redirect to /views)
-server.js : server (*main js)
-favicon.ico
-404.html
-style.css

-config
--db.config.js : MySQL connection & Sequelize

-models
--db.js : configuration for MySQL database
--*.model.js : create Sequelize data model or CRUD

-controllers : controller
--*.controller.js

-routes : mapping
--*.route.js

-views
--*.html

-scripts
--*.js

# API
post
/api/users 		create new user
/api/		      check email and password(for sign in)

get
/api/users		          get all users
/api/users/count	      get count	of visitors
/api/users/email/:email	get user who had verified email
/api/users/:email	      get a user with email

put
/api/users/:email	      set user info
/api/users/pwd/:email	  set password
/api/users/count/:email	set login count
/api/users/email/:email	set email verification

delete
/api/users/:email	delete a user
/api/users/		    delete all users
