# Space-Invaders
Space Invaders game made in JavaScript (UofT CSC309H1 - Programming on the Web)

OUTLINE:
1) IMAGES AND SCREENS
- The images and welcome/goodbye screens are stored in objects. This way, they are easily accessible when needed
- List of image objects:
- bgImage = holds the background image
  - heroImage = holds the "hero" or player image
  - a1Image, a2Image, a3Image, a4Image = hold four different alien images, respectively
  - shotImage = holds the image for monster "bullets"
  - heroShotImage = holds the image for the player/hero "bullets"
- List of screen image objects:
  - congratulationsImage = holds the image for the "congratulations" screen (when player has killed all aliens)'
  - gameoverImage = holds the image for the "game over" screen (when player dies)

2) GAME OBJECTS / FUNCTIONS
- hero = holds information about the player/hero (speed, position, whether player is shooting or not)
- monsters = holds information about the aliens (speed, position, whether alive, shooting or not)
- keysDown = records which keys are currently being pressed
- reset = called whenever an alien is shot or collides with the hero
- update = called periodically throughout the game.
  - handles key events (arrow keys for movement, spacebar for shooting)
  - moves aliens around the screen and makes them spontaneously shoot at the player
  - checks if aliens/player is alive and updates their status (and status of the game) accordingly
- render = draws everything to the screen
- renderGameOver = called when player dies. Shows "game over" screen
- renderGameComplete = called when all aliens are killed. Shows the "congratulations" screen

3) GAME LOOP
- calls the update() and render() functions periodically (every 5 milliseconds)
