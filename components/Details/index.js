import useStore from '../../lib/store';

import Category from "../Category";

const Details = () => {
  const { filters } = useStore();

  return (
    <div className="details">
      {filters &&
        Object.entries(filters).map(([key, value], index) => {
          return (
            <Category
              key={"filter-" + index}
              label={key}
              items={value}
              open={key === 'paths'}
            />
          );
        })}
    </div>
  );
};

export default Details;
