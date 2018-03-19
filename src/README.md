# Welcome to the source!
> This folder contains the guts of the app.

# index.js

This file contains the entry point of this React-based app. It sets up the [Material UI](https://github.com/callemall/material-ui) react library (for styles & themes), app container and [React Router](https://github.com/ReactTraining/react-router) (currently v4).

# state management

Component state can just get out of control in React-based apps. That's why this app uses [mobx](https://github.com/mobxjs/mobx). Mobx is a simple, scalable state management library based on the [Flux architecture](https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture). Note: It's still ok to use local state in components when needed. You may not always need mobx.

# components

These are basically what make the app. They are the visual elements of the app. The items the user sees on the screen. They come in many forms and some of them depend on others.

## pages

These components align to routes in the `App.jsx`.

## forms

The forms are heavily dependent on [mobx](https://github.com/mobxjs/mobx) and the [mobx-react-form](https://foxhound87.github.io/mobx-react-form/docs) library.

## ui

More info needed.


# utils

See [utils/README.md](utils/README.md).
