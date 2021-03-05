export function openGoogleResults(query: string) {
    const transformedQuery = query
        .trim()
        .split(/\s/)
        .map(encodeURIComponent)
        .join("+")

    const googleUrl = "http://www.google.com/search?"

    const parameters = [
        "as_sitesearch=leodriesch.com/blog",
        `q=${transformedQuery}`,
    ]

    window.open(googleUrl + parameters.join("&"), "_blank")
}
