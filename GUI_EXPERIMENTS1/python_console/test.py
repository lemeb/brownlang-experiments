__author__ = 'lemeb'

from cStringIO import StringIO
import sys

old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()

print "Hello"
print "CACA"

sys.stdout = old_stdout

hello = mystdout.getvalue()

print hello