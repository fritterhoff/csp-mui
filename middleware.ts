import {
    chainMatch,
    isPageRequest,
    csp,
    strictDynamic,
    strictInlineStyles,
    
} from "@next-safe/middleware";

const securityMiddleware = [
    csp({
        directives: {
            "script-src": ["self", "data:"],
            "style-src": ["self", "data:"],
        },
    }),
    strictDynamic(),
    strictInlineStyles(),
];

export default chainMatch(isPageRequest)(...securityMiddleware);