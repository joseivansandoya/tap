# TAP
TAP is an experimental fullstack JavaScript project that attempts to use the last features of React framework, unit testing and some cool Node libraries like inquirer, chalk and blessed.
For the frontend it has been used React.js
For the backend it has been used Express
![Cover image](https://github.com/joseivansandoya/tap/blob/master/static/cover.jpg)

## About ℹ️
This project will show you a simple web page with three main sections:
1) Maintainance: here you can configure a simple mobile layout that will be shown in the Preview section.
2) Preview: this section will show you the result of your maintainance configuration. In this preview you can interact with the Header, Body and Footer area of the mobile viewport and the system will keep a count of your interactions.
3) Metrics: here you can see the interactions report of the last configuration you made.

## Running project 🚀
After clonning this project, please proceed to install it
```
npm install
```
Once installed you just have to run it in dev mode, since experimental I have activated Nodemon so you can see live logging 🤓
```
npm run start:dev
```
Now what `start:dev` does is concurrently run two other scripts, which are `npm run server` (Express) and `npm run start` (CRA - React)
Some unit tests are also available
```
npm t
```
### CLI script
Metrics are also available in a CLI format!
```
npm run metrics
```
And you will be displayed an interface to view the metrics.

## Architecture 📐
This is a simple fullstack project that is organized in the following way
### Frontend
It uses React 16.8 (via CRA - Create React Application) for the componetization structure, for the styles it uses Styled Components and for unit testing it uses Jest and Enzyme.
Instead of using Redux and considering the small size of the project it was decided to use the new React Context API.
Some unit tests are available, they were built using the Jest and Enzyme library.
### Backend
It mainly uses Next for deploying a simple web server.
This project doesn't make use of any database so it emulate this process by interacting with a `data.json` file.
Since frontend and backend must be running simultaneously it was used a libaray named `concurrently`.
### CLI
This is a pure Node implementation wich make use of some cool libraries like 
- Inquirer: usesful for requesting input from the user in an easier way.
- Chalk: used for stylizing some texts in the terminal.
- Bessed: a cool library that lets you render tables, lists and some other interesting stuf.

👍🏻 Thanks for looking at this experimental project, if you have doubts or comments please fell free to write to me at: jisandoya@gmail.com
