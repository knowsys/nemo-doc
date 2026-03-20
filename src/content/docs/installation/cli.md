---
title: Command Line Interface
---

Once you obtained the `nmo` executable (see [install](/nemo-doc/installation/install)), you can execute nemo rule files:

```bash
nmo my_rules.rls --export-dir results
```

For an overview of the supported command line options run the following:

```bash
nmo --help
```

## Setting parameters
[Global parameters](/nemo-doc/reference/parameters) can be set on the command line using the `--param` option. Consider a `rules.rls` file with a parameter, as follows:
```nemo title="rules.rls"
@parameter x .
test($x) .
@export test :- csv{} .
```

```bash
nmo rules.rls --param "x=hello world!"
```

This produces a single fact `"hello world!"` for predicate `test`.

## Tracing facts

You can specify facts to be traced via the command line. Example:

```nemo title="rules.rls"
e(1, 2).
e(2, 3).
a(3).

p(?x, ?y) :- e(?x, ?y).
p(?x, ?z) :- p(?x, ?y), e(?y, ?z).

q(?x) :- p(_, ?x), a(?x).
```

```bash
nmo rules.rls --trace "p(1,3);q(3)"
```

This results in the following traces being produced:
```txt
 p(1, 3) :- p(1, 2), e(2, 3) .
 ├─ p(1, 2) :- e(1, 2) .
 │  └─ e(1, 2)
 └─ e(2, 3)


 q(3) :- p(1, 3), a(3) .
 ├─ p(1, 3) :- p(1, 2), e(2, 3) .
 │  ├─ p(1, 2) :- e(1, 2) .
 │  │  └─ e(1, 2)
 │  └─ e(2, 3)
 └─ a(3)
```
If you want to trace facts that contain strings, you need to escape the strings properly.
On Unix systems, both
`--trace 'p("a","b")'` and `--trace "p(\"a\",\"b\")"` are recommended options.
