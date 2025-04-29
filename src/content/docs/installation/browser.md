---
title: Using the nemo playground
---
To get started with Nemo without any installation process check out our [interactive browser tool](https://tools.iccl.inf.tu-dresden.de/nemo). It is easy to use and supports code editing: 
![Nemo in the browser, showing the code editor with the ancestors example open on the left, and the execution panel on the right, listing derived facts for a predicate.](../../../assets/screenshot-nemo-web-descendants.png)

---

To understand why a certain result is computed, select the grey button behind any result to see its trace.
For example, the image below shows how the trace of `goal(alice)` that describes why `alice` is a common descendant of `isabelle` and `heinrich`:
![Nemo in the browser, displaying the tracing for the derived fact 'goal(alice)' in the tree layout. The fact is derived based on the predicates 'parent', 'ancestor' and 'commonDescendant'.](../../../assets/screenshot-nemo-web-tracing-descendants.png)
