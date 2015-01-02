---
layout: default
title: Linear Regression
---

Linear Regression
================

In contrast to our previous classification problem we would like to predict the performance on math tests under influence of drugs. There was a study by Wagner, Agahajanian, and Bing  in 1968. A group of volunteers was given Lysergic Acid Diethylamide, their scores on math exam and tissue concentrations of LSD were obtained at several time points. The mark 

	# lsd    score
	  1.17   78.93
	  2.97   58.20
	  3.26   67.47
	  4.69   37.47
	  5.83   45.65
	  6.00   32.92
	  6.41   29.97

What will be the mean math score given a tissue concentration of `5.2`? We can model this dependency between the tissue concentration and meth score in a linear way:

$$y = \alpha\cdot x+\beta$$

First, let us illustrate these given values in a simple line chart.
{% include figures/lsd-math-try.html %}

So try to adjust the angle $$\alpha$$ and the offset $$\beta$$ to match the data in a good way. Use the other button `get best values` the get mathematically optimal values.

Least Squares
---------------
Given training data 

$$(x_1,y_1),(x_2,y_2),(x_3,y_3),\ldots, (x_n,y_n) \in \mathbb{R}^d\times \mathbb{R}.$$

We will find the best linear model (best hypothesis)

$$h \colon\mathbb{R}^d\to \mathbb{R},\quad x \mapsto \beta_0 + \sum_{i=1}^d \beta_ix^{(i)} .$$

In the indroduction example (math, lsd) the dimension was simply $$d=1$$.
While the input $$x_i$$ can represent diverging things like transformation of data, e.g.,  $$\log(\cdot),\exp(\cdot)$$ or even dummy-vairiables the model stays linear in the parameters. To find the best parameter $$\beta$$, we now solve this problem by minimizing the residual sum of squares

$$RSS(\beta):=\sum_{i=1}^n (y_i-h(x_i))^2 = \sum_{i=1}^n (y_i- \beta_0 - \sum_{j=1}^d \beta_jx_i^{(j)})^2 $$

To find the best parameters $$\beta_j$$ we slightly rewrite this formular by introducing an artificially 1 as $$x_i^{(0)}$$. Writing each training example into a row of $$X$$ by

$$
X=\begin{pmatrix}
1 & x_1^{(1)}& x_1^{(2)}& x_1^{(3)}&\ldots&x_1^{(d)}\\
1 & x_2^{(1)}& x_2^{(2)}& x_2^{(3)}&\ldots&x_2^{(d)}\\
\vdots &\vdots &\vdots &\vdots &&\vdots \\
1 & x_n^{(1)}& x_n^{(2)}& x_n^{(3)}&\ldots&x_n^{(d)}\\
\end{pmatrix}
$$

Hence, the objective becomes

$$RSS(\beta)=(y-X\beta)^T(y-X\beta)$$

This quadratic form has its minimum at 

$$\hat{\beta}=(X^TX)^{-1}X^Ty$$

Since:

$$
\begin{align*}
0=\nabla_\beta RSS(\beta)
&=\nabla_\beta [(y-X\beta)^T(y-X\beta)]
\\
&=\nabla_\beta [(y^T-\beta^TX^T)(y-X\beta)]
\\
&=\nabla_\beta [y^Ty-y^TX\beta-\beta^TX^Ty+\beta^TX^T(X\beta)]
\\
&=\nabla_\beta tr[y^Ty-y^TX\beta-\beta^TX^Ty+\beta^TX^T(X\beta)]
\\
&=\nabla_\beta tr[y^Ty]-\nabla_\beta tr[2y^TX\beta]+\nabla_\beta tr[\beta^TX^T(X\beta)]
\\
&=0-2Xy+2X^TX\beta
\\
\implies 0 &=X^TX\beta-Xy
\\
\implies Xy &=X^TX\beta \implies (X^TX)^{-1}Xy =\beta
\end{align*}
$$

We only assume $$X^TX$$ to be invertible, i.e., each of the observed data is unique or equivalent there are no two identical datapoints in the training set. We will later see how to drop this assumption.

We can easily code this *ordinary least squares* using Julia

<pre><code class="matlab">
{% include listings/least_squares.jl %}
</code></pre>

