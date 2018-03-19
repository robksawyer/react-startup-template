/**
 * stores.js
 * Handles bringing all of the states together into a single callable method.
 *
 * Dependencies
 *
 * rfx-core: Collection of core functionalities of RFX Stack.
 * @see https://github.com/foxhound87/rfx-core
 *
 * RFX State?
 * @see https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md
 *
 */
import { store } from "rfx-core";

import AppStore from "./AppStore";
import FormStore from "./FormStore";

export default store.setup({
	appStore: AppStore,
	formStore: FormStore,
});
