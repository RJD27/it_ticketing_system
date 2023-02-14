# it_ticketing_system
A ticketing system that stores data locally.


This branch focuses on the login aspect of the app.

There are a few differences from how the register approached the routes so I will try to detail them here and we can decide what to keep.

I did not mess with Bcrypt since it gets defined in the register side. 

I created a server.js file with all the routes inside.
I also created a auth.js file to do Passport authentication and DB stuff.
I had to edit the gulpfile.js to proxy the express server so they can run at the same time.

My routes primarily use res.sendFile() to display the html where I think register branch uses res.render().
So from a POST it will redirect to the page and then the GET will use res.sendFile().

