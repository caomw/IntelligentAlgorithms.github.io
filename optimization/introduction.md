---
layout: default
title: Optimization Introduction
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

But how to find this minimum using an algorithm. For quadratic forms like $f(x)=x^TQx + b^Tx$ this might be easy, since the setting the derivative $Qx+b$to zero gives a linear equation system, which we can solve using LR decomposition. Consider simple Polynomials $f=X^n\sum_{k=0}^{n-1} \alpha_kX^k \in K[X]$ of degree $n$. From Galois-Theory we know that for $n>4$ there does not exists a closed-form solution. But the way out of this issue when optimizing a function is to optimize an approximation of $f$ in an interative fashion.

We will consider smooth functions 

$$f\colon \IR^n\to \IR, \quad x\mapsto f(x)=:y$$


Gradient descent
-------------------
Using the Taylor approximation we can replace an abitrary smooth function $$f(x)$$ in a small area around $$a$$ by

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

holds. Making $$\eta$$ sufficient small, we can ignore $$\eta^2\mathcal{O}(1)$$. To find the direction $$d$$ with length $$\Vert d\Vert_2=1$$ which will decrease the objective value $$f(a+\eta d)$$ it is sufficient to minimize $$d^T \nabla_x f(a)$$. Now, from linear calculus we know 

$$d^T \nabla_x f(a) = \Vert d \Vert \cdot \Vert \nabla_x f(x)\Vert \cdot \cos(\theta)$$

Since, our direction $d$ has unit length and $\Vert \nabla_x f(x)\Vert$ is constant, this expression minimize the cosine of the angle $\cos(\theta)$ between $d$ and $\nabla_x f(x) $. This implies $\cos(\theta)=-1$ and hence

$$d=\frac{-\nabla_x f(a)}{\Vert \nabla_x f(a) \Vert}$$

is the direction of deepest descent.
The gradient $$\nabla f(\tilde{x})$$ in $$\tilde{x}$$ is always pointing to the next location with a bigger objective value. Why not follow the counter-direction of the gradient?

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

Newton descent
-------------------

What about using a better approximation of $f$? The second order Taylor approximation is

$$f(x)= f(a)+(x-a)\nabla_x f(a)+0.5(x-a)^T\nabla_x^2 f(a)(x-a)+\mathcal{O}(\Vert x-a\Vert^3),$$

where $\nabla_x^2 f(a)$ is the hessian $H(a)$ in $a$.

This is just a quadratic approximation of $$f$$ in some point $$a$$.
{% include figures/newton_deepest.html %}

But let's step back. A method to find the roots $g(x)=0$ of linear function $g\colon \IR^n \to \IR^n$ can be done by approximate $g$ again in a linear way:

$$g(x+a)\approx g(a)+\nabla g(x)^Ta,$$

where $\nabla g(x)^T\in \IR^{n\times n}$ is the Jacobian in $x$. Hence, the first order optimality condition gives

$$0=g(x+a)\approx g(a)+\nabla g(x)^Ta, \implies -g(a)=\nabla g(x)^Ta$$

and for non-singular $\nabla g(x)^T$ we can solve this system of equations to obtain $a$. The iteration continues by setting $x\gets x+a$.

Now minimizing $f(x)$ can by done by minimize it's approximation $q(x)$ (dashed blue line)

$$f(x) \approx q(x):=f(a)+(x-a)\nabla_x f(a)+0.5(x-a)^TH(a)(x-a).$$

Again finding the roots of the derivative yields a linear equation system

$$0=\frac{\partial}{\partial x}q(x) = \nabla_x f(a)+H(a)(x-a) $$

Notice, $H(a)$ is symmetric and $\frac{\partial}{\partial x}x^TQx=(Q+Q^T)x$. Solving this linear equation system is straight forward, since

$$0=\nabla_x f(a)+H(a)(x-a) \implies a-H(a)^{-1}\nabla_x f(a) =x$$

Therefore, a simple update rule would be $x\gets x -H(a)^{-1}\nabla_x f(a)$. The direction $-H(a)^{-1}\nabla_x f(a)$ is called *Newton*-direction. But wait! Do we have a guarantee for a descent direction $d=-H(a)^{-1}\nabla_x f(a)$, i.e. $\nabla_x f(x)^Td< 0 $. This condition $\nabla_x f(x)^Td< 0 $ ensures via Taylor theorem that $f$ will be reduced going into this direction. We will write $H$ for $H(a)$.

A sufficient condition for $\nabla_x f(x)^Td< 0 $ is $H$ to be positiv definit. Given $H$ positiv definite, then $v^THv>0$ for $v\neq 0$. Hence,

$$
v^TH^{-1}v = (H^{-1}v)^TH(H^{-1}v)>0
$$

And therefore, $\nabla_x f(x)^Td = -\nabla_x f(x)^TH(a)^{-1}\nabla_x f(a) < 0 $. Unfortunately computing the inverse of a matrix is mostly not possible and efficient. We will later see how to avoid computing the inverse of the Hessian or even more avoid to compute the Hessian itself.

Steplength
------------

A crucial value is the steplength $\eta$ in $x\gets x + \eta d$ for some descent direction $d$. $\eta$ should be large enough to make a substantial recution of the objective value, but on the other hand identifying a good value for $\eta$ should be computational efficient. Or at least not as hard as minimzing the objective function, since we need to call it in each iteration step.

We will spent a whole chapter on this.

High-order Approximation
--------------------------

Okay. We saw that optimizing second order approximation seems to be better, since the approximation behaves more similar to the original function. Why not a cubic approximation?

{% include figures/cubic_deepest.html %}

Well, using a cubic approximation need to solve a quadratic form for the direction of the deepest descent. And this needs much computational effort as we saw before.