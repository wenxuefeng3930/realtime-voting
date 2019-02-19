Project and design:

This project is designed for voting.

I'm using socket.io to update data dynamically.

we have a welcome page ,a voting page and a result page.



Design for login page:


I'm using body-parser to post the user information to the server. Then the server will check the information and send a feedback to client.

If the due date is reached, you will go to an error page. Otherwise the server will lead you to the voting page.



Design for voting page:

You have two options. 

After each time you chose, an alert window will inform the work has been done .

The server will update dynamically after each selection.  You can see the percentage of each option at voting page, and it will be updated dynamically.

I created a function button to check the checkbox and submit client's choices to main server by  socket.io.

When the server received the choices, it will update the data and send the updated data back to all clients by using socket.emit and socket.broadcast.emit.

When clients get updated data, it will update the result on the voting page.



Design for result page:

Clients will see the actual number of vote for each option as well as percentage.

I'm using ejs to pass the data from server to client.






Steps to run:

	install node
	install socket.io
	install bodypaser
	install ejs
	go to app.js (line 19) to set the due date.
	run: node app.js
	go to localhost:3000


Features:
		
	go back button on error page.

	continue button if you entered right credentials.

	Navigation between pages.
		
	After each voting you will get an alert widow showing the vote has been done.

	Show percentage of voting at voting page

	Support multiple users.

	Real time update


Limitations:

