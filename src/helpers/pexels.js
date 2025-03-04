export async function searchPexels(query, page = 1, filterParams) {
  const apiKey = localStorage.getItem("apiKey_pexels");
  const baseURL = "https://api.pexels.com/v1";
  const per_page = 9;

  // Get URL search params
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get("q") || query;
  const urlPage = parseInt(urlParams.get("page")) || page;
  const urlWidth = urlParams.get("width") || filterParams?.width;
  const urlHeight = urlParams.get("height") || filterParams?.height;
  const urlOrientation =
    urlParams.get("orientation") || filterParams?.orientation;

  const params = {
    query: urlQuery,
    page: urlPage,
    per_page,
  };

  // Add additional filter parameters if they exist
  if (urlOrientation) params.orientation = urlOrientation;
  if (urlWidth) params.width = urlWidth;
  if (urlHeight) params.height = urlHeight;

  const searchURL = `${baseURL}/search?${new URLSearchParams(
    params
  ).toString()}`;

  console.log(searchURL);

  try {
    const response = await fetch(searchURL, {
      headers: {
        Authorization: apiKey,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch images from Pexels");
    }

    return {
      results: data.photos.map((photo) => ({
        id: photo.id,
        thumb: photo.src.tiny,
        full: photo.src.original,
        raw: photo.src.original,
        alt: photo.alt,
        pexelsDownloadUrl: processImageUrl(photo.src.original, {
          width: filterParams?.width || null,
          height: filterParams?.height || null,
          orientation: filterParams?.orientation || null,
        }),
      })),
      total: data.total_results,
      total_pages: Math.ceil(data.total_results / per_page),
    };
  } catch (error) {
    throw new Error(`Error fetching images from pexels: ${error.message}`);
  }
}

function processImageUrl(rawUrl, params) {
  // Remove existing parameters
  let downloadUrl = rawUrl.replace(/[?&]w=\d+/g, "").replace(/[?&]h=\d+/g, "");

  // Add new parameters
  const queryChar = downloadUrl.includes("?") ? "&" : "?";
  if (params.width && params.height) {
    downloadUrl += `${queryChar}width=${params.width}&height=${params.height}&fit=min`;
  } else if (params.width) {
    downloadUrl += `${queryChar}width=${params.width}&fit=min`;
  } else if (params.height) {
    downloadUrl += `${queryChar}height=${params.height}&fit=min`;
  }

  return downloadUrl;
}
