# Chrome Notepad

This is a very basic text editor chrome extension project developed using html, css and javascript as a way for me to learn a bit of javascript.

V1.31
- Fixed an issue with the undo button saving duplicate states when the spacebar is pressed.

Version History:

V1.3
- Added new theme option - yellow.
- Added the ability to paste content from the clipboard.
- Changed the behaviour of hovering over buttons so that descriptions will only appear after not being the button is not clicked for one second, similar to word.

V1.2
- Added button descriptions that appear when hovered over for 1 second.

V1.11
- Minor aethsetic improvements.

V1.1
- Added the ability to copy textarea content to the clipboard.
- Added the ability to change the colour of the notepad.

V1.0 
- Created an undo button that uses a stack to retrieve save states.
- Created a save functionality that converts the text area content into a .txt file.

Potential improvements: 
- Create a service worker that will store any data input and retrieve it when the popup is reopened. Currently all input data is lost if the popup is closed.
- Add functionality to load an existing txt file.
- Add a button to paste from the clipboard.

References:
- https://stackoverflow.com/questions/40121246/trigger-function-when-someone-has-stopped-typing-for-1-second (Delayed Function)
- https://stackoverflow.com/questions/65137434/how-can-i-save-a-txt-file-from-the-value-of-a-textarea (Saving the text area as a txt file)

