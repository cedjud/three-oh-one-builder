import { useEffect } from 'react';
import data from '../../lib/test-data-copy.json';

import useStore from '../../lib/store';

import Details from '../Details';
import SelectorOperations from '../SelectorOperations';
import InputUrls from '../InputUrls';

const Layout = () => {
	// const { selectors, operation } = useStore(state => state);

	// useEffect(() => {
	// 	console.log('selectors : ', selectors);
	// 	console.log('operations : ', operation);
	// }, [selectors, operation])

	return (
		<main>
			{/* <h1>301 builder</h1> */}
			<Details urls={data} />
			<SelectorOperations />
			<InputUrls urls={data} />
		</main>
	)
}

export default Layout;