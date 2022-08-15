import { useEffect, useState } from "react";

import useStore from "../store";

import parseUrl from "../utils/parseUrl";
import reduceUrlParts from "../utils/reduceUrlParts";


import { AND, OR, NOT } from "../constants";

const urlIncludes = (url, selector, not) => {
    let match = selector.selector;

    if (selector.category === 'slug') {
        match = `/${selector}`
    }
    const includes = url.includes(match);
    if (not) {
        return !includes;
    } else {
        return includes;
    }
}

const urlPartsInclude = (urlParts, selector, not) => {
	// console.log(urlParts[selector.category].includes(selector.selector))
	return urlParts[selector.category].includes(selector.selector);
	// console.log(urlParts);
	// console.log(selector);
}

const useSelectors = (url) => {
    const [urlIsMatched, setUrlIsMatched] = useState(false);
		const [matchedParts, setMatchedParts] = useState([])
    const selectors = useStore((state) => state.selectors);
    const operation = useStore((state) => state.operation);

    useEffect(() => {
			const parsedUrls = parseUrl(url);
			const uniqueParts = reduceUrlParts([parsedUrls]);

			let andSelectors = selectors.filter(({operation}) => operation === AND);
			let orSelectors = selectors.filter(({operation}) => operation === OR);
			let notSelectors = selectors.filter(({operation}) => operation === NOT);

			const andMatch = andSelectors.every((selector) => urlPartsInclude(uniqueParts, selector));
			const andMatches = andSelectors.filter((selector) => urlPartsInclude(uniqueParts, selector));

			const orMatch = orSelectors.some((selector) => urlPartsInclude(uniqueParts, selector));
			const orMatches = orSelectors.filter((selector) => urlPartsInclude(uniqueParts, selector));

			const notMatch = notSelectors.every((selector) => !urlPartsInclude(uniqueParts, selector));

			setUrlIsMatched((andMatch || orMatch) && notMatch);
			setMatchedParts([...andMatches, ...orMatches]);
    }, [selectors, operation, url]);

    return {
        urlIsMatched,
				matchedParts
    }
};

export default useSelectors;
