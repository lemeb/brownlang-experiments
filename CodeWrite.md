Calculation
Import
Manipulation of data
Regression
Summary

Plug Glob, Natural Language Toolkit, String Punctuation

Language is English

*malewords is ['guy','spokesman','chairman',"men's",'men','him',"he's", 'his','boy', 'boyfriend', (and 36 more...)]

*femalewords is ['heroine','spokeswoman','chairwoman',"women's", 'actress', 'women',"she's",'her','aunt','aunts', (and 36 more...)]

"Give the gender of [*sentence]":
	*mw_length is Length of [Intersection between *sentence and *malewords)]

* 1
Plug Glob, String Punctuation
Plug Natural Language Toolkit as nltk
Natural Language Toolkit: Language is English
#male_words equals {'guy','spokesman','chairman',"men's",'men','him',"he's", 'his','boy', 'boyfriend', (and 36 more...)}
#female_words equals {'heroine','spokeswoman','chairwoman',"women's", 'actress', 'women',"she's",'her','aunt','aunts', (and 36 more...)}

* Give the gender of [#sentence]
#mw_length equals Length of [Intersection between #sentence and #male_words)]
#fw_length equals Length of [Intersection between #sentence and #female_words)]
#gender equals 'none' (Overwritten if not the case)
If #mw_length is superior 0 and #fw_length is equal to 0:
	#gender equals 'male'
Else, if #mw_length is equal to 0 and #fw_length is superior to 0:
	#gender equals 'female'
Else, if #mw_length is superior to 0 and #fw_length is superior to 0:
	#gender equals 'both'
Return #gender

* Is [#word] proper?
If #proper_nouns{#word} does not exist:
	#proper_nouns{#word} equals 0
If #word{0} is equal to [Capitalize #word{0}]: 
(If #word is capitalized)
	Increment #proper_nouns{#word} (by 1)
Else
	Decrement #proper_nouns{#word} (by 1) 

* Increment counters with [#sentence_words], [#gender]
Increment #sentence_counter{#gender} (by 1)
Increment #word_counter{#gender} by [Length of #sentence_words] 
For (each) #word in #sentence_words:
	Increment #word_freq{#gender}{#word} (by 1) #

#sexes equals {'male', 'female', 'none', 'both'}
For (each) #sex in #sexes: 
	#sentence_counter{#sex} equals 0
	#word_counter{#sex} equals 0
	#word_freq{#sex} equals 0

(Grab the names of all the files)
#file_list equals Glob articles/*txt

For (each) #file_name in #file_list:
	(Open the file)
	#text equals Read #file_name
	
	(Split into sentences)
	#sentences is nltk: Divide #text
	
	For (each) #sentence in #sentences:
		(word tokenize and strip punctuation)
		Split #sentence into #sentence_words (same as #sentence_words = #sentence)
		For #w in #sentence_words:
			If Length of [#w without punctuation] is not 0:
				Add #w to #sentence_words2
		
		(figure out how often each word is capitalized)
		For #word in #sentence_words{1-}:
			Is #word proper?
		
		(lower case it)
		Apply [Lower #w] to #sentence_words2{#w}
		
		(figure out if there are gendered words in the sentence by computing the length of the intersection of the sets)
		#gender is Give the gender of #sentence_words2
	
		Increment counters with #sentence_words2, #gender

(Create a set of all words which were capitalized more often than not)
For (each) #word in #proper_nouns:
	If proper_nouns{#word} is inferior to 0:
		Delete proper_nouns{#word}

(List the 1000 top words in the different genders)
#common_words = [Largest 1000 from #word_freq{'female'}, key [Value of #word_freq{'female'}]] + [Largest 1000 from #word_freq{'male'}, key [Value of #word_freq{'male'}]]
From #common_words remove #male_words, #female_words, #proper_nouns

(How is the word likely to appear in a male subject sentence versus a female subject sentence?)
For #word in #common_words:
	#male_ratio equals #word_freq{'male'}{#word}/#word_counter{'male'}
	#female_ratio equals #word_freq{'female'}{#word}/#word_counter{'female'}	
	#temp_ratio equals #male_ratio / [#male_ratio + #female_ratio]
	#male_percent{#word} equals #temp_ratio

(Print basic statistics)
Summarize #sentence_counter
#ratio_gendered equals 100*[#Sentence_counter{'male'} + #sentence_counter{'female'}] / [#sentence_counter{'male'} + #sentence_counter{'female'} + #sentence_counter{'both'} + #sentence_counter{'none'}]
"[#ratio_gendered]% gendered sentences"
>> 25.9% gendered
"[#sentence_counter{'male'}]% sentences about men"
>> 19681 sentences about men.
"[#sentence_counter{'female'}]% sentences about women"
>> 6242 sentences about men.

(Print the table)
#male_table is A new table with title "Male worlds" and columns "ratio", "male", "female", "word"
For #word in [Largest 50 from #male_percent, key [Value of #male_percent]]:
	If #male_percent{#word} does not exist:
		#ratio is 100
	Else:
		ratio = #male_percent{#word}/[1 - #male_percent{#word}]
	Add row {#ratio, #word_freq{'male'}{#word},#word_freq{'female'}{#word}, #word} to #male_table
Print #male_table
	
#female_table is A new table with title "Feale worlds" and columns "ratio", "male", "female", "word"
For #word in [Smallest 50 from #male_percent, key [Value of #male_percent]]:
	If #male_percent{#word} does not exist:
		#ratio is 100
	Else:
		ratio = [1 - #male_percent{#word}]/#male_percent{#word}
	Add row {#ratio, #word_freq{'male'}{#word},#word_freq{'female'}{#word}, #word} to #male_table
Print #male_table
	