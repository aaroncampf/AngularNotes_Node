var jsdom = require('jsdom')

var document = jsdom.jsdom('<!doctype html><html><body></body></html>');

var window = document.defaultView;

global.document = document;
global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = window.XMLHttpRequest;

require('core-js/es6');
require('core-js/es7/reflect');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');
var forms = require('@angular/forms');

testing.TestBed.initTestEnvironment(
	forms.FormsModule,
	forms.ReactiveFormsModule,
	browser.BrowserDynamicTestingModule,
	browser.platformBrowserDynamicTesting()
);
