export const getImageSource = (
  logoFolder: string,
  logo: string | undefined,
  withUniqueId = false
) => {
  if (!logo || logo.trim() === "") return "";

  const folder = logoFolder ?? "";

  let uniqueIdQueryParameter = "";

  if (withUniqueId) {
    const timestamp = new Date();
    uniqueIdQueryParameter = `?uniqueid=${timestamp.toISOString()}`;
  }

  return `s3-url/${folder}${logo}${uniqueIdQueryParameter}`;
};
