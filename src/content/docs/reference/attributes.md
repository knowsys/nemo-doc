---
title: Comments and Attributes
---

In general, comments in Nemo start with `%` and extend to the end of the line.
Comments do not influence the result of a program in any way.
Attributes do not change the result of a program either, but their main purpose
is to provide additional hints to Nemo rather than documentation to the user.

### Statement and File Comments

Nemo supports special comments that refer to a specific statement (rule, fact, import, etc.) or to the program as a whole.
Lines in these comments still start `%%%` (statement comments) or `%!` (file comments), respectively. 
Using special comments (rather than just plain `%` lines) has the advantage that Nemo can understand what the comment refers
to, and adjust its behavior accordingly in some cases. For example, a function that re-orders rules in a file would also take
the statement comments for each rule with it, which would not work for free-floating `%` comments. Syntax highlighting and
editor features might also be adjusted to use these special comments.

A file comment should be at the very top of the program, and typically uses a title-like first line, like this:

```
%! Hello World in Nemo
%!
%! This program returns a single string message.
message("Hello world") .
@export message :- csv{ resource="", format=(string)} . 
```

A statement comment must be immediately before a statement, like this:

```
%%% A simple fact.
%%% This fact holds the string message we want to return.
message("Hello world") .
```

### Attributes

Attributes are annotations applied to rules and other statements. They provide additional context or configuration for aspects that are
unrelated to the semantics of the Nemo program (e.g., for documentation or compiler hints). Attributes are written like this:

```
#[attribute_name(parameter_1, parameter_2, ...)]
parent(?p, ?c) :- child(?c, ?p) .
```

#### Supported Attributes

Currently, there are only two attributes in Nemo, introduced to improve output messages that refer to rules.

| Attribute    | Parameters      | Explanation |
| ------------ | --------------- | ------------
| `name`       | `name(str)`     | Specifies the name of the rule as a constant string. |
| `display`    | `display(str)`  | Specifies how instantiations of the rule will be displayed. The parameter may use any safe variable from the rule body. |

