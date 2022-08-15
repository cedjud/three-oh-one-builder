import { uniq } from "lodash";

const reduceUrlParts = (parsedUrls) => {
  let hosts = uniq(parsedUrls.map((url) => url.host).sort());
  let slugs = uniq(parsedUrls.map((url) => url.slug).filter(Boolean).sort());
  let paths = uniq(
    parsedUrls
      .map((url) => url.pathPart)
      .flat()
      .filter((pathPart) => !slugs.includes(pathPart))
      .sort()
  );
  let queries = uniq(
    parsedUrls
      .map((url) => url.queryParts)
      .flat()
      .filter(Boolean)
      .sort()
  );

  const uniqueParts = {
    hosts,
    paths,
    slugs,
    queries,
  };

  return uniqueParts;
};

export default reduceUrlParts;
