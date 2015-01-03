---
layout: default
title: Linear Regression (other Shrinktage methods)
---

Linear Regression
================

LASSO
-------------

We saw in the previous page that using a Gaussian prior on the parameter $$\beta$$ leads us to another solution than the ordinary least squares approach. However, the Gaussian assumption was simply an assumption. Now, we will try to use another assumption to deduce *LASSO* (*L*east *A*bsolute *S*election and *S*hrinkage *O*perator). Therefore, we only assume $$\beta$$ following the *Laplace distribution* with density function

$$p(x,\mu,b):=\frac{1}{2b} \exp \left( -\frac{|x-\mu|}{b} \right)$$

You can adjust the plot and play around with the values of $$\mu,b$$ seeing that $$b$$ is the vertical scale parameter and $$\mu$$ is the horizontal location.

{% include figures/laplace_distr.html %}

Doing the same as we did for the ridge regression here, we get 

$$p(\beta_i,0,t)=\frac{1}{2t}\exp \left( -\frac{\vert \beta_i\vert}{t} \right) \propto \exp \left( -\frac{\vert \beta_i\vert}{t} \right)$$

Plug this into the MAP-formula we get

$$
\begin{align*}
p(\beta \vert x,y) &\propto p( x,y \vert \beta)p(\beta)\\
&\propto\exp\left(-\frac{\sum_{i=1}^n (y-\beta^Tx_i)^2}{2\sigma^2}\right)
\exp \left( -\frac{\vert \beta_i\vert}{t} \right)
\end{align*}
$$

And the log-likelihood looks like:

$$
-\frac{\sum_{i=1}^n (y-\beta^Tx_i)^2}{2\sigma^2} - \frac{1}{t}\sum_{i=1}^d\vert\beta_i\vert
$$

In matrix formulation maximizing the log-likelihood is equal to minimizing

$$
(y-X\beta)^T(y-X\beta) + \lambda\Vert \beta \Vert_1
$$

Hence, swapping the assumption of Gaussian into Laplacians on $$\beta$$ just results in another penalty term on $$\beta$$.

As you might notice this objective function is not linear in $$\beta$$ anymore. Will will later see how to optimize this objective function.

Subset-Selection
------------------

Rather than penalizing the size of the parameter $$\beta$$ we may ask if we need all entries $$\beta_i$$ to be non-zero. Remember $$\beta_i$$ indicates how much this input entry influence the output.

$$RSS(\beta):=\sum_{i=1}^n (y_i-h(x_i))^2 = \sum_{i=1}^n (y_i- \sum_{j=0}^d \beta_jx_i^{(j)})^2 $$

Hence, $$\beta_8=0$$ let us ignore the 8-th entry of each data point $$x_i$$. But idea leads us to some other more rough heuristics namely forward and backward selection. Given an input dimension of $$d$$ gives us $$2^d$$ possible combination of the input factors, because we can ignore each entry $$j$$ in $$x_i^{(j)}$$ or use it. You can think about throwing some descriptors $$x_i^{(j)}$$ in each data point $$i$$ away and only focus on strong descriptors. Think about a model describing our success in a math exam. You will agree that the model

$$\text{math score}\propto \text{time of learning} + \text{relaxed attitude} + \text{water level 500 km away}$$

may include some useless measurements. 

### Forward selection
Why not starting with a very simple model

$$\text{math score}\propto 1$$

and adding some input factors w.r.t. to their impact on the RSS ? How to measure the impact or how to measure what good input factors are? We have to probability distributions:

- $$f(x)$$ true unkown underlying process
- $$h(x,\beta)$$ a model describing the hidden process

Using the Kullback-Leibler Divergenz we can measure a distance between $$f$$ and $$h$$ by computing

$$I(f,h) = \int_{-\infty}^{+\infty}f(x)\log \left( \frac{f(x)}{h(x,\beta)} \right)$$

A good model would match the truth distribution $$f(x)$$. Hence, the best model is

$$\hat{h}=\operatorname{argmin}_h I(f,h)$$

Since we do not know $$f(x)$$ we need to estimate $$I(f,h)$$. Therefore, let use decompose the integral by

$$
\begin{align*}
I(f,h) 
&= \int_{-\infty}^{+\infty}f(x)\log \left( f(x) \right) &-& \int_{-\infty}^{+\infty}f(x)\log \left( h(x,\beta) \right)
\\
&= \mathbb{E}_f[\log \left( f(x) \right)] &-& \mathbb{E}_f[\log \left( h(x,\beta) \right)] 
\end{align*}
$$

However, this seems to be a dead end because we need information about the true model. Fortunately, Akaike showed that 
$$\log \left( L(\hat{\beta}\vert \mathcal{D}) \right)$$ is a biased estimate which is necessary to know to minimize the Kullback-Leibler distance. More precise, the equation

$$\log \left( L(\hat{\beta}\vert \mathcal{D}) \right) - k=\mathbb{E}_f[\log g(x,\beta)]- \hat{\mathbb{E}}_{\hat{\beta}}[I(f,\hat{g})]$$

holds, where we denote $$\hat{g}=g(x\vert \hat{\beta}(y))$$ and $$k$$ the number of parameters. The Akaike-Information-Criterion is defined as

$$2k-2\log \left( L(\hat{\beta}\vert \mathcal{D}) \right).$$

To now chose the a good model from a set of models we use the ACI values for each model