---
title: Global parameters
---
Programs often differ only in the values of some constants, with the
overall structure of the rules remaining the same. *Global parameters*
make this explicit and allow reusing a program where just these values
change. 

A global parameter is declared using `@parameter`, as follows:
```nemo
@parameter $name .
```

Afterwards, `$name` can be used throughout the program (in rules and in facts) like any constant. Optionally, a default value can be given:
```nemo
@parameter $with_default = <https://example.org/default> .
```

Values for parameters can be specified [on the command line](/nemo-doc/installation/cli/index.html#setting-parameters) with the `--param` option, as follows:
```bash
nmo rules.rls --param "name=<https://example.org/name>" .
```
