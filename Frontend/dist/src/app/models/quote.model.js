"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newQuote(quote) {
    var date = new Date().toISOString();
    quote.Date = date;
    return quote;
}
exports.newQuote = newQuote;
//# sourceMappingURL=quote.model.js.map