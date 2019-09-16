# Pager App

## Portfolio Progressive Web App

### OVERVIEW
This is a progressive web app that can be installed on a mobile device. It has a list of prerecorded audio messages that the user can play over an intercom system. 

### HTML
Element ids and classes are prefixed with wmp-.
The html consists primarily of a container for the audio list and the audio player.

### CSS
Sass is used for variables and nesting.
Most of the css is restyling the radio buttons to be more appealing. This utilizes css animation.

### JAVASCRIPT
Variables and functions are prefixed with wmp_.
Javascript is used to change element classes for the radio buttons allowing the css animation to work.
It also keeps track of the list of audio files and displays a list of available messages.
When a new message is selected, the audio source files are updated with a new audio player element (It seems that there are some issues with just updating the src attribute in the audio element).
The service worker file is basic: cache the required files and serve them locally first.# wmpager
