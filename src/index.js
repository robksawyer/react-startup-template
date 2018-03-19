import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { rehydrate, hotRehydrate } from 'rfx-core';

import { isProduction } from './utils/constants';
import stores from './stores/stores';

// Components
import App from './components/App.jsx';

// Timezone info
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

// Theme related
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Rehydrate stores. To be used on client side.
// @see https://github.com/foxhound87/rfx-core/blob/master/DOCUMENTATION.md#rehydrate
const store = rehydrate();

const renderApp = Component => {

	/**
	 Enables MobX strict mode globally.
	 In strict mode, it is not allowed to
	 change any state outside of an action
	*/
	// useStrict(true);

	momentLocalizer(moment);
	injectTapEventPlugin();

	render(
		<MuiThemeProvider>
			<AppContainer>
				<Router>
					<Provider store={isProduction ? store : hotRehydrate()}>
						<App />
					</Provider>
				</Router>
			</AppContainer>
		</MuiThemeProvider>,
		document.getElementById("root") // eslint-disable-line
	);
};

renderApp(App);

if (module.hot) {
	module.hot.accept(() => renderApp(App));
}
