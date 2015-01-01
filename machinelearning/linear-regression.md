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

This can be easily done in Julia

<pre><code class="matlab">
{% include listings/least_squares.jl %}
</code></pre>

### a probabilistic interpretation

But why should we use the sum of quadratic residuals? Therefore, let us model a probabilistic view to this problem. We assume that the target value $$y_i$$ depends in a linear way on the input value $$x_i$$ and some noise:

$$y_i=\beta^Tx_i + \varepsilon$$

We assume $$\varepsilon\sim \mathcal{N}(0,\sigma^2)$$ to be a gaussian with variance $$\sigma^2$$. Since, $$\beta^Tx_i+0$$ is a constant, the data generator for $$y$$ is a gaussian with mean $$\beta^Tx_i+0$$ and variance $$\sigma^2>0$$. The following figure illustrates data drawn from a linear model with adjustable $$\sigma$$.

{% include figures/linreg-prob.html %}

The distribution of all $$y_i$$ is given by

$$p(y|x_i,\beta)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(y-\beta^Tx_i)^2}{2\sigma^2}\right).$$

So each output $$y_i$$ comes from a distribution with distribution parameter $$\beta$$. Now, we can ask again what is the best parameter $$\beta$$ that describes the data $$\mathcal{D}=\{(x_1,y_1),(x_2,y_2),(x_3,y_3),\ldots, (x_n,y_n)\}$$ we already saw. There are two ways of choosing the optimal parameter called

- *Maximum Likelihood* (ML) and 
- *Maximum a-Posteriori* (MAP).

#### Bayes Rule
Both methods relies on the relation

$$p(\beta |\mathcal{D}) = \frac{p(\mathcal{D}|\beta )p(\beta )}{p(\mathcal{D})}$$

The difference is the motivation behind them. While Maximum-Likelihood tries to choose a parameter that maximize the probability of the observed data $$p(d \vert \beta )$$, given that parameter $$\beta $$. The methods of Maximum a-Posteriori choose $$\beta $$ that maximizes the posterior probability of $$\beta$$ incorporate a prior $$p(\beta)$$ as knowledge. You can think about Maximum-a-Posteriori as a guy who knows more or assumes more than the guy Maximum-Likelihood.

Consider the process of tossing a coin. Does it make sense to refer to a coin that produces the sequence *head,tail* as being a fair coin while a coin producing the sequence *head,head* being not a fair coin? Maximum likelihood would exactly state label these observations *head,tail* and *head,head* in this way. In contrast a carefully chosen prior would prevent the Maximum-a-Posteriori approach from these statements by use information about the distribution of $$\beta$$ in $$p(\beta)$$. Both methods yields the same solution if $$\beta$$ follows an uniform distribution.

Back to our linear regression problem we will apply Maximum-Likelihood approach since in most cases this is much easier. Therefore, we define a Likelihood function assuming the samples from $$\mathcal{D}$$ being i.i.d. (independent and identically distributed).

$$
\begin{align*}
L(\beta\vert x,y) &= p(\mathcal{D}\vert\beta)
=p(y\vert x,\beta) \\
&=\prod_{i=1}^n p(y_i\vert x_i,\beta) \\
&=\prod_{i=1}^n \frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(y-\beta^Tx_i)^2}{2\sigma^2}\right)
\end{align*}
$$

Solving $$\operatorname{argmax}_\beta L(\beta\vert x,y)$$ we may use the equivalent problem *log-Likelihood* $$\operatorname{argmax}_\beta \log L(\beta\vert x,y)$$. We minimize

$$
\begin{align*}
\log L(\beta\vert x,y) &= \log p(\mathcal{D}\vert\beta) \\
&=\log \prod_{i=1}^n \frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(y-\beta^Tx_i)^2}{2\sigma^2}\right)
\\
&=\sum_{i=1}^n\log \left(\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(y-\beta^Tx_i)^2}{2\sigma^2}\right)\right)
\\
&=\sum_{i=1}^n -\log(\sigma\sqrt{2\pi})-\frac{(y-\beta^Tx_i)^2}{2\sigma^2}
\\
&=-n\log(\sigma\sqrt{2\pi})- \frac{1}{2\sigma^2}\sum_{i=1}^n (y-\beta^Tx_i)^2
\\
\end{align*}
$$