# In this example we are going to create a simple HTML
# page with 2 input fields (numbers), and a link.
# Using jQuery we are going to send the content of both
# fields to a route on our application, which will
# sum up both numbers and return the result.
# Again using jQuery we'l show the result on the page


# We'll render HTML templates and access data sent by GET
# using the request object from flask. jsonigy is required
# to send JSON as a response of a request
from flask import Flask, render_template, request, jsonify
from cStringIO import StringIO
import sys
import re


# Initialize the Flask application
app = Flask(__name__)


# This route will show a form to perform an AJAX request
# jQuery is loaded to execute the request and update the
# value of the operation
@app.route('/')
def index():
    return render_template('test3.html')

# Route that will process the AJAX request, sum up two
# integer numbers (defaulted to zero) and return the
# result as a proper JSON response (Content-Type, etc.)
@app.route('/exec')
def execute():
    a = request.args.get('eval')
    a = convert(a)
    sys.stdout = mystdout = StringIO()
    exec a
    result = mystdout.getvalue()
    print result
    return jsonify(result=result)

def convert(expression):
    nl_patterns=[r"Absolute value of ([+-]?\d+(?:\.\d+)?)",
                 r"Binary value of ([+-]?\d+(?:\.\d+)?)",
                 r"([+-]?\d+(?:\.\d+)?) is equal to ([+-]?\d+(?:\.\d+)?)",
                 r"([+-]?\d+(?:\.\d+)?) is different from ([+-]?\d+(?:\.\d+)?)",
                 r"Hexadecimal value of ([+-]?\d+(?:\.\d+)?)",
                 r"Length of (.*)"]
    py_patterns=["print abs(ARG1)",
                 "print bin(ARG1)",
                 "print ARG1 == ARG2",
                 "print ARG1 != ARG2",
                 "print hex(ARG1)",
                 "print len(\"ARG1\")"]
    i = 0
    for pattern in nl_patterns:
        p_pat = py_patterns[i]
        matchObj = re.match(pattern, expression)
        if matchObj:
            argument = matchObj.group(1)
            regarg = re.compile('ARG1')
            if len(matchObj.groups()) == 2:  # In case of two arguments
                argument2 = matchObj.group(2)
                regarg2 = re.compile('ARG2')
                prov = regarg.sub(argument, p_pat)
                return regarg2.sub(argument2, prov)
            else:
                argument = matchObj.group(1)
                return regarg.sub(argument, p_pat)
        i = i+1
    return expression

if __name__ == '__main__':
    app.run()
