#Xharktank Application
A Web Application for Entrepreneurs to pitch their business models/products to the investors

##Table of Contents
*General info
*Technologies
*Setup
*Status

##General info
This project was a part of the externship by PhonePe company collaborated with Crio.Do. It has a provision for the entrepreneurs to pitch ideas for a business or product they wish to develop by. Investors can retrieve the list of all pitches and share their feedback/comments with a counter offer as per their interests.

##Technologies
Project is created with:
*Node version: 16.16.0
*Postgresql version: 15.1
*Sequelize version: 6.5.2

##Setup
To run this project on your localhost:
*Firstly git clone this repository
$ git clone https://github.com/libgit2/libgit2
*Go inside the main folder directory
$ cd surabhigupta1519-ME_BUILDOUT_XHARKTANK
*Install the packages
$ npm install
*You will need to connect to your local database in the config.json file.
*Start the server in your localhost
$ npm run dev

Now you can play with the various APIs created to build this project.

##Features
*API for the entrepreneurs to pitch their business model/product to the investors providing their name, title & idea for the business, the investment amount they expect to be fulfilled, and the percentage of equity they are ready to shed away to the potential investors.
*API for the investors to invest in the business model/product of the entrepreneurs by providing their name, the investment amount, percentage of equity they want and any other comments or feedbacks by them.
*API to retrieve the list of all pitches.
*API to retrieve a single pitch based on its unique ID.
