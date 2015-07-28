---
layout: default
title: Linear Regression a probabilistic interpretation
---

Linear Regression 
================

from a probabilistic view
---------------------------

But why should we use the sum of quadratic residuals? Therefore, let us model a probabilistic view to this problem. We assume that the target value $$y_i$$ depends in a linear way on the input value $$x_i$$ and some noise:

$$y_i=\beta^Tx_i + \varepsilon$$

We assume $$\varepsilon\sim \mathcal{N}(0,\sigma^2)$$ to be a Gaussian with variance $$\sigma^2$$. Since, $$\beta^Tx_i+0$$ is a constant, the data generator for $$y$$ is a Gaussian with mean $$\beta^Tx_i+0$$ and variance $$\sigma^2>0$$. The following figure illustrates data drawn from a linear model with adjustable $$\sigma$$.

{% include figures/linreg-prob.html %}

The distribution of all $$y_i$$ is given by

$$p(y\vert x_i,\beta)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(y-\beta^Tx_i)^2}{2\sigma^2}\right).$$

So each output $$y_i$$ comes from a distribution with distribution parameter $$\beta$$. Now, we can ask again what is the best parameter $$\beta$$ that describes the data $$\mathcal{D}=\{(x_1,y_1),(x_2,y_2),(x_3,y_3),\ldots, (x_n,y_n)\}$$ we already saw. There are two ways of choosing the optimal parameter called

- *Maximum Likelihood* (ML) and 
- *Maximum a-Posteriori* (MAP).

#### Bayes Rule
Both methods relies on the relation

$$p(\beta \vert \mathcal{D}) = \frac{p(\mathcal{D}\vert \beta )p(\beta )}{p(\mathcal{D})}.$$

Hereby, $$p(\beta )$$ is the prior probability of $$\beta$$ without looking at a single datapoint; $$p(\mathcal{D}\vert \beta )$$ is the likelihood of the data given a parameter $$\beta$$ and $$p(\mathcal{D})$$ is probability of the data independently of the parameter $$\beta$$.

The difference between *Maximum Likelihood* and *Maximum a-Posteriori* is the motivation behind them. While Maximum-Likelihood tries to choose a parameter that maximize the probability of the observed data $$p(d \vert \beta )$$, given that parameter $$\beta $$. The methods of Maximum a-Posteriori choose $$\beta $$ that maximizes the posterior probability of $$\beta$$ incorporate a prior $$p(\beta)$$ as knowledge. You can think about Maximum-a-Posteriori as a guy who knows more or assumes more than the guy Maximum-Likelihood. Maximum-Likelihood starts in having a parameter $$\beta$$ asking how likely is to observe the data $$\mathcal{D}$$.

Consider the process of tossing a coin. Does it make sense to refer to a coin that produces the sequence *head,tail* as being a fair coin while a coin producing the sequence *head,head* being not a fair coin? Maximum likelihood would exactly state label these observations *head,tail* and *head,head* in this way. In contrast a carefully chosen prior would prevent the Maximum-a-Posteriori approach from these statements by use information about the distribution of $$\beta$$ in $$p(\beta)$$. Both methods yields the same solution if $$\beta$$ follows an uniform distribution.


##### Maximum Likelihood
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

Now minimizing $$\log L(\beta\vert x,y)$$ equals the process *ordinary least square* of minimizing $$\sum_{i=1}^n (y-\beta^Tx_i)^2$$. 

##### Maximum A-Posteriori
Let's use the probabilistic interpretation to inject some prior knowledge about the parameter $$\beta$$. Therefore, let us assume $$\beta \sim \mathcal{N}(0,\tau^2\mathbb{1})$$. This implies the distribution of $$\beta$$ according

$$p(x) = \exp\left(-\frac{x^Tx}{2\tau^2}\right)$$

Including this prior the MAP estimator of the best $$\beta$$ can be computed by maximizing

$$
\begin{align*}
p(\beta \vert x,y) &\propto p( x,y \vert \beta)p(\beta)\\
&=\exp\left(-\frac{\sum_{i=1}^n (y-\beta^Tx_i)^2}{2\sigma^2}\right)\exp\left(-\frac{\beta^T\beta}{2\tau^2}\right)
\end{align*}
$$

Applying the monoton transformation $$\log(\cdot)$$ to get the log-likelihood we need to maximize

$$
-\frac{\sum_{i=1}^n (y-\beta^Tx_i)^2}{2\sigma^2} - \frac{\beta^T\beta}{2\tau^2}
$$

combine the constants in $$\lambda$$ the objective function becomes

$$
(y-X\beta)^T(y-X\beta) + \lambda\Vert \beta \Vert_2^2
$$

This look pretty similiar to our first $$RSS(\beta)$$ despite the additional term $$\Vert \beta \Vert_2^2$$ which imposes a penalty at the size of parameter $$\beta$$. Let us find the optimal $$\beta$$ of this objective function. Again we need to set the derivative to zero

$$
\begin{align*}
0=\nabla_\beta (y-X\beta)^T(y-X\beta) + \lambda\Vert \beta \Vert_2^2
&=
\nabla_\beta (y-X\beta)^T(y-X\beta) + \nabla_\beta \lambda\Vert \beta \Vert_2^2
\\
&= 2X^TX\beta-2Xy + 2\lambda \beta
\\
\end{align*}
$$

The first term was easy since, we already had this gradient before and the second term is just the derivative of $$\lambda \beta^T\beta$$. This implies

$$
0 =X^TX\beta-Xy + \lambda \beta \implies Xy =\left( X^TX+ \lambda 1 \right)  \beta
$$

Taking the inverse of $$\left(X^TX+ \lambda 1 \right) $$ gives 

$$\hat{\beta} = \left(X^TX+ \lambda 1 \right) ^{-1}Xy $$

This is so called *Tikhonov regularization* or *rigde method*. Our assumption of $$\beta$$ be drawn from a Gaussian results in ridging the gram matrix $$X^TX$$ by adding $$\lambda$$ to each entries of the main diagonal. If $$X^TX$$ would be not invertible $$X^TX+ \lambda 1$$ will do so. To see this we will try to prove $$X^TX+ \lambda 1$$ being positive definite. Rewriting the positive semidefinite matrix $$A\gets X^TX$$ gives

$$x^T(A + \lambda 1) x = x^T A  x + x^T \lambda x \ge \lambda \Vert x\Vert^2_2>0 \quad \text{for all } x\neq 0.$$

Hence, $$X^TX+ \lambda 1$$ is positive definite for $$\lambda>0$$ and invertible.

{% include figures/linreg-compare.html %}

To compute the parameters in Julia just use

<span class="gist">https://raw.githubusercontent.com/IntelligentAlgorithms/JuliaFiles/master/linearmethods/lcd-ridge.ipynb</span>