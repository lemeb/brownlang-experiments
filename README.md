# May 22 (Léopold)

## Syntax

### What I assume so far
- **No mathematical notation**. Every function is a "sentence" (see First Draft.)
- **Variables** are marked by a character before the name of the variable (see below.) In test1.html, it is an asterisk. In test2.html, it is a pound.
- **External libraries**: I consider that a user would tend to use libraries (defined in test2.html as extensions being "plugged".) To use a sentence in a library, you need to mention it with the name of the extension followed by a colon. ("Name of the extension:")
- **Define a function**: In test1.html (as in First Draft), defining a function is done following the model "An instruction that uses [*first_variable] and [*second_variable] means:". In test2.html, I use the asterisk as the pound in Markdown: if you type the asterisk at the beginning of an instruction, it is considered as the definition of a function.

Of course, all of that is loosely defined, and is not immune to slight contradictions.

### More on variables
There is probably a trade-off there. If we want to get rid of mathematical notation, we may need to define a symbol to put every variables (like $ for PHP.) We *might* make a compiler sufficiently powerful to distinguish variables from mere arguments or other stuff. But (1) it may be complicated to implement, (2) it definitely will be confusing to users. 

Plus, there probably is a value in forcing users to indicate their variables. I don't know to which extent the lack of precise character to indicate a variable in other languages is problematic to new users, but that may be an issue to tackle. In any case, I don't really have the impression that the $ symbol in PHP is a pain to coders, but I might be wrong.

In previous tests, I used the * symbol, then the # symbol to indicate variables. I am not quite sure these are the best. After all, in literary texts, * is for comments, and # for numbers (or titles, in Markdown.) So I thought of @. In most places, @ is used to reference something (a user on Twitter for instance.) So that may be the most natural character. Maybe.

## GUI

I want to know what an interface would look like if you really wanted to make it **book-like**. Like, an interface to write code that would be very close to what iAWriter provides (https://ia.net/writer/mac/). In both examples, I translated the code of an iPython notebook (http://nbviewer.ipython.org/gist/nealcaren/5105037) that made some data crunching to see how the NYT was talking about men and women. (The sample size is apparently quite small, but whatever.) Oh, and every page uses HTML5's _contenteditable_, so you can modify the code. (It won't impact anything on the webpage however. I obviously haven't implemented the compiler yet.)

1. (test1.html) Tried an interface with 1 column. Obviously, the font is very big. At the bottom of every instruction, you have "indications" on the model of Xcode's playgrounds. They indicate a bunch of things such as whether the instruction has been executed, or how many times a branch has been taken, etc. etc. Also, I looked at a way to display the use of libraries with a colored label on the model of Reddit. I also looked at how to display functions. None of them is really satisfactory, but whatever, it's an experiment. I also experiments with how to display numerical results with a different font. I think it can be a good area to make a difference in term of GUI. 
2. (test2.html) Tried an interface with 2 columns. One is for the text/code. Designed and conceived like an area to write poetry. (For instance, the font display is a serifed one.) The second is for "indications".
3. (test3.html) Pure garbage for now.

### Other potential GUI: a step-based interface
(Discussed about that with Mark.)
One of the big pains in console-based interfaces (such as R, iPyNotebook, etc.) is the impossibility of going backwards. If you want get to the state before the last instruction, you need to re-write all your instructions again. (And pray that the data you used was not permanently overwritten.) That is a pain. Why not use an interface with two parts. One, the data you would modify (a database, a list of variables, a text, a graphical output, whatever.) Two, the list of your instructions. And a slider, that would enable you to go from one step to another and see how your data is modified. (Sketch: http://i.imgur.com/AFGnrWf.png)

## Random ideas
- Do we want to incentivize users to make their code public? And if yes, what does it imply? Does it imply that it would be some kind of file attached to an article? (like: here is the data we used, do whatever you want with it) Or should we make it the basis of the article? Like, should we make an interpretative engine on top of that?
- To which extent should a potential programming plaform be different from a publishing platform? (To be frank, I find the idea of merging the two pretty exciting, but we discussed about that with Gabe and this is likely unreachable.)

# May 26 (Léopold)

## GUI
I tried to link the interface I made with a Python server. Basically, you can input an instruction in the "literary" form and you will be able to see the result on the web page. (The precise instructions that I have implemented are available in a moment.) 
For now, I've tried to do something I could run locally on my computer. And it works! Instructions are on the page.
The downside of it is that, if you want to run it, you have to install Flask. That being said, the installation is *really* simple:
1. (In the Terminal) go to the folder `python_console` where `hello.py` is located.
2. Run `sudo easy_install virtualenv; sudo easy_install Flask; python hello.py`
3. Go to `http://127.0.0.1:5000/`

### Functions implemented (for now)
* Absolute value of [number]
* Binary value of [number]
* Hexadecimal value of [number]
* Length of [something - without "s around]
* [number] is equal to [number]
* [number] is different from [number]

## Random ideas
- Spoke with (Brown Institute's) Charles Berret. He threw the interesting idea of being really serious about implementing third-party services like Wolfram Alpha. Basically, you would able to ask, from the GUI, questions like "What is the population of Jakarta?".