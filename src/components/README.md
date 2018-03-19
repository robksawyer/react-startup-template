# components
> The building blocks of the app.

# DataWrapper & Protected Components

First off, these two components are very different from the others. To use them, follow the steps below.

1. Import the component via `import from '../DataWrapper';` for the component you're trying to use with.
1. Add `@DataWrapper` above `@observer` (if it exists) and above the class declaration e.g. `export default class MyComponent extends Component...`.
1. Enjoy.

## DataWrapper
The `DataWrapper` component has the specific job of requesting data from the API at the same path as navigated to. If you open it up, you'll see that it's not magic, but instead when the component mounts (via `componentDidMount`), the following is run.
```
let pathname = this.props.match.url;
let id = this.props.match.id ? this.props.match.id : null;

// Make the server API call here.
this.store.fetchData(pathname, id);
```

## Protected
This might be the most handy component. When you wrap a component with `@Protected`, it checks to see if the user has been authenticated. If not, it redirects the user to the login form.

# Helpers

You can create a new component by running `yarn mobx-component NameOfComponent`. See the `scripts` section of `package.json` for more.
