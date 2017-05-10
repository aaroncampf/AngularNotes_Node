# ChangeLog 
>To make sense of all your busy-ness to other developers please log changes and use sem-ver. 

##unreleased


##version0.9.0 - 05/06/2017
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
 

##version 0.8.0
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
[bug-fix] Fixed brokgiten links to components
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