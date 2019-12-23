# Grammar

Wow, okay a lot of these rules aren't required. At least B, Q, X, U, and Y could
go just from inspection of the parse table. I'll still build it for this for
now.

Whitespace is ignored.
\ indicates a literal terminal character.
Multi-character strings of terminals are one terminal, they will be tokenised.
- S: start, whole valid input, a sequence without brackets
- M: maybe more expressions
- E: expression
- A: maybe the rest of a plus or minus operation
- T: term
- O: maybe the rest of a times or divide operation
- I: maybe plus or minus
- P: term without a sign (bracketed expression / sequence, function, or value)
- F: function call (function name followed by sequence in curved brackets)
- V: value (a number or a die roll)
- R: maybe a die roll
- N: whole number
- D: digit
- G: maybe more digits

```
S -> EM
M -> ε | ,EM
E -> TA
A -> ε | +E | -E
T -> IPO
O -> ε | *T | /T
I -> ε | + | -
P -> (E) | [S] | F | V
F -> min(S) | max(S) | repeat(S) | sum(S)
V -> NR | \DN | dN
R -> ε | \DN | dN
N -> DG
D -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
G -> ε | DG
```

Working for first sets, not including solitary terminal rules (which just have the terminal in their first set).
```
FIRST(ε) = {ε}
FIRST(B) = {(}
FIRST(Q) = {[}
FIRST(F) = FIRST(U)
         = {min, max, repeat, sum}
FIRST(YT) = FIRST(Y)
          = {*, /}
FIRST(L) = {D, d}
FIRST(V) = FIRST(NR) U FIRST(L)
         = FIRST(N) U {D, d}
         = FIRST(DG) U {D, d}
         = FIRST(D) U {D, d}
         = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(P) = FIRST(B) U FIRST(Q) U FIRST(F) U FIRST(V)
         = {(, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(I) = FIRST(ε) U FIRST(+) U FIRST(-)
         = {ε, +, -}
FIRST(T) = FIRST(IP)
         = FIRST(I)/{ε} U FIRST(P)
         = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(E) = FIRST(T)
         = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(EM) = FIRST(E)
          = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(,EM) = {\,}
FIRST(TA) = FIRST(T)
          = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(X) = {+, -}
FIRST(XE) = FIRST(X)
          = {+, -}
FIRST(IPO) = {+, -, (, [, min, max, repeat, sum, *, /, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(\(B\)) = {(}
FIRST(NR) = FIRST(N)
          = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
```

Working for follow sets. For every variable that can derive epsilon:
```
FOLLOW(S) >= {$} U {]} U {)}
           = {$, ], )}
FOLLOW(M) >= FOLLOW(S)
           = {$, ], )}
FIRST(M) = FIRST(ε) U FIRST(,EM)
         = {ε, \,}
FOLLOW(E) >= FIRST(M)\{ε} U FOLLOW(M) U FOLLOW(A) U FIRST(\))
           = {\,, $, ], )}
FOLLOW(A) >= FOLLOW(E)
           = FOLLOW(E) (as each are subsets of each other)
           = {\,, $, ], )}
FIRST(A) = FIRST(ε) U FIRST(XE)
FOLLOW(T) >= FIRST(A)\{ε} U FOLLOW(E)
           = {+, -, \,, $, ], )}
FOLLOW(O) >= FOLLOW(T)
           = {+, -, \,, $, ], )}
FOLLOW(I) >= FIRST(P)
           = FIRST(P)
           = {(, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(O) = FIRST(ε) U FIRST(YT)
         = {ε, *, /}
FOLLOW(P) >= FIRST(O)\{ε} U FOLLOW(T)
           = {*, /, +, -, \,, $, ], )}
FOLLOW(V) >= FOLLOW(P)
           = {*, /, +, -, \,, $, ], )}
FOLLOW(R) >= FOLLOW(V)
           = {*, /, +, -, \,, $, ], )}
FIRST(R) = FIRST(ε) U FIRST(\DN) U FIRST(dN)
         = {ε, D, d}
FOLLOW(N) >= FIRST(R)\{ε} U FOLLOW(V)
FOLLOW(G) >= FOLLOW(N)
           = {D, d, *, /, +, -, \,, $, ], )}
```

