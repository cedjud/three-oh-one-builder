import create from "zustand";

import data from "../../lib/test-data-copy.json";

import parseUrl from "../../lib/utils/parseUrl";
import reduceUrlParts from "../../lib/utils/reduceUrlParts";

import { AND, OR, NOT } from "../../lib/constants";

let parsedUrls = data.map(parseUrl);
let uniqueParts = reduceUrlParts(parsedUrls);

const useStore = create((set) => ({
  filters: uniqueParts,
  selectors: [],
  operation: AND,

  setOperation: (operation) => set((state) => ({ operation })),
  activateSelector: (selector, category, operation = AND) =>
    set((state) => ({
      selectors: [
        ...state.selectors,
        {
          selector,
          category,
          operation,
        },
      ],
    })),
  deactivateSelector: (selector, category) =>
    set((state) => {
      const filteredSelectors = state.selectors.filter(
        (item) => !(item.selector === selector && item.category === category)
      );

      return {
        selectors: filteredSelectors,
      };
    }),
  updateSelectorOperation: ({ selector, operation }) =>
    set((state) => {
      const mappedSelectors = state.selectors.map((item) => {
        let returnedItem = {...item};
        if (item.selector === selector) {
          returnedItem.operation = operation;
        } 
        return returnedItem;
      });

      return {
        selectors: mappedSelectors
      }
    }),
}));

export default useStore;
