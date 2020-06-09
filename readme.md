**Mudbath UI Code Challenge**


ZYX has ask for a stock viewing system

**Getting Started**

* install dependencies in terminal run<br/>```yarn install```
* **Dev Server**
  will concurrently run typescript as a type checker and parsel-bundler dev server both in watch mode.<br/>```yarn dev```
* **build for production**
  note this product optimised for production but if you need to run in production run<br/>```yarn build```<br/>
  and serve with<br/>```yarn serve```


**Notes On Decisions**

* Did initial Hand Drawings and mapped out requirements, plus set up initial project files.
  * git init
  * npm init
  * parcel bundler with react
  * tailwindCSS with postCSS
* After implementing a crude database (a singleton database class), I eventually decided against using it and instead opted for just using a react hook stack which has useState at its lower level.
* Most of the functionality done (including a popup Manager, and form validation as you type) just need to plumb the on submit event into validation and saving. but underlying methods for this already made.
* time to address my crude design
  * **Current/old Design**<br/><img src="readmefiles/olddesign.gif" alt="old Design" width="400"/>
  * new/planned design<br/><img src="readmefiles/planneddesign.gif" alt="planned Design" width="400"/>


