{
  "title": "Write a simple parser in Bison",
  "date": "2014-06-13 10:00:19 GMT"
}

---

#Write a simple parser in Bison
Ever wondered how to write a simple parser? Let's write a simple math parser then!

You will need to have [Bison](http://www.gnu.org/software/bison/) and a C compiler installed on your system. On a debian-like linux system you can do that by running

    $ apt-get install bison gcc

## The skeleton of our parser file
Now create a new file, called ``calc.y``. This file is laid out like this:

    %{
      /* Prologue with C declarations */
    %}
    
    /* Bison declarations */
    
    %%
      /* Bison grammar definition */
    %%
    /* C code */

Now we want to write a simple parser that can parse mathematical expressions like this:

    20 - (3 * 4) / 2
    >  14

so let's start with our grammar.

## Our parsing grammar

Before we think closely about our actual grammar, we need to identify what tokens we have that don't need further parsing - that'll be numbers for our case.

1. Our grammar should work on a single line as well as a file containing multiple lines, one expression per line.
2. A line can be empty and so can be the whole input.
3. We will print out the result of the parsed expression for each line
4. An expression is either
  a. A number
  b. Another expression in brackets
  c. Two expressions combined by one of the basic mathematical operations (addition, subtraction, multiplication, division).

In our Bison file it looks like this:

    input:  | input line;
    line: '\n' | exp '\n' { printf ("> %.10g\n", $1); };
    exp:   NUM         { $$ = $1;         }
         | exp '+' exp   { $$ = $1 + $3; }
         | exp '-' exp    { $$ = $1 - $3;  }
         | exp '/' exp    { $$ = $1 / $3;  }
         | exp '*' exp    { $$ = $1 * $3; }
         | '(' exp ')'       { $$ = $2;         };

Each type of node in our grammar is defined by a list of statements.
For example:

    input: | input line;

means: The input can be empty or some more input and a line.
Besides simply defining a node type by recursion over other node types, you can also give rules for the evaluation.

For instance:

    exp '+' exp { $$ = $1 + $3; }

means that this will evaluate to the first token ("exp") plus the third token (the second "exp").

Now we need to also tell Bison that ``NUM`` is a token.

## Declarations

In the Bison declarations section add:

    %token NUM

Now we will load some C headers and declare the default data type in the C declarations:

    #include <string.h>
    #include <ctype.h>
    #include <stdio.h>
    #include <stdlib.h>
    #define YYSTYPE double

## Some parsing code

    yylex ()
    {
      int c;
    
      /* skip white space  */
      while ((c = getchar ()) == ' ' || c == '\t');
      /* process numbers   */
      if (c == '.' || isdigit (c)) {
          ungetc (c, stdin);
          scanf ("%lf", &yylval);
          return NUM;
      }
    
      /* return end-of-file  */
      if (c == EOF)  return 0;
      /* return single chars */
      return c;                                
    }
    
    yyerror (char *s) {
      printf ("%s\n", s);
    }
    
    main ()
    {
      yyparse ();
    }

This code provides the ``yylex`` function for Bison that reads the input, the yyerror function that is called when something went wrong while parsing and a main function that just calls the yyparse function.

Bison provides the ``yyparse`` function and will call our ``yylex`` function to get data for parsing.

Let's look at our whole Bison file:

    %{
    #define YYSTYPE double
    #include <string.h>
    #include <ctype.h>
    #include <stdio.h>
    #include <stdlib.h>
    %}
    
    %token NUM
    
    %%
    input:  | input line;
    line: '\n' | exp '\n' { printf ("> %.10g\n", $1); };
    exp:   NUM                  { $$ = $1;      }
         | exp '+' exp          { $$ = $1 + $3; }
         | exp '-' exp          { $$ = $1 - $3; }
         | exp '/' exp          { $$ = $1 / $3; }
         | exp '*' exp          { $$ = $1 * $3; }
         | '(' exp ')'          { $$ = $2;      };
    %%
    
    yylex ()
    {
      int c;
    
      /* skip white space  */
      while ((c = getchar ()) == ' ' || c == '\t')  
        ;
      /* process numbers   */
      if (c == '.' || isdigit (c))                
        {
          ungetc (c, stdin);
          scanf ("%lf", &yylval);
          return NUM;
        }
        
        
      /* return end-of-file  */
      if (c == EOF)                            
        return 0;
      /* return single chars */
      return c;                                
    }
    
    yyerror (char *s) {
      printf ("%s\n", s);
    }
    
    main ()
    {
      yyparse ();
    }

Save this file as ``calc.y`` and run ``bison calc.y``. This should have generated a new file called ``calc.tab.c``, containing the C code for our parser - to make this an executable call ``gcc -o calc calc.tab.c`` and you should now have a file called ``calc``.

You can run this file like this:

    $ chmod +x calc
    $ echo "2*3" | ./calc
    > 6
    $ 