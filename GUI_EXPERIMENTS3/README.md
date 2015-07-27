# GUI_EXPERIMENTS 3

This experiment focuses on the idea of having the values of the variables always displayed next to the code. This is implemented in JS, and you can actually play with it. It might get buggy, but you can implement pretty much whatever you want. And you're happy to break this :)

## How to use it:
- Type code in it. Really, any code.
- If you want to see the value of a variable, click on the (*) button. (Click one more time on the button to make the bubble disappear.)
- Next to branches, the program indicates whether the branch has been taken or not.
- The program also indicates the number of times a loop has been executed.

## A few notes:
- **Do NOT write loops by hand**. Copy and paste them. More often than not, one iteration of your code will be an infinite loop, and will freeze the browser. I have not yet come with a proper implementation of infinite loop detector, but that may come.
- This is a very basic and dumb implementation. Basically, it takes the code in the editor and adds lines of code to it in order to put all of the values in a big array that will remember all of these values. This leads to various funky anomalies:
-- Variable scope is not supported, since the program does not differentiate variables that have the same name. 
-- Loops and functions are not handled properly. The value that will be displayed is always the last value taken by the variable. 
-- Similarly, if you create a loop and have a branch in it, the "Branch taken / not taken" will correspond to the last time the condition of the branch was evaluated. 
- Lists are not displayed properly, since what we are displaying is in fact the String representation of the object.
- It also does not work with any code whose depiction on the screen is longer that what your screen can handle. The left panel and the right panel are not synchronized.
