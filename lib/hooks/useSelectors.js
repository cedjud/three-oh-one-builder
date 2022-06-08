import { useEffect, useState } from "react";

import useStore from "../store";

import { AND, OR, NOT } from "../constants";

const urlIncludes = (url, selector, not, category) => {
    let match = selector;
    if (category === 'slug') {
        match = `/${selector}`
    }
    const includes = url.includes(match);
    if (not) {
        return !includes;
    } else {
        return includes;
    }
}

const useSelectors = (url) => {
    const [urlIsMatched, setUrlIsMatched] = useState(false);
    const selectors = useStore((state) => state.selectors);
    const operation = useStore((state) => state.operation);

    useEffect(() => {
        let andSelectors = selectors.filter(({operation}) => operation === AND);
        let orSelectors = selectors.filter(({operation}) => operation === OR);
        let notSelectors = selectors.filter(({operation}) => operation === NOT);

        const andMatch = andSelectors.every(({ selector, category }) => urlIncludes(url, selector, false, category));
        const orMatch = orSelectors.some(({ selector, category }) => urlIncludes(url, selector, false, category));
        const notMatch = notSelectors.every(({ selector, category }) => urlIncludes(url, selector, true, category));

        setUrlIsMatched((andMatch || orMatch) && notMatch)
    }, [selectors, operation, url]);

    return {
        urlIsMatched
    }
};

export default useSelectors;
