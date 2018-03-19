# stores
> These can be a bit confusing if you're new to React or data bound apps. However,
these are really nothing more than a local memory reference to certain variables or functions (possibly other things). Stores can be found in any [Flux architecture](https://facebook.github.io/flux/) and can be compared a bit with controllers in the MVC pattern. The main responsibility of stores is to move logic and state out of your components into a standalone testable unit that can be used in both frontend and backend JavaScript.

## `AppStore.js`
The AppStore contains shareable logic that is a bit more app specific.

## `PurchaseGalleryStore.js`
The PurchaseGalleryStore contains logic that is specific to the purchase image gallery. I may move this into it's own local React state and remove mobx because it'll make the component a bit more pure and shareable.

## `UserStore.js`
The UserStore contains shareable logic that is user specific.

## `FormStore.js`
The FormStore contains shareable logic that is form specific.


# FAQs

## Where do I use stores?
> Stores are used in components that need to have access to data from another component.

## How do I use a store in my component?
Well, because this app is using [mobx](https://mobx.js.org) and [mobx-react](https://github.com/mobxjs/mobx-react).

## Does store in mobx refer to state in React?
> You can store the state wherever it makes sense for your application. If state is only local to your component, then it makes sense to use React state.

## I read that mobx depends on shouldComponentUpdate in React , is it true?
> You can read about it <https://github.com/mobxjs/mobx-react>.
