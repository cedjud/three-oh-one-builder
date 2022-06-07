/**
 * https://stackoverflow.com/a/67148884
 * 
 * GROUP 1 ([scheme][authority][host][port])
	* GROUP 2 (scheme)
	* GROUP 3 (authority)
	* GROUP 4 (host)
	* GROUP 5 (port)
	* GROUP 6 (path)
	* GROUP 7 (?query)
	* GROUP 8 (query)
	* GROUP 9 (fragment)
*/

const parseUrl = (url) => {
	const URI_RE = /^(([^:\/\s]+):\/?\/?([^\/\s@]*@)?([^\/@:]*)?:?(\d+)?)?(\/[^?]*)?(\?([^#]*))?(#[\s\S]*)?$/;

	const parsedUrl = URI_RE.exec(url);

	const urlObject = {
		url: url,
		schemeAuthorityHostPort: parsedUrl[1],
		scheme: parsedUrl[2],
		authority: parsedUrl[3],
		host: parsedUrl[4],
		port: parsedUrl[5],
		path: parsedUrl[6],
		questionQuery: parsedUrl[7],
		query: parsedUrl[8],
		fragment: parsedUrl[9],
		queryParts: null,
		slug: null,
		pathParts: null
	}


	// works assuming that slugs DON'T have a trailing slash
	urlObject.pathPart = urlObject.path.split('/').filter(Boolean);
	urlObject.slug = urlObject.path.split('/').pop();

	// urlObject.pathPart = pathPart;
	// urlObject.slug = slug;

	if (urlObject.query) {
		const queryParts = urlObject.query.split('&').filter(Boolean);
		urlObject.queryParts = queryParts;
	}

	return urlObject;
}

export default parseUrl;