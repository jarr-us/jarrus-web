# jarrus-web

What's inside:
* React + React-Redux
* Jasmine/Karma/Enzyme
* ESLint, using AirBnb + Jasmine + Jsx A11y
* Webpack, ES6 hot reloading
* React Router

## Required to Build:

**NPM Global Installs**
- gulp
- eslint
- karma-cli

## Unit Testing
Through Jasmine/Karma/Enzyme in test folder: **/*Spec.js

## Commands
**Gulp Tasks**

- gulp lint : fail fast linting of src and test folders
- gulp linter : lint on watch loop
- gulp test : runs full UNIT test sweep in Jasmine
- gulp TDD : begins running Karma Server for TDD
- gulp validate runs: lint, test

**NPM Scripts**

- dev-server : runs webpack live server on port 8080
- build:prod : builds for Production into the /public folder
- start : runs flattened project from the /public folder
- validate : runs 'gulp validate'
