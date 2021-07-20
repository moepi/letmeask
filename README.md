<h1 align="center">
	<img alt="letmeask" title="letmeask" src="public/logo.png" />
</h1>

<p align="center">
	<img src="https://img.shields.io/static/v1?label=NLW&message=06&color=8257E5&labelColor=000000" alt="NLW 06" />
</p>

## Project

Letmeask is a web application to create Q&A rooms with ranked questions to help streamers. The project was developed during Next Level Week Together [Next Level Week #06 Together](https://nextlevelweek.com/) (ReactJS), event presented by [Rocketseat](https://rocketseat.com.br/).

To complement the project I developed: toast notifications, logout flow, room reopen flow, listing of user rooms, permission rules for accessing links and interaction rules with the room.

<br>

## Technologies

This project was developed using the following technologies:

- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [SASS](https://sass-lang.com/install)

## Layout

You can view the project layout through [this link](https://www.figma.com/file/u0BQK8rCf2KgzcukdRRCWh/Letmeask/duplicate). You must have an account at [Figma](http://figma.com/) to access it.

## How to execute

- First, you need install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/).
- Clone the repository `git clone https://github.com/rafaelthz/letmeask-nlw6.git`
- Access the folder `cd letmeask-nlw6`
- Install the dependencies with `yarn`
- Create a `.env.local` file and add the yours Firebase SDK configs - see more on the [docs](https://firebase.google.com/docs)
- Start the server with `yarn start`

Now you can access [`localhost:3000`](http://localhost:3000) in your browser.
Remembering that it will be necessary to create an account in Firebase and a project to make a Realtime Database available.

---

Inspired by [Rocketseat Education](https://github.com/rocketseat-education/nlw-06-reactjs).
