
// Images
// https://sia.codes/posts/eleventy-and-cloudinary-images/
// TODO: Set up {% defaultSizes %} as per paragraph that begins:
// "The sizes attribute can be tricky to write by hand..."

// Set constants for the Cloudinary URL and fallback widths for images when not supplied by the shortcode params
const CLOUDNAME = "dannywhite"
// Assume we're looking directly in the 'notes' folder
const FOLDER = "notes/"
const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`;
// TODO: Why is each photo going with 1360 despite me passing in a 'width' attribute?
const FALLBACK_WIDTHS = [300, 600, 680, 1360];
const FALLBACK_WIDTH = 680;

// Generate srcset attribute using the fallback widths or a supplied array of widths
function getSrcset(file, widths) {
    const widthSet = widths ? widths : FALLBACK_WIDTHS
    return widthSet.map(width => {
        return `${getSrc(file, width)} ${width}w`;
    }).join(", ")
}
// Generate the src attribute using the fallback width or a width supplied
// by the shortcode params
function getSrc(file, width) {
    return `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`
}

// Export the two shortcodes to be able to access them in our Eleventy config
// I've prepended these with `ext` to make it clear that this is coming externally, from Cloudinary
module.exports = {
    extSrcset: (file, widths) => getSrcset(file, widths),
    extSrc: (file, width) => getSrc(file, width),
}
