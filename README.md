# FlappyFish

[FlappyFish][website]

[website]: https://tianyuduan.github.io/FlappyFish/

FlappyFish is an infinite runner type game based on FlappyBird, a side-game scroller game where the user controls a bird. The purpose of the game is to fly between rows of green pipes without hitting them. By the end of 2014, FlappyBird was the most downloaded game in the
 iOS App Store.

FlappyFish was built with HTML 5 canvas. The entire game was built with vanilla javascript.

## Features & Implementation
-will add images after I am content with the style of the game and all the components

### Dynamic Jumping

  FlappyFish uses dynamic jumping, where a gravity algorithm is implemented on the character. User is able to infinitely jump with gravity applied to the fish throughout the game. Upon a jump, the character model is translated downwards to imitate a flapping motion.


### Infinite Spike Generation
  created an algorithm that generated spikes of random length over time. It ensured the path between the spikes will always be the same for the fish to go through.

### Collision Detection

  FlappyFish utilizes 4 point pixel level collision detection algorithms for platforms, obstacles and the user player. The collision
  was perhaps the most complex part of this project. There were a lot of cases to account for in the process of learning about hitboxes and how collisions worked.


## Future Improvements

### Leaderboards

include Google Firebase backend which can be used for storing scores and creating a leaderboard

### Creating multiple player options

allow for dual fish gameplay option, this will enhance user experience as they can compete against each other for highscores

### Including power-ups, point multipliers

increase user experience by adding on random power-ups, various point multipliers to randomize/enhance gameplay

### Scaling bonus/add Levels

deepen game dynamics by adding different floors, adding scaling difficulty, and having more selectable characters as the game progresses
