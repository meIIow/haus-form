# haus-form
Haus take home - full-stack form with Slack Webhook
Deployed on Heroku - https://haus-form.herokuapp.com/

### technologies
This app uses Node.js (Express) with MongoDB ( Mongoose) and vanilla React. There's relatively simple cookie-based authentication. The front-end situation was simple enough that Redux and Router seemed unneccesary, plus I wanted to focus more on getting the backend logic sound (encryption, sessions, controllers, etc). I used Material-UI so I could get the frontend to look ok without having to spend extra time on it, plus it allows for some dynamic error feedback.

### things to improve
Error handling is relatively naive at this point - there's logic to check if usernames are taken, passwords are wrong, and that feedback is filled out, but there's not a robust error-handling system from the backend. Would be good to integrate Jest testing as well. The UI could definitely use work as well, but for me that's one of the last things to focus on, once we've got the actual functionality working fully and tested properly

### running locally
fork repo and clone to your machine

open a terminal window, install dependencies and run webpack script to build out bundle and watch for changes
```
npm install
npm run webpack
```

open another terminal window to run server via nodemon
```
npm start
```

navigate to localhost:3000 to interact with web page

### time taken

cut myself off after just about 8 hours, plus the time it took to host and write this readMe. Still some print statements and comments I should clean out but I got the functionality mostly down.
