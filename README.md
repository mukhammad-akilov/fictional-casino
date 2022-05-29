# Getting Started with Fictional Casino

![Fictional Casino](./.github/screenshots/desktop1.png?raw=true "Fictional Casino")

SPA for Fictional Casino using following technologies:

⭐HTML, CSS, SCSS

⭐JavaScript, React, TypeScript

⭐Material UI 5

⭐Redux Toolkit, Redux Saga

⭐Light, Dark and System Mode theme colors

⭐Respoinse layout



## ! Important Note
The project was developed for two days, since on weekdays I was loaded with the main work. So there are some bugs and improvments that should be apply

-Redux Saga bug with infinite lopp in generator fucntion when calling yield

-React Suspense issue with React 18

-Redux extra renders (should use reselect with Redux Toolkit)

-Configure EsLint and Prettier

-Add test (unit and integration tests) using Jest with React Testing Library

### Project Structure

```shell
./src
├── App.tsx # Application entrypoint
├── assets # assets folder contains all the static files (images, fonts, etc).
├── components # shared components
├── customHooks # shared hooks
├── interfaces  # contains TS interfaces
├──  store # root store and store settings
├──  utils # contanins utils functions
```

## Screenshots

![Fictional Casino](./.github/screenshots/desktop1.png?raw=true "Fictional Casino")

![Fictional Casino](./.github/screenshots/desktop2.png?raw=true "Fictional Casino")

![Fictional Casino](./.github/screenshots/desktop3.png?raw=true "Fictional Casino")

![Fictional Casino](./.github/screenshots/desktop4.png?raw=true "Fictional Casino")

![Fictional Casino](./.github/screenshots/desktop5.png?raw=true "Fictional Casino")

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![Fictional Casino](./.github/screenshots/mobile1.jpg?raw=true "Fictional Casino")

![Fictional Casino](./.github/screenshots/mobile2.jpg?raw=true "Fictional Casino")

![Fictional Casino](./.github/screenshots/mobile4.jpg?raw=true "Fictional Casino")

![Fictional Casino](./.github/screenshots/mobile6.jpg?raw=true "Fictional Casino")

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
