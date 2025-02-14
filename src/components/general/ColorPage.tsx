export type Color = "tertiary" | "secondary" | "primary" | "blank";
export type ColorHex = "#1e5741" | "#7BC1DC" | "#FF8E3E";

export function getColor(location: Location, returnHex: boolean = false): Color | ColorHex {
    const searchParams = new URLSearchParams(location.search);
    const serviceType = searchParams.get("serviceType");

    // Check for serviceType in query params OR specific pathname conditions
    const isTaxonomicExpert = serviceType === "taxonomicExpert" || location.pathname.includes("/te");
    const isReferenceCollection = serviceType === "referenceCollection" || location.pathname.includes("/tc");

    if (returnHex) {
        return isReferenceCollection ? "#1e5741" :
               isTaxonomicExpert ? "#7BC1DC" :
               "#FF8E3E"; // Default primary color (hex)
    }

    return isReferenceCollection ? "secondary" :
           isTaxonomicExpert ? "tertiary" :
           "primary"; // Default primary class
}
