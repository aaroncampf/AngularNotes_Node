# ChangeLog 
>To make sense of all your awesome busy-nes to other developers please log changes and use sem-ver. 

## unreleased
[style] implemented 

## version 0.17.2 06/11/2017
[bug:fix] rebuilt weighting system for `add-quote.component` and `quote-details.component`

## version 0.17.1 06/11/2017
[bug:fix] fixed `quotes.component` to display contacts only related to quotes.

## version 0.17.0 06/11/2017
[code] wired up `quote.component` and `quote-details.component` and `add-quote`

## version 0.16.0 06/09/2017
[code] wired up `Companies.components`, `Contacts.components` and `UserSettings.component`

## version 0.15.0 06/09/2017
[code] built cancel button system for `single-line-text-input.component`
[refactor] rebuilt layout of `quotes.component` and `add-quotes.component`
[style] added `icon-arrow-up` and `icon-arrow-down`
[code] built `single-line-text-input.component`
[refactor] `single-line-text-input-component` replaced all form `textarea-component`s which were also `textarea-undo-component`
[refactor] removed back button from `dashboard.component`
[refactor] changed table data to flex `<ul>`
[style] added `icon-bin` and `icon-share`

## version 0.14.0 06/08/2017
[refactor] Rebuilt all components and built details and creation components, no wiring yet  

## version 0.13.0 06/06/2017
[code] finished wiring up `contact.component`
[code] built `notes.component` a reusable part smart component

## version 0.12.0 06/01/2017
[refactor] removed `user.modules` and `ui.services` and `store.module` because of internalizing functionality and caching in components
[refactor] rebuilt `side-menu` to be point of navigation and removed `m-navigation.component`
[code] built `companies.component`, `add-company.component`, `add-contact.component`, `home-component`
 
## version 0.11.2 05/29/2017
[refactor] rebuilt `side-menu.component` with its own cache and reducer
[refactor] rebuilt `list.component` for `dynamic-forms.module` with cache and reducer

## version 0.11.1 05/26/2017
[bug] fixed `undoableInputReducer` bug with tracking input history

## version 0.11.0 05/26/2017
[code] built a state management system for `input-components` that allows undos and redos
[code] built a simpler cache and state system from the NGRX and Redux patterns and examples, `StateService`
[refactor] removed NGRX Store
[code] established a pattern and convention for producing Actions and persisting state history chains
[style] Added icon svg sprites `sprite.svg`, `sprite.css` and imported into `main.scss`
[code] built `contacts.component` 

## version 0.10.0 - 05/06/2017
[code] created `dynamic-forms.module` and `WrittableStateTokenService` and `Store.Module`
[refactor] upgraded twt into WritableStateToken and made a one data flow from smart components to structural components 
[code] built `session.reducer`, `user.reducer`, `crm.reducer`
[library] added implemented NGRX Store

## version 0.9.0 - 05/06/2017
[code] implemented `sockets-service` globally
[refactor] TypeScript Writable Token syncd with data feeds and smart components and made to be PointOfTruth
[code] `list.component` built and implemented with generics 
[code] `form.component` built and implemented with generics  
[code] created `User.services`
[refactor] changed models to include type and created init process for `User.model`  
[code] created helper functions/pipes to manage API response consistency
[code] created Typescript Writable Token <TWT> for point of authority in state
[refactor] changed `common-module` to `global.module`
[refactor] removed API calls from `list.component`
[code] updated `list.component` and `company.component` with twt authority

## version 0.8.0
[refactor] routes redone for lazy loading of modules
[test] fixed mocha.. kindof. needs to have services faked, I think...
[code] created a `form-create-component` and `list-compoennt`
[code] created a `user.component` for state and user info
[refactor] revised models for consistency and circular issues
[refactor] turned all main components into modules
[socket] created `socket.service` and installed `socket.io`
[refactor] service for `settings.component`

## version 0.7.0 03/31/2017
[styled] toastr styled
[code] wired `quote-print.component`
[styled] `quote-details.component`, `quote.component`, and `notes.component`

## version 0.6.0
[styled] Some of `quotes.component` and `side-panel`
[code] Wired up `quotes.component`and `quote-details.component`.
[refactor] finalized views
[code] added view navigation to side-panel lists and mobile view responsive layouts
[code] Add dropdown logic to lists in `side-panel.component`
[code] patched up corner cases for `side-panel.component` Contact Dropdowns and a few minor bugs 
[refactor] reduced code for drop downs
[animation] added css3 transitions for dropdown menus

## version 0.5.0
[refactor] restructured view routes and layout
[refactor] moved and reduced component logic into `*-details.component`
[code] added ng2-toastr
[upgrade] upgraded and updated all dependencies and we are now at Angular 4.0.0

## version 0.4.0
[refactor] removed Angular 2 modal
[code] Wired up `quotes.service` to `quotes.component`
[animation] - removed all for wanting to upgrade to Angular 4.0

## version 0.3.2
[refactor] Separated edit and create into different components for `companies.component` and `contacts.component`
[code] created and wired `create-company.component` and `edit-company.component` and `create-contact.compoent`
[code] created a quotes listing
[code] created `edit-company.component`, `create-quotes.component` and `quotes.service`
[bug-fix] Fixed broken links to components
[animation] Transitional animations between components implemented
[code] Finished notes in `contact.component`, notes almost list in `notes.component` there is a problem maybe with the model

## version 0.3.0
[refactor] Moved static data files for `quote_printout.component` to `quotelines.model`
[code] Created `notes.component`
[code] Finished wiring `company.component` to `company.services` and `contact.service`
[refactor] added REST API updates inside of `input.component`
[code] created list and edit-ables in `notes.component`
[bug-fix] fixed bugs with the input-component and refreshing on updates

## version 0.2.0 - 3/20/2017

[code] Created a delete method for `companies.service`
[code] finished the `companies.service` CRUD
[code] added a modal library and updated the `contact.services`

## version 0.1.1 - 3/20/2017

[refactor] removed top navbar and option button from `home.component`
[code] added POST and GET to `company.service`
[refactor] made the sidemenu into a `companies.component` and new tab-view

## version 0.1.0

[init] base code modified from template seed
[code] created `resume.component`
[code] added static messenger to `resume.compoennt`
[code] created `main.component` with nav-tabs