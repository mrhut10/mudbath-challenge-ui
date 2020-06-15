**Mudbath UI Code Challenge**


ZYX has ask for a stock viewing system

**Getting Started**

* install dependencies in terminal run<br/>```yarn install```
* **Dev Server**
  this will concurrently run typescript as a type checker and parsel-bundler dev server both in watch mode.<br/>```yarn dev```
* **Running Tests**
  this will both run the ts type checking plus fire off tests<br/>```yarn test```<br/>
  note currently only defined tests for the ValidatorText class `./app/helpers/ValidatorText`
* **build for production**
  note this product optimised for production but if you need to run in production run<br/>```yarn build```<br/> 
  not this project hasn't been optimized for production, and you will also need to have something serve the files.



**Notes On Decisions**

* Did initial Hand Drawings and mapped out requirements, plus set up initial project files.
  * including git, yarn, parcel bundler with react, setup tailwindCSS with postCSS
* After implementing a crude database (a singleton database class), I eventually decided against using it and instead opted for just using a react hook stack which has useState at its lower level.
* Most of the functionality done (including a popup Manager, and form validation as you type) just need to plumb the on submit event into validation and saving. but underlying methods for this already made.
* time to address my crude design
  * **Current/old Design**<br/><img src="readmefiles/olddesign.gif" alt="old Design" width="400"/>
  * new/planned design<br/><img src="readmefiles/planneddesign.gif" alt="planned Design" width="400"/>
* got feedback from friends and family on design two of which are developers, others where just tech users too make sure design was appealing and intuitive. this lead to changes
  * aligning up elements across design better
  * using colour and padding to create a organised hierarchy within the design
  * change spacing between logo elements
  * removed hover effects which changed font weight which made a janky width jump of elements
* Had problems with the way I was updating state
  * when product is updated (especially an ID Change)
  * products that relate to the product with related products also need to be updated
  * but also popupState needs to be updated with its ID references / alternatively we could clear the popupState which I considered.
  * originally I was only updating products one by one, however this caused the app to update components in a invalid state where previous ID's are still referred too (in popupState and relatedProducts fields on other products)
* Had problem with validation logic
  * validation logic was stored in state, which means it didn't update dynamically.
  * background - relatedProducts was at the time stored in a text field as comma separated integers
  * the validation logic made sure each integer was unique and referred to a product that existed
  * because the validation logic was in state, it didn't account for product ID's changing, so would report as invalid state when pointing too a product whos ID had been changed.

  * validation logic in form was originally stored in state, 

