"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills.browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var crm_module_1 = require("./app/crm.module");
var core_1 = require("@angular/core");
exports.platformRef = platform_browser_dynamic_1.platformBrowserDynamic();
function main() {
    return exports.platformRef.bootstrapModule(crm_module_1.CRMModule)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
// support async tag or hmr
switch (document.readyState) {
    case 'interactive':
    case 'complete':
        core_1.enableProdMode();
        main();
        break;
    case 'loading':
    default:
        document.addEventListener('DOMContentLoaded', function () { return main(); });
}
//# sourceMappingURL=index.js.map