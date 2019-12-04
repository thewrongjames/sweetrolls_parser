# Grammar

Whitespace is ignored.
\ indicates a literal terminal character.
Multi-character strings of terminals are one terminal, they will be tokenised.
- S: start, whole valid input, a sequence without brackets
- E: expression
- M: maybe more expressions
- T: term
- A: maybe the rest of a + or - operation
- X: + or -
- I: maybe + or -
- P: term without the possiblity of a minus out the front
- O: maybe the rest of a * or / operation
- B: bracketed expression
- V: value (roll or number)
- Q: sequence
- F: function call
- U: function name
- Y: * or /
- V: value, a number or a die roll
- R: maybe a die roll
- L: a single die roll
- N: whole number
- D: digit
- G: maybe more digit

```
S -> EM
M -> ε | ,EM
E -> TA
A -> ε | XE
X -> + | -
T -> IPO
O -> ε | YT
I -> ε | + | -
P -> B | Q | F | V
B -> (E)
Q -> [S]
F -> U(S)
U -> min | max | repeat | sum
Y -> * | /
V -> NR | L
R -> ε | \DN | dN
L -> \DN | dN
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
FOLLOW(E) >= FIRST(M)\{ε} U FOLLOW(A) U FIRST(\))
           = {\,, )}
FOLLOW(A) >= FOLLOW(E)
           = FOLLOW(E) (as each are subsets of each other)
           = {\,, )}
FOLLOW(T) >= FIRST(A)\{ε} U FOLLOW(E)
           = {+, -, \,, )}
FOLLOW(O) >= FOLLOW(T)
           = {+, -, \,, )}
FOLLOW(I) >= FIRST(P)
           = FIRST(P)
           = {(, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(A) = FIRST(ε) U FIRST(XE)
FIRST(O) = FIRST(ε) U FIRST(YT)
         = {ε, *, /}
FOLLOW(P) >= FIRST(O)\{ε} U FOLLOW(T)
           = {*, /, +, -, \,, )}
FOLLOW(V) >= FOLLOW(P)
           = {*, /, +, -, \,, )}
FOLLOW(R) >= FOLLOW(V)
           = {*, /, +, -, \,, )}
FIRST(R) = FIRST(ε) U FIRST(\DN) U FIRST(dN)
         = {ε, D, d}
FOLLOW(N) >= FIRST(R)\{ε} U FOLLOW(V)
FOLLOW(G) >= FOLLOW(N)
           = {D, d, *, /, +, -, \,, )}
```

Production Rule First Sets:
```
FIRST(EM) = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(ε) = {ε}
FIRST(,EM) = {\,}
FIRST(TA) = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(XE) = {+, -}
FIRST(+) = {+}
FIRST(-) = {-}
FIRST(IPO) = {+, -, (, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(YT) = {*, /}
FIRST(B) = {(}
FIRST(Q) = {[}
FIRST(F) = {min, max, repeat, sum}
FIRST(V) = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FIRST(\(E\)) = {(}
FIRST([S]) = {[}
FIRST(U\(S\)) = {min, max, repeat, sum}
FIRST(min) = {min}
FIRST(max) = {max}
FIRST(repeat) = {repeat}
FIRST(sum) = {sum}
FIRST(*) = {*}
FIRST(/) = {/}
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
FOLLOW(A) = {\,, )}
FOLLOW(O) = {+, -, \,, )}
FOLLOW(I) = {(, [, min, max, repeat, sum, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, D, d}
FOLLOW(R) = {*, /, +, -, \,, )}
FOLLOW(G) = {D, d, *, /, +, -, \,, )}
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

| V \ T | , | + | - | ( | ) | [ | ] | min | max | repeat | sum | * | / | D | d | [0-9] | $ |
|:-----:|   |   |   |   |   |   |   |     |     |        |     |   |   |   |   |       |   |
| S     |   |EM |EM |EM |   |EM |   | EM  | EM  | EM     | EM  |   |   |EM |EM | EM    |   |
| M     |,EM|   |   |   | ε |   | ε |     |     |        |     |   |   |   |   |       | ε |
| E     |   |TA |TA |TA |   |TA |   | TA  | TA  | TA     | TA  |   |   |TA |TA | TA    |   |
| A     | ε |XE |XE |   | ε |   |   |     |     |        |     |   |   |   |   |       |   |
| X     |   | + | - |   |   |   |   |     |     |        |     |   |   |   |   |       |   |
| T     |   |IPO|IPO|IPO|   |IPO|   | IPO | IPO | IPO    | IPO |   |   |IPO|IPO| IPO   |   |
| O     | ε | ε | ε |   | ε |   |   | ε   | ε   | ε      | ε   |YT |YT | ε | ε | ε     |   |
| I     |   | + | - | ε |   | ε |   |     |     |        |     |   |   |   |   |       |   |
| P     |   |   |   | B |   | Q |   | F   | F   | F      | F   |   |   | V | V | V     |   |
| B     |   |   |   |(E)|   |   |   |     |     |        |     |   |   |   |   |       |   |
| Q     |   |   |   |   |   |[S]|   |     |     |        |     |   |   |   |   |       |   |
| F     |   |   |   |   |   |   |   |U(S) |U(S) | U(S)   |U(S) |   |   |   |   |       |   |
| U     |   |   |   |   |   |   |   | min | max | repeat | sum |   |   |   |   |       |   |
| Y     |   |   |   |   |   |   |   |     |     |        |     | * | / |   |   |       |   |
| V     |   |   |   |   |   |   |   |     |     |        |     |   |   | L | L | NR    |   |
| R     | ε | ε | ε |   | ε |   |   |     |     |        |     | ε | ε |\DN|dN |       |   |
| N     |   |   |   |   |   |   |   |     |     |        |     |   |   |   |   | DG    |   |
| D     |   |   |   |   |   |   |   |     |     |        |     |   |   |   |   | [0-9] |   |
| G     | ε | ε | ε |   | ε |   |   |     |     |        |     | ε | ε | ε | ε | DG    |   |