Production Rule First Sets:
```
FIRST(EM) = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(ε) = {ε}
FIRST(,EM) = {\,}
FIRST(TA) = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(+E) = {+}
FIRST(-E) = {-}
FIRST(IPO) = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(*T) = {*}
FIRST(/T) = {/}
FIRST(+) = {+}
FIRST(-) = {-}
FIRST(\(E\)) = {(}
FIRST([S]) = {[}
FIRST(F) = {min, max, repeat, sum}
FIRST(V) = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(U\(S\)) = {min, max, repeat, sum}
FIRST(min) = {min}
FIRST(max) = {max}
FIRST(repeat) = {repeat}
FIRST(sum) = {sum}  
FIRST(NR) = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
FIRST(L) = {D, d}
FIRST(\DN) = {D}
FIRST(dN) = {d}
FIRST(DG) = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
FIRST(0) = {0}
FIRST(1) = {1}
FIRST(2) = {2}
FIRST(3) = {3}
FIRST(4) = {4}
FIRST(5) = {5}
FIRST(6) = {6}
FIRST(7) = {7}
FIRST(8) = {8}
FIRST(9) = {9}
```

Variable's that can derive Epsilon Follow Sets:
```
FOLLOW(M) = {$, ], )}
FOLLOW(A) = {\,, $, ], )}
FOLLOW(O) = {+, -, \,, $, ], )}
FOLLOW(I) = {(, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FOLLOW(R) = {*, /, +, -, \,, $, ], )}
FOLLOW(G) = {D, d, *, /, +, -, \,, $, ], )}
```

Terminals:
- ,
- +
- -
- (
- )
- [
- ]
- min
- max
- repeat
- sum
- *
- /
- D
- d
- [0-9]

Parse Table:

| V \ T | , | + | - | ( | ) | [ | ] | min  | max  | repeat  | sum  | * | / | D | d | [0-9] | $ |
|:-----:|   |   |   |   |   |   |   |      |      |         |      |   |   |   |   |       |   |
| S     |   |EM |EM |EM |   |EM |   | EM   | EM   | EM      | EM   |   |   |EM |EM | EM    |   |
| M     |,EM|   |   |   | ε |   | ε |      |      |         |      |   |   |   |   |       | ε |
| E     |   |TA |TA |TA |   |TA |   | TA   | TA   | TA      | TA   |   |   |TA |TA | TA    |   |
| A     | ε |+E |-E |   | ε |   | ε |      |      |         |      |   |   |   |   |       | ε |
| T     |   |IPO|IPO|IPO|   |IPO|   | IPO  | IPO  | IPO     | IPO  |   |   |IPO|IPO| IPO   |   |
| O     | ε | ε | ε |   | ε |   | ε |      |      |         |      |*T |/T |   |   |       | ε |
| I     |   | + | - | ε |   | ε |   | ε    | ε    | ε       | ε    |   |   | ε | ε | ε     |   |
| P     |   |   |   |(E)|   |[S]|   | F    | F    | F       | F    |   |   | V | V | V     |   |
| F     |   |   |   |   |   |   |   |min(S)|max(S)|repeat(S)|sum(S)|   |   |   |   |       |   |
| V     |   |   |   |   |   |   |   |      |      |         |      |   |   |\DN|dN | NR    |   |
| R     | ε | ε | ε |   | ε |   | ε |      |      |         |      | ε | ε |\DN|dN |       | ε |
| N     |   |   |   |   |   |   |   |      |      |         |      |   |   |   |   | DG    |   |
| D     |   |   |   |   |   |   |   |      |      |         |      |   |   |   |   | [0-9] |   |
| G     | ε | ε | ε |   | ε |   | ε |      |      |         |      | ε | ε | ε | ε | DG    | ε |
