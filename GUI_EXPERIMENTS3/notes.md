# GUI_EXPERIMENTS 3

This experiment focuses on the idea of having the values of the variables always displayed next to the code. This is implemented in JS, and you can actually play with it. It might get buggy, but you can implement pretty much whatever you want. And you're happy to break this :)

A few notes:
- This is a very basic and dumb implementation. Basically, it takes the code in the editor and adds lines of code to it to remember the values of the variables. It does not support variable scope and a lot of different other stuff.
- It also does not work with any code whose depiction on the screen is longer that what your screen can handle. The left panel and the right panel are not synchronized.
- Do NOT write loops by hand. Copy and paste them. More often than not, one iteration of your code will be an infinite loop, and will freeze the browser. I have not yet come with a proper implementation of infinite loop detector, but that may come.