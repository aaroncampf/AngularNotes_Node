# ChangeLog 
>To make sense of all your busy-ness to other developers and please use sem-ver. 

##unreleased
[refactor] Separated edit and create into different components for `companies.component` and `contacts.component`
[code] created and wired `create-company.component` and `edit-company.component` and `create-contact.compoent`
[code] created a quotes listing
[code] created `edit-company.component`, `create-quotes.component` and `quotes.service`
[bug-fix] Fixed broken links to components

##version 0.3.0
[refactor] Moved static data files for `quote_printout.component` to `quotelines.model`
[code] Created `notes.component`
[code] Finished wiring `company.component` to `company.services` and `contact.service`
[refactor] added REST API updates inside of `input.component`
[code] created list and edit-ables in `notes.component`
[bug-fix] fixed bugs with the input-component and refreshing on updates

##version 0.2.0 - 3/20/2017

[code] Created a delete method for `companies.service`
[code] finished the `companies.service` CRUD
[code] added a modal library and updated the `contact.services`

##version 0.1.1 - 3/20/2017

[refactor] removed top navbar and option button from `home.component`
[code] added POST and GET to `company.service`
[refactor] made the sidemenu into a `companies.component` and new tab-view

##version 0.1.0

[init] base code modified from template seed
[code] created `resume.component`
[code] added static messenger to `resume.compoennt`
[code] created `main.component` with nav-tabs