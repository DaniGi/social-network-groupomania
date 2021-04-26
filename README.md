# Grouporama

Enterprise social network designed to create a sense of community among employees.

## Table of Contents
- [Tech Stack](#Tech&nbsp;Stack)
- [Installation](#Installation)
  - [Server](#Server)
  - [Database](#Database)
  - [Client](#Client)
- [Usage](#Usage)
  - [First Log In](#First-Log-In)
  - [Header](#Header)
  - [Home page](#Home-page)
  - [User page](#User-page)
---

## Tech Stack

**Client**: React, Bootstrap, SASS

**Server**: Node, Express

**Database**: MySQL, Sequelize

---

## Installation
<details>
  <summary>Click to expand</summary>
  
  First, clone the repository: 

  `git clone https://github.com/DaniGi/social-network-groupomania.git`

  Then, `cd` into the project's root directory:

  `cd ./social-network-groupomania`

  ### **Server**

  In the project's root directory, named _social-network-groupomania_, type:

  ```
  cd ./server

  npm install

  mkdir images

  touch .env
  ```
  Then, add the following enviroment variables to the .env file:

  ```
  MYSQL_PASSWORD=yourPassword
  MYSQL_USER=yourUser
  MYSQL_HOST=yourhost

  RANDOM_TOKEN_SECRET=yourRandomTokenSecret
  ```

  ### **Database**

  First make sure to have access to a MySQL Server (installed on your machine or running in a Docker container, for example).

  Then, edit the .env file enviroment variables
  ```
  MYSQL_PASSWORD=yourPassword
  MYSQL_USER=yourUser
  MYSQL_HOST=yourHost
  ```
  with:
  - yourPassword replaced with the password you have to the MySQL Server
  - yourUser replaced with the username you have to the MySQL Server
  - yourHost replaced with your MySQL Server host

  Then, login to your MySQL Server and copy/paste the content of `./server/MySQL/completeDB.sql`. This will create a database named _groupomania_ and its tables, populated with some test data.

  Finally, type: `npm start`

  ### **Client**

  In the project's root directory, named _social-network-groupomania_, type:

  ```
  cd ./client

  npm install

  npm start
  ```
  Visit http://localhost:3000.
</details>

---

## Usage
<details>
  <summary>Click to expand</summary>
  
  ### **First Log In**

  The first time you visit http://localhost:3000 you will be automatically redirected to the Log In page.

  ![Log In page](https://github.com/DaniGi/DanieleGioria_7_03122020/blob/main/screenshots/login-page.JPG)

  There you can either Log In with user's credentials already in the database, for example:

  ```
  Email: admin@admin.fr
  Password: adminadmin
  ```
   or Sign Up a new user and then Log In with the newly created user.

   ### **Header**

  ![header](https://github.com/DaniGi/DanieleGioria_7_03122020/blob/main/screenshots/header.JPG)

  1. Firm's logo with a link to the Home page
  2. Search field that you can use to search posts by username
  3. 'Create' button: when clicked it displays a card that let you create a new post with some text and/or an image/GIF

  ![create post card](https://github.com/DaniGi/DanieleGioria_7_03122020/blob/main/screenshots/create-post-xl.JPG)

  4. 'Username' button with a link to the User page
  5. 'Log Out' button that will end the current user's session and redirect you to the Log In page

  ### **Home page**

  ![Home page](https://github.com/DaniGi/DanieleGioria_7_03122020/blob/main/screenshots/home-page.JPG)

  The Home page displays all users' posts. To each post corresponds a Card with:

  1. User name
  2. Time passed since the post was created (it automatically updates on page new render)
  3. Dropdown menu*
  4. Post content
  5. Number of likes
  6. 'Like' button
  7. 'Share' button (disabled)
  8. 'Show/Hide comments' button to toggle comments' list
  9. Comment textarea to write a new comment
  10. Comment content with a dropdown menu*

  *when clicked it displays two actions: modify and delete. Note that this dropdown menu is displayed only for posts/comments that the logged user has created, unless you are logged in as admin. The admin can modify and delete all posts and comments.

  ### **User page**

  ![user page](https://github.com/DaniGi/DanieleGioria_7_03122020/blob/main/screenshots/user-page.JPG)

  The User page displays all user's posts.

  It also display a user card with:

  1. User profile picture
  2. User name
  3. Number of post created
  4. 'Delete Account' button
</details>
