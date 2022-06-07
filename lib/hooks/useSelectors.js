import { useEffect, useState } from "react";

import useStore from "../store";

import { AND, OR, NOT } from "../constants";

const useSelectors = (url) => {
	const [urlIsMatched, setUrlIsMatched] = useState(false);
  const selectors = useStore((state) => state.selectors);
  const operation = useStore((state) => state.operation);

  useEffect(() => {
    if (operation === AND) {
			const isMatch = selectors.every(({selector}) => url.includes(selector));
			setUrlIsMatched(isMatch)
		}

		if (operation === OR) {
			const isMatch = selectors.some(({selector}) => url.includes(selector));
			setUrlIsMatched(isMatch)
		}

		if (operation === NOT) {
			
		}

      // console.log("selectors : ", selectorStrings);
  }, [selectors, operation, url]);

	return {
		urlIsMatched
	}
};

export default useSelectors;
