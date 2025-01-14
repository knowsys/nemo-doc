---
title: Attributes
---

Attributes are annotations applied to rules that provide additional context or configuration. They are written like this:

```
#[attribute_name(parameter_1, parameter_2, ...)]
parent(?p, ?c) :- child(?c, ?p) .
```

### Supported attributes

| Attribute    | Parameters      | Explanation |
| ------------ | --------------- | ------------
| `name`       | `name(str)`     | Specifies the name of the rule as a constant string. |
| `display`    | `display(str)`  | Specifies how instantiations of the rule will be displayed. The parameter may use any safe variable from the rule body. |

