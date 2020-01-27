# Job-Postings-Locator

This is a full-stack application that allows users to search the Jooble API for job postings and display the locations of the job openings on the Google Maps API.
---

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Built With](#built-with)

## Organization of the Application

The application uses Bootstrap for the user interface. The application searches Jooble's API, gets those result's latitude and longitude from the Google Places API, and displays the results on the Google Maps API. The database stores results. Express handles routing in the node backend. jQuery handles DOM manipulation. BCryptJS hashes and salts the passwords for secure password storage on the MySQL database. Sequelize acts as an ORM. A local Passport strategy creates an express session which authenticates and stores the user's account information. Axios handles http requests. 

## Getting Started

In order for this application to run on your local computer, you must have Node.js installed and a MySQL database server as well as the required node modules. 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Node.js and MySQL and the required packages are needed to run this application locally.  

### Clone

- Clone this repo to your local machine using `https://github.com/dayadam/Job-Postings-Locator.git`

---

## Installation

### MySQL Server Installation Guide (Windows)

* Head to <https://dev.mysql.com/downloads/windows/installer/8.0.html>

* Select Windows (x86, 32-bit), MSI Installer (16.3 M)

* Click “No thanks, just start my download.”

* Navigate to where the file was downloaded and double-click to run the installer. If you get prompted for an update, proceed with the upgrade.

* When you get to the License Agreement screen, Accept the license terms and click “Next”

* Click the “+” next to “MySQL Servers” to expand it, expand “MySQL Server”, expand “MySQL Server 8.0”, and finally select “MySQL Server 8.0.12 – X64” and click the right arrow to add it to the “Products/Features To Be Installed” section.

* Click “Execute”

* When the status says “Complete”, click “Next”.

* At the product configuration screen, click “Next” again.

* Select “Standalone MySQL Server / Classic MySQL Replication” and click “Next”

* For Type and Networking, don’t change anything and click “Next”

* **IMPORTANT**: Make sure to select “Use Legacy Authentication Method (Retain MySQL 5.x Compatibility) and click “Next”

* Create a root password. WARNING. Do not forget this password! After entering a password, click “Next”

* When you get to the Windows Service screen, don’t change anything and click “Next”

* Finally, click “Execute” to apply the changes.

* You can verify that the installation was correct by going to Git Bash and typing “mysql –V”. The path followed by the version should show up.

### MySQL Server Installation Guide (Mac)

* Head to <https://dev.mysql.com/downloads/mysql>

* Scroll down and find macOS 10.14 (x86, 64-bit), DMG Archive and click “Download”.

* Click “No thanks, just start my download.”

* Open the .DMG file and go through the installation process.

* Click “Continue” to get to the Software License Agreement Screen.

* Click “Continue” to agree with the Software License Agreement and click “Agree”.

* Click “Install” and input your password to allow the installer to continue.

* **IMPORTANT**: Make sure to select “Use Legacy Password Encryption” and click “Next”.

* Create a root password. WARNING. Do not forget this password! After entering a password, make sure to check the box to "Start server on installation"

* Click “Finish”.

* You can verify that the installation was correct by going to “System Preferences” and the MySQL icon should show up at the bottom.

* Click the MySQL Icon in "System Preferences". This will bring up a GUI in which you can Start or Stop your server. You can also set it to start server when you turn on your computer.

### Install Node and packages

- install Node.js from <https://nodejs.org/en/>

> install npm packages

```shell
$ npm install
```

## Usage

Users can search job titles and locations to display them on the map.

## Built With

* [Node](https://nodejs.org/en/) - Server runtime environment for JavaScript
* [Express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
* [jQuery](https://jquery.com/) - Fast, small, and feature-rich JavaScript library
* [Bootstrap](https://getbootstrap.com/) - CSS framework directed at responsive, mobile-first front-end web development
* [MySQL](https://www.mysql.com/products/community/) - Open-source relational database
* [Sequelize](https://www.npmjs.com/package/sequelize) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. 
* [Axios](https://www.npmjs.com/package/axios) - Package used for server side http requests to APIs 
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Package used for hashing and salting passwords for storage
* [Passport](https://www.npmjs.com/package/passport) - User authentication package
* [Express-session](https://www.npmjs.com/package/express-session) - Create a session middleware with given options
* [Jooble API](https://jooble.org/api/about) - Access and integrate Jooble's search results
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) - Customize maps with your own content and imagery for display on web pages and mobile devices

## Authors

* **Ugochinyere Anazodo** - *HTML Form* - [Ugochinyere Anazodo](https://github.com/ugo070)
* **Dan Cornnell** - *Models, Controllers* - [Dan Cornnell](https://github.com/dcornnell)
* **Adam Day** - *Frontend logic* - [Adam Day](https://github.com/dayadam)
* **Steven Rostkowski** - *Google Maps API* - [Steven Rostkowski](https://github.com/atomguy18)

## Acknowledgments

* Thanks to all the open source contributors that helped with the building blocks of this project. 
 