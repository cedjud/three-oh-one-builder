import { useEffect } from "react";
import useStore from "../../lib/store";

import { AND, OR, NOT } from "../../lib/constants";

const SelectorOperation = ({ selector, operation }) => {
	const updateSelectorOperation = useStore(state => state.updateSelectorOperation);

	const handleChange = ({target}) => {
		updateSelectorOperation({selector, operation: target.value})
	}

  return (
    <span>
      {selector}
      <select value={operation} onChange={handleChange}>
        <option value={AND}>{AND}</option>
        <option value={NOT}>{NOT}</option>
        <option value={OR}>{OR}</option>
      </select>
    </span>
  );
};

const SelectorOperations = () => {
  const { selectors, operation } = useStore((state) => state);

  useEffect(() => {
    console.log("selectors : ", selectors);
    console.log("operations : ", operation);
  }, [selectors, operation]);

  return (
    <div>
      {selectors.map(({ selector, operation }, index) => (
        <SelectorOperation
          key={`selector-operation-${selector}-${index}`}
          selector={selector}
					operation={operation}
        />
      ))}
    </div>
  );
};

export default SelectorOperations;
