---
title: test

kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

Code cell met ipython 3 in een md file

```{code-cell} ipython3
import numpy as np
import matplotlib.pytplot as plt

x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

plt.figure()
plt.plot(x,y,'k.')
plt.show()
```

```{figure} fig1.png
:width: 70%

Some caption
```