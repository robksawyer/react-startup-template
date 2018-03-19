# React-based Startup Template
> A template for startups.

## See it in action
## [Live Demo](http://react-startup-template.surge.sh)

# Development

## Getting Started

1. Open `./index.hbs`, update the page title, and replace `GTM-XXXXXXX` plus http://www.mystartup.com with your [Google Tag Manager](https://www.google.com/analytics/tag-manager/) code and startup domain.
1. Add environment variables by copying `.env-sample` to `.env` and updating the contents.
1. Run `yarn install` and `yarn start`
1. Navigate to <http://localhost:3001> to see it in action.

## App Deployment (to Production)
1. Run `yarn run deploy`.

## Or
1. To just build, run `yarn run build`.
1. To preview locally run `yarn run preview`, then go to <http://localhost:3001> for the minified production bundle.
1. To just deploy on [Surge.sh|https://surge.sh] run `yarn run surge`.

# Technology Stack

This app is using the following major pieces of technology. You will need to have a base level of understanding of these before developing.

* [[React](https://facebook.github.io/react/)|https://facebook.github.io/react/] / Main user interface library.
* [[MobX](https://mobx.js.org)|https://mobx.js.org] / Manages the application state.
* [[React-Router 4](https://reacttraining.com/react-router/)|https://reacttraining.com/react-router/] / Navigational components.
* [[Webpack 3](https://webpack.js.org/)|https://webpack.js.org/] / Helps to build the whole project.

## State related dependencies

* [mobx-react](https://github.com/mobxjs/mobx-react)] / React bindings for MobX

## Injecting Environment variables

Environment variables are injected via the Webpack configs. The `.env` is loaded there and then passed via the `webpack.DefinePlugin`.

Like this:
```
new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("local"),
    API_CLIENT_ID: JSON.stringify(process.env.API_CLIENT_ID),
    API_CLIENT_SECRET: JSON.stringify(process.env.API_CLIENT_SECRET),
    API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
    API_TIMEOUT: JSON.stringify(process.env.API_TIMEOUT),
    PORT: JSON.stringify(process.env.PORT),
    CLOUDINARY_URL: JSON.stringify(process.env.CLOUDINARY_URL),
  }
}),
```

## Stylesheets

Each component can contain its own stylesheet. Most of the components in the app depend on [tachyons|http://tachyons.io/].

### Icons

The app is using [gorangajic/react-icons](https://github.com/gorangajic/react-icons#configuration) for icons. This should be plenty.

## Hosting

The app is currently being hosted on [Surge.sh|https://surge.sh]. Like Heroku has helped make the lives of back-end developers easier, Surge is doing this for front-end developers. Surge offers a command line tool that is a requirement for deploying the app.

See the `package.json` scripts section `surge`.

## Async component loading
Components are now loaded async with [react-router-loader|https://github.com/luqin/react-router-loader] and the store is injected via [MobX|https://github.com/mobxjs/mobx] Provider.
If you've downloaded this boilerplate before remember to run `yarn install` again.

# Development

## Workflow: Scaffolding

There are a number of scripts setup that make generating components easy. You can find these in `package.json` (see scripts) and `gulpfile.js`. Basically, the `yarn` tool is reading the `package.json` scripts section and is allowing you to, with a shortcut, run the tasks added in `gulpfile.js`.

### Helpful scaffolds

* Create a new mobx component
** `yarn mobx-component MyComponent`

* Create a new page component
** `yarn page-component MyPage`

* Create a new form component
** `yarn form-component MyForm --route route-to-my-form`

## Workflow: Create a New Page

1. Create a new component that will load when a route is connected to.
1. Create a new route inside of `src/components/App.jsx` that points to your component.
> An example route is below. You can copy and paste an existing route.
```
<Route
    exact
    path="/purchase"
    render={props => (
        <LazyRoute {...props} component={import("./PurchaseService")} />
    )}
/>
```

## Deploying to AWS

If you are using third-party integrations like Stripe or Typeform to capture user information there is no need to write your on backend and you can simply copy your `public/` directory to an AWS S3 bucket and enable [Static Website Hosting](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html). You can use a script such as this to minifify and upload:


```bash
#! /usr/bin/env bash

S3_BUCKET=s3://www.nealjs.com
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../" && pwd)"
cd $BASE_DIR

# Build the assets
webpack -p

# Upload to S3
aws s3 cp $BASE_DIR/public/ $S3_BUCKET --recursive
```

## Notifications

For notifications, we're using the [react-notification-system](https://github.com/igorprado/react-notification-system). This allows us to easily notify the user when something has been changed.


#### Read this if you've been using an earlier version of this code

* 05/03/17 - Hot reloadable MobX stores
* 04/04/17 - Upgraded to React Router 4 @ latest
* 01/31/17 - Upgraded to React Router 4 Beta
* 01/28/17 - Routes are now loaded through [Lazy-Route](https://github.com/mhaagens/lazy-route).

## Todo

- [X] Upgrade to Webpack 3
- [X] Async loading of components
- [X] Data fetching example
- [X] Protected Routes


# Further Reading
- [React Lifecycle Methods- how and when to use them](https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1)
- [Accept Stripe Payments with React and Express](https://www.robinwieruch.de/react-express-stripe-payment/)
- [Index as a key is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)
