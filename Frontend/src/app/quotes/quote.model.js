"use strict";
exports.__esModule = true;
function newQuote(quote) {
    var date = new Date().toISOString();
    quote.Date = date;
    return quote;
}
exports.newQuote = newQuote;
