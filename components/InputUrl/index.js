import styles from './styles.module.css';

import useSelectors from '../../lib/hooks/useSelectors';

const InputUrl = ({url}) => {
	const {urlIsMatched} = useSelectors(url);

	if (!urlIsMatched) {
		return null
	}
	
	return <li>{url}</li>;
}

export default InputUrl;