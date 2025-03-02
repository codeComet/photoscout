export async function searchUnsplash(query, page = 1, filterParams) {
  const apiKey = localStorage.getItem("apiKey_unsplash");
  const baseURL = "https://api.unsplash.com/";
  const per_page = 9;

  // Get URL search params
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get('q') || query;
  const urlPage = parseInt(urlParams.get('page')) || page;
  const urlWidth = urlParams.get('width') || filterParams?.width;
  const urlQuality = urlParams.get('quality') || filterParams?.quality;
  const urlOrientation = urlParams.get('orientation') || filterParams?.orientation;

  const params = {
    query: urlQuery,
    page: urlPage,
    per_page,
    q: urlQuality,
    orientation: urlOrientation,
    client_id: apiKey,
  };

  // Add additional filter parameters if they exist
  if (urlWidth !== '') params.w = urlWidth;
  if (filterParams?.height !== '') params.h = filterParams.height;

  if(urlOrientation === "square") params.orientation = "squarish";

  const searchURL = `${baseURL}search/photos/?${new URLSearchParams(params).toString()}`;
  console.log(searchURL);

  try {
    const response = await fetch(searchURL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0] || "Failed to fetch images");
    }

    return {
      results: data.results.map((image) => ({
        id: image.id,
        thumb: image.urls.thumb,
        full: image.urls.full,
        raw: image.urls.raw,
        alt: image.alt_description,
        unsplashDownloadUrl: processImageUrl(image.urls.raw, {
          width: filterParams?.width || null,
          height: filterParams?.height || null,
          q: filterParams?.quality || 100,
          orientation: filterParams?.orientation || null,
        }),
      })),
      total: data.total,
      total_pages: data.total_pages,
    };
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
}

function processImageUrl(rawUrl, params) {
  // Remove existing parameters
  let downloadUrl = rawUrl.replace(/[&?](w|h|fit|dpr|auto)=([^&]*)/g, "");
  
  // Add new parameters
  const queryChar = downloadUrl.includes("?") ? "&" : "?";
  if (params.width && params.height) {
    downloadUrl += `${queryChar}w=${params.width}&h=${params.height}&fit=max&auto=format&q=${params.q}&orientation=${params.orientation}`;
  } else if (params.width) {
    downloadUrl += `${queryChar}w=${params.width}&fit=max&auto=format&q=${params.q}&orientation=${params.orientation}`;
  } else if (params.height) {
    downloadUrl += `${queryChar}h=${params.height}&fit=max&auto=format&q=${params.q}&orientation=${params.orientation}`;
  } else {
    downloadUrl += `${queryChar}q=${params.q}&auto=format&orientation=${params.orientation}`;
  }
  
  return downloadUrl;
}