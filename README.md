# Social Media Backend
## Description

A strong backend database for a social media app. It is built using mongoDB, mongoose and express.js.
This app stores users, thier posts (labeled as thoughts), friends and reactions (to other users thoughts) to mongoDB and can all be tested using Insomnia

## Table of Contents

- [Motovation](Motovation)
- [Installation](Installation)
- [Challenges](Challenges)
- [Successes](Successes)
- [The App](App)
- [Questions?](Questions?)
- [License](License)

## Motovation

After working on a social media application using SQL and Sequelize I wanted to try and build a back end database for another using mongoDB and Mongoose to see the differences and bolster some more skills of my own

## Installation / Usage

Installation is easy! Copy the package from my repo and in the command line enter 'npm i' in order to download the dependances. Once this is done you can type 'npm start' and the app will run.

Once running, open Insomnia and go to http://localhost:3001/api/users/ - make a POST request to create a user. You will need to do this as there are no seeds!

## Challenges

At first I found making the calls to edit the database through mongoDB very hard to understand. I still struggle with some concepts like deleting friends from a user. Its when we start nesting, I start getting lost. By the end of the project I think I finally started to grasp calling on nested information

## Successes

it was a great success when after hours of running failed reaction postings that I got the first reaction to post to a Thought - It turns out I had a typo in my route handler that I had missed upon reading over 1 million times.. 

## The App

You can find a link to the instructional video here:
https://drive.google.com/file/d/1n9ujwrkHriQncg1cLyqsxEYVEwTzO4iE/view

Here is a link to the repo where you can see all the hard work:
https://github.com/Virgona/Social-Media-Backend.git


## Questions?

Got any Q's - drop me an email or add me on GitHub @ the below

- Email: tobiasvirgona@gmail.com
- GitHub: https://github.com/Virgona

## License

No license required!
