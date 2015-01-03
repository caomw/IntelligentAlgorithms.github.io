---
layout: default
title: Gradient descent
---

Optimizing a function
=====================

While in $$\LaTeX$$ it is easy to write

$$x^\star = \operatorname{argmin}_x f(x) $$

for some function 

$$f\colon \mathbb{R}^d \to \mathbb{R},\quad x\mapsto f(x)$$

 in real problems this might be hard to compute. Exspecially if $$f$$ has no nice properties like being convex or even differentiable. Consider the following function

$$
f(x,y)=\cos\left(\frac{x}{15}\pi \right)\cos\left(\frac{y}{15}\pi \right)\cdot 60
+ \cos \left(\frac{x}{8}\pi \right)\cos \left(\frac{y}{10}\pi \right)\cdot 40
$$

Exploring this function a 3d-plot allows us easy to indentify whery the global minimum is located.

{% include figures/pretty3d.html %}

But how to find this minimum using an algorithm. Using the Taylor approximation we can replace the function $$f(x)$$ in a small area around $$a$$ by

$$f(x)= f(a)+(x-a)\nabla_x f(a)+\mathcal{O}(\Vert x-a\Vert^2).$$

This is just a linear approximation of $$f$$ in some point $$a$$.
{% include figures/gradient_deepest.html %}

In an iterative way we would like to slightly adjust in each step the current position $$x$$ by going in direction $$d$$ by a small amount $$\eta$$. But what is the best direction? If we exchange $$x$$ to $$x+\eta d$$ the Taylor approximation becomes

$$
\begin{align*}
f(x+\eta d)
&= f(a)+(x+\eta d-a)\nabla_x f(a)+\mathcal{O}(\Vert x+\eta d-a\Vert^2)
\\
&= f(a)+(x-a)\nabla_x f(a) + \eta d^T \nabla_x f(a) +\eta^2\mathcal{O}(1)
\end{align*}
$$

Especially

$$
\begin{align*}
f(a+\eta d) &= f(a) + \eta d^T \nabla_x f(a) +\eta^2\mathcal{O}(1)
\\
\iff f(a+\eta d) - f(a) &= \eta d^T \nabla_x f(a) +\eta^2\mathcal{O}(1)
\end{align*}
$$

holds. Making $$\eta$$ sufficient small, we can ignore $$\eta^2\mathcal{O}(1)$$. To find the direction $$d$$ with length $$\Vert d\Vert_2=1$$ which will decrease the objective value $$f(a+\eta d)$$ it is sufficient to minimize $$d^T \nabla_x f(a)$$. This implies

$$u=\frac{-\nabla_x f(a)}{\Vert \nabla_x f(a) \Vert}.$$

In other words $$-\nabla_x f(a)$$ is the direction of the deepest descent. The gradient $$\nabla f(\tilde{x})$$ in $$\tilde{x}$$ is always pointing to the next location with a smaller objective value. Why not follow this gradient?

1. start in $$x_0$$ and $$k \gets 0$$
2. for $$k\gets 1,2,\ldots, N$$
   - compute $$x_{k+1} = x_k - \eta \nabla f(x_k)$$ until we reach a minimum
   - break if we found a minimum


{% include figures/gradient_descent.html %}

We see, that this algorithm converges in this example to a local minimum. Instead of a fixed number of iteration (as $$N$$) these steps should be repeat until we detect a convergence or a failure of this algorithm. Possible options to stop this algorithms are

- enter a critical point, i.e., $$\Vert \nabla f(x_k) \Vert < \varepsilon$$
- to small changes (convergence), i.e., $$\Vert x_k - x_{k-1} \Vert < \varepsilon$$
- $$f(x_{k+1})>f(x_k)$$ indicates that diverging occurs

In this animation above $$\eta$$ was fixed to $$0.3$$.