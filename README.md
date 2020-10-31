# SpoonShot Book Inventory Management Assignment
<!-- ## Assignment for SDE - Intern (Applications) [Link](https://summergeeks.in/static/assignments/summergeeks%202020%20-%20SDE%20Assignment.pdf)  -->
<br/>

## Assumptions
  
1. When a book is searched it should display all the list of books and whether they are available in inventory or not. 
2. Multiple books could be added from the list of books.
3. A different page of book inventory should be there which lists all the books currently in inventory.
4. It is assumed that when inventory is updated for an existing book it means we can add more number of copies or remove the book.

## Implementation

The project is build on flask framework as it supports python as a backend also for database mongodb is used beacuse of it's nosql nature and javascript ajax calls are used so that everything happens in backend and user need not refresh the page.
## Instructions To Run

* Clone the project and cd into the project directory
* Open terminal and type ```pip install -r requirements.txt```
* Set ```app.py``` to flask app using command ```export FLASK_APP=app.py```
* Run ```flask run``` in the terminal
* Open the Localhost link on your web browser

## Application
The application is Deployed on Heroku, Link for the same is [Book Inventory Management](https://spoonshot-bookinventory.herokuapp.com/)

<!-- This is how the Application looks


![What is looks like ](static/css/imgs/app.png) -->

<!-- ## Approach



To capture the details of User and Host the idea is Simple

* First created a html page in which User can enter his/her and host details
* For Check-in if the User doesn't enter host details an alert will be given to him stating that no host details added, on successful completion of the form User and
Host Details will get saved in database and also Host will get a sms and email having Visitor Details
* To Store User and Host data Sqlite database is used, ```Flask-SQLAlchemy``` let us do that
* For sms, ```Fast2sms``` dev api is used
* For email, python inbuilt library ```smtplib``` is used also dependency ```Flask-Mail```
* Now more users can check-in with the same procedure or previous one who already are checked-in can check-out
* To Check-out user has to select check-out option and enter his/her details if the details entered are wrong they will alerted that user doesn't exists, basically for check-out phone number should be correct as phone number being a primary key it is used to retrieve data from database
* Once details retrieved a mail is sent to the user stating his/her visit details

## Dependencies Used

* Flask
* Flask-Mail
* Flask-SQLAlchemy
* Jinja2
* requests
* SQLAlchemy -->
