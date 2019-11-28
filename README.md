# Boxing Workout App
My first Redux and React Native project. Writing this Readme 6-7 months after making this project and using React and Redux in other projects, I would do many things differently in this project, but I think this project served as a good learning ground to get comfortable with these frameworks.
## Current Features
### Boxing style workout timer
The app contains a timer that lets the user configure a round time, round warning time, and rest time. There are controls to pause, reset, and start the timer as well as large visuals to display the time and state of the timer (rest/working/paused/warning). Audio bell rings are used to indicate the transition of these states.
### Combination Editor
The user can save combinations of punches to remember combinations they like to use.
### Combination Workout (Incomplete)
The user will be able to select different combination to include in their workout, and the app will verbally communicate these workouts randomly during the 'work' phase of the timer.

## Local Development
### Development Stack
React Native is the primary framework used to create a cross-platform mobile app with html/css like editing and hot reloading.
Redux is used for state management.
### Prerequisites
1. Node installed - check if you have node installed with `node -v`
2. Android Studio installed with a virtual device setup using Android API 26 or later
### Running the app locally
1. In the root directory, run `npm install`
2. Launch an Android virtual device with API 26 or later from Android Studio
3. In the root directory, run `npm run android-build`
4. This command commonly fails, and running it again usually results in it working

## Screenshots
## Work Timer State
![Screenshot of work timer state](https://i.imgur.com/GNQ7lYH.png)
## Pause Timer State
![Screenshot of work timer state](https://i.imgur.com/KQz6iLK.png)
### Combo Editor
![Screenshot of combo editor](https://i.imgur.com/OLaUbuI.png)
