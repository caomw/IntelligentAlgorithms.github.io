---
layout: default
title: linesearch
---

Linesearch
=====================

Numerical optimization algorithm are running in an iterative fashion. For a given intial guess $x_0$ they produce a sequence $(x_k)_{k=1,2,\ldots}$ of guesses what the minimum of a function would be, i.e., $f(x_0)\geq f(x_1) \geq \ldots f(x_k) \geq \ldots $ until they converge (notice we assume an existing lower bound for $f$) or another criterion as max-iter applies. The update rule is simply

$$x_{k+1}=x_k + \eta d,$$

where is a direction and $0<\eta \in \IR$ the steplength. It is crucial to choose the a good value for $\eta$. There is a tradeoff between a large $\eta$ allowing a substantial redution of the objective value, and on the other hand identifying a good value for $\eta$ should be computational efficient. Or at least not as hard as minimzing the objective function, since we need to call it in each iteration step.

The goal of a line-search algorithm is to find a reasonable $\eta$ for a given $d$. Notice, $d$ being a descent direction ensures the decrease of the objective value. By Taylor

$$f(x+\eta d) \approx f(x) + \eta \nabla f(x)^Td$$

we get that $d$ is the direction of descent iff $\nabla f(x)^Td< 0$. We define 

$$\phi \colon \IR \to \IR, \quad \eta \mapsto  f(x+\eta d)$$

Unfortunately, minimizing $\phi(\eta)$ is mostly not that easy. So a linesearch usually tries to identify good values for $\eta$. Maybe not the best possible values but sufficient good values for further progress during the iteration while having low computational costs.

Wolfe conditions
--------------

We will now speak about two conditions for a good line search.

### Decrease condition
For a line search we expect a value that ensure a decrease of the objective.
Consider $f(x+\eta d) \approx f(x) + \eta \nabla f(x)^Td$ again. If we can ensure 

$$f(x+\eta d) \leq f(x) + c_1\eta \nabla f(x)^Td$$

for some constant $c_1\in ]0,1[$ this would be a perfect value for $\eta$, since we have a guarantee of a decreasing objective value. This inequality is named **Armijo-Rule**. Denoting the linear RHS $u(\eta)=f(x) + c_1\eta \nabla f(x)^Td$ as the upperbound, we are interested in regions that lies below the graph of the objective function.

{% include figures/armijo_upperbound.html %}

In this figure above only the blue regions will be accepted, since their objective values is less than the $u(\eta)$. As you might notice, small values for $\eta$ always fullfill this constraint. This is an issue, because we are interested in some progress. 

### Curvature condition

Now, we want to force a good value to provide at lest some progress. Or in words, we forbid any value that yields only a small change. The condition is just

$$\phi'(\eta) \geq c_2 \phi'(0)$$

Namely the slope when applying the candidate steplength should be larger than the initial slope in $\eta=0$. Consider the next figure.

{% include figures/armijo_curvature.html %}

Moving the mouse will change the candidate steplength.  If the slope of the candidate is strong negative (hence: violating $\phi'(\eta) \geq c_2 \phi'(0)$) then this indicates that we can go further and we do not need to stop there. On the other hand: if the slope is greather than the slope in 0, it could be that an additional increase of $\eta$ will not have a huge impact and we should stop there.

### Wolfe conditions

These conditions:

- decrease condition $f(x+\eta d) \leq f(x) + c_1\eta \nabla f(x)^Td$ and
- curvature condition $\phi'(\eta) \geq c_2 \phi'(0)$
- $0< c_1< c_2 < 1$

are called **Wolfe conditions**.

But there is another tiny problem. In the last figure above you can see that both conditions accept $10$ as a candidate while $8.8$ violates the Wolfe conditions. This is because $\phi'(8.8)< \phi'(0)$ and $\phi'(10)>0>c_2 \phi'(0)$. The so called strong Wolfe conditions forces $\eta$ being near to a local minima by stating the constraints

- decrease condition $f(x+\eta d) \leq f(x) + c_1\eta \nabla f(x)^Td$ and
- curvature condition $\vert \phi'(\eta)\vert \geq c_2 \vert  \phi'(0) \vert$
- $0< c_1< c_2 < 1$

Any large positiv $\phi'(\eta)$ will be ignore by the *strong* Wolfe conditions while they are valid using the Wolfe conditions. If we assume $f$ being continous differentiable and bounded (which makes sense, if we are looking for a minima) then it is easy to show that there is an $\eta$ which is valid for both conditions.

Backtracking
-----------------
