# utils
> Utilities that can be shared across the app.

## constants
These are pretty self explanatory and basically just that, constants that the app components can use.

## request
When http, api data retrieval or external server fetches need to happen, they should all be going through request. This'll make it easy to swap out the http client later if needed.

# FAQs

## What http client is currently being used?
> The app is using [axios](https://github.com/mzabriskie/axios), which is a promise-based HTTP client.

## How do I use a utility?
> Like any other Javascript, just import. See the example below.
```
import { apiEndpoint, cloudinaryEndpoint, cloudinaryCloudName } from "../../utils/constants";

var myEndpoint = apiEndpoint + '/something-else';
```
or
```
import request from '../utils/request';

// Make a fetch request. Note: This needs to be in a method using `async` e.g. `async fetchData(pathname, id, withKeys) {...`
let { data } = await request.get(`${pathname}`, options);
console.log(data);
```
