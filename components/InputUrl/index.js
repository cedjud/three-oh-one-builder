import { useEffect } from 'react';
import styles from './styles.module.css';

import parseUrl from '../../lib/utils/parseUrl';
import reduceUrlParts from '../../lib/utils/reduceUrlParts';

import useSelectors from '../../lib/hooks/useSelectors';

const InputUrl = ({url}) => {
	const {hosts, paths, slugs, queries} = reduceUrlParts([parseUrl(url)]) 
	const {urlIsMatched, matchedParts} = useSelectors(url);

	// console.log('urlParts : ', urlParts);

	useEffect(() => {
	}, [matchedParts])

	if (!urlIsMatched) {
		return null
	}
	
	return <li>
		{hosts.map((host) => <span>{host}/</span>)}
		{paths.map((path) => <span>{`${path} ` }/</span>)}
		{slugs.map((slug) => <span>{`${slug} ` }/</span>)}
		{queries.map((querie) => <span>{querie}</span>)}
		</li>;
}

export default InputUrl;