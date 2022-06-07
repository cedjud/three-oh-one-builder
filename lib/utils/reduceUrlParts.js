import { uniq } from "lodash";

const reduceUrlParts = (parsedUrls) => {
  let hosts = uniq(parsedUrls.map((url) => url.host));
  let slugs = uniq(parsedUrls.map((url) => url.slug).filter(Boolean));
  let paths = uniq(
    parsedUrls
      .map((url) => url.pathPart)
      .flat()
      .filter((pathPart) => !slugs.includes(pathPart))
  );
  let queries = uniq(
    parsedUrls
      .map((url) => url.queryParts)
      .flat()
      .filter(Boolean)
  );

  const uniqueParts = {
    hosts,
    paths,
    queries,
    slugs,
  };

  return uniqueParts;
};

export default reduceUrlParts;
