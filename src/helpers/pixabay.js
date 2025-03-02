export async function searchPixabay(query, page = 1, filterParams) {
  const apiKey = localStorage.getItem("apiKey_pixabay");
  const baseURL = "https://pixabay.com/api/";
  const per_page = 9;

  // Get URL search params
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get("q") || query;
  const urlPage = parseInt(urlParams.get("page")) || page;
  const urlWidth = urlParams.get("width") || filterParams?.width;
  const urlHeight = urlParams.get("height") || filterParams?.height;
  const urlQuality = urlParams.get("quality") || filterParams?.quality;
  const urlOrientation =
    urlParams.get("orientation") || filterParams?.orientation;

const orientation = {
  landscape: "horizontal",
  portrait: "vertical",
  square: "vertical",
}

  const params = {
    key: apiKey,
    q: urlQuery,
    page: urlPage,
    per_page,
    image_type: "photo",
  };

  // Add additional filter parameters if they exist
  if (urlOrientation) params.orientation = orientation[urlOrientation] || 'all';
  if (urlWidth) params.min_width = urlWidth;
  if (urlHeight) params.min_height = urlHeight;

  const searchURL = `${baseURL}?${new URLSearchParams(params).toString()}`;
  console.log(searchURL);

  try {
    const response = await fetch(searchURL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0] || "Failed to fetch images");
    }

    return {
      results: data.hits.map((image) => ({
        id: image.id,
        thumb: image.previewURL, // Small preview image
        full: image.largeImageURL, // Full-size image
        raw: image.webformatURL, // Closest to Unsplash's 'raw' image
        alt: image.tags,
        pixabayDownloadUrl: getResizedPixabayImage(image.webformatURL, {
          width: urlWidth || null,
          height: urlHeight || null,
          q: urlQuality || 100,
        }),
      })),
      total: data.totalHits,
      total_pages: Math.ceil(data.totalHits / per_page),
    };
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
}

// Function to modify image URL for resizing
function getResizedPixabayImage(originalUrl, params) {
  if (!originalUrl) return originalUrl;

  let newUrl = new URL(originalUrl);

  // Pixabay's CDN supports resizing using query parameters
  if (params.width) newUrl.searchParams.set("w", params.width);
  if (params.height) newUrl.searchParams.set("h", params.height);
  if (params.q) newUrl.searchParams.set("q", params.q); // Quality (default is 100)

  return newUrl.toString();
}
