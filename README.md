# Node-with-React
Code from the Node with React: Full-stack Web Development course by Stephen Grider at https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/content

## Progress

Completed Section 13 - The Home Stretch, working on improvements

## Differences from Stephen

* I will be checking in my code to git and Github much more often than 
Stephen does. Later on, I will probably deploy to Heroku more often too.

* I am saving the display name for a user along with the Google ID and 
displaying it in the header.

* Some of my action creators / action names are different and the data index
is called user or surveys, rarely payload.

* Some of my API endpoints are different, e.g. /api/add_survey

* My list of recipients is delimited by either a comma or semicolon and optional
whitespace.

* The sendgrid npm module has been superseded by @sendgrid/... I have decided to 
continue using the same version as Stephen for now, but I will probably come back 
and rewrite the Mailer using the latest version after completing the course.

* Clicking on a survey in the dashboard will open a detail page which list recipients, 
also showing which ones have responded.

## Deployed Application

The application is deployed on [Heroku](https://emaily-2018.herokuapp.com).

**NOTE**: It really does send out surveys!

Feel free to log in, send one survey to a recipient or two, but please don't 
abuse it.

## Git client

I have used Git at the command-line for 10 years.
Over that time, I have tried many different graphical shells for Git,
without finding one that was easier and nicer to use than the command-line
(in my view).

I have now found that [GitKraken](https://www.gitkraken.com) is an excellent
Git shell and would advise using it to everyone.

## Questions

If you have any questions about this repository, or any others of mine, please
don't hesitate to contact me.
