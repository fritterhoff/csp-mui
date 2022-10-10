import {
    chain,
    chainMatch,
    isPageRequest,
    csp,
    strictDynamic,
    strictInlineStyles,
    telemetry,
    chainableMiddleware,
    
} from "@next-safe/middleware";
import { getCreateCtxNonceIdempotent, getCtxNonce } from "@next-safe/middleware/dist/document";
import { cachedCspBuilder, cachedCspManifest } from "./utils";

const geoBlockMiddleware = () =>
    chainableMiddleware(async (req, evt, ctx) => {
        const cspManifest = await cachedCspManifest(req);
        const cspBuilder = await cachedCspBuilder(ctx);
        console.log(getCreateCtxNonceIdempotent(req));
        console.log(cspBuilder.toString());
    });


const securityMiddleware = [
    csp({
        directives: {
            "script-src": ["self", "data:"],
            "style-src": ["self", "data:"],
        }
    }),
    strictDynamic(),
    strictInlineStyles(),
    geoBlockMiddleware(),
];

export default chainMatch(isPageRequest)(...securityMiddleware);