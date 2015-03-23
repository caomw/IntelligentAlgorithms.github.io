---
layout: default
title: Linear Classification
---

Linear Classification
================

Rather than trying to predict a continous function

$$f \colon\mathbb{R}^d\to \mathbb{R},\quad x \mapsto f(x)$$

we could aslo ask how to predict a *class assignment* function

$$f \colon\mathcal{X}\to \mathcal{C},\quad x \mapsto f(x)\in\{c_1,c_2,\ldots,c_C\}$$

when setting $$\mathcal{Y}:=\mathcal{C}$$ to a finite set. An obvious way to handle this problem is to find a model $$h_k$$ for each class $$c_k$$ and checking the distance for a query point to each model. This is exactly the same idea as in the initial example:

{% include figures/gaussians_mean_prediction.html %}

where we get the simple model $$h_k=\frac{1}{\#\{i:y_i=k\}}\sum_{i:y_i=k}x_i$$. For each point $$\hat{x}$$ in the domain $$\mathbb{R}$$ we can query its label $$\hat{y}$$.

{% include figures/gaussians_mean_fillregion.html %}

You can cleary see a linear line separating both classes. More generally, each class can be fitted by a model $$h_\ell(x) = \sum_{i=0}^d \beta_{i,\ell}x$$. The decision boundary between class $$a$$ and $$b$$ are those points that cannot be classified to a single class. 

Actually, each data point lifes on a side of this line (or in general in a region defined by a hyperplane) and has its distance to this line. 
Lead us consider the binary classification problem ($$\mathcal{C}=\{c_1,c_0\}=\{0,1\}$$) again. Squashing the value of the model to the intervall $$[0,1]$$ can help to indicate a class. Therefore, we just apply a monotone transformation

$$\sigma(t) = \frac{1}{1+\exp(-t)}.$$

So our hypothesis that the data point $$x$$ belongs to a class becomes

$$h(x)=\sigma(\beta^Tx)=\frac{1}{1+\exp(-\beta^Tx)} \in [0,1]$$

This directly models a probability distribution

$$
\begin{align*}
p(y=0\vert X=x) &= h(x)\\
p(y=1\vert X=x) &= 1-h(x)\\
\end{align*}
$$

or equivalently

$$
p(y\vert X=x) = h(x)^y  (1-h(x))^{1-y}.
$$

Using the maximum likelihood approach we just need to *learn* the parameters $$\beta$$ again. Assuming $$(x_i,y_i)_{i=1,2,\ldots,n}$$ to be iid. the objective function is

$$
\begin{align*}
L(\beta) &= \prod_{k=1}^n h(x_k)^{y_k} (1-h(x_k))^{1-{y_k}}
\\
L(\beta) &= \prod_{k=1}^n (\beta^Tx_k)^{y_k}  (1-(\beta^Tx_k))^{1-{y_k}}
\end{align*}
$$

Same game as before: we maximize the log-Likelihood

$$
\begin{align*}
\log L(\beta) &= \log \prod_{k=1}^n h(x_k)^{y_k}  (1-h(x_k))^{1-{y_k}}
\\ &=
\sum_{k=1}^n \log h(x_k)^{y_k} + \log (1-h(x_k))^{1-{y_k}}
\\ &=
\sum_{k=1}^n y_k \log h(x_k) + (1-y_k)\log (1-h(x_k))
\\ &=
\sum_{k=1}^n y_k \log \frac{1}{1+\exp(-\beta^Tx_k)} + (1-y_k)\log (1-\frac{1}{1+\exp(-\beta^Tx_k)})
\\ &=
\sum_{k=1}^n -y_k \log \left({1+\exp(-\beta^Tx_k)}\right) + (1-y_k)\log (\frac{\exp(-\beta^Tx_k)}{1+\exp(-\beta^Tx_k)})
\\ &=
\sum_{k=1}^n y_k \beta^Tx_k -\log\left( 1+\exp(\beta^Tx_k) \right)
\end{align*}
$$

Applying gradient descent we need to compute the derivative, too.

$$
\begin{align*}
\nabla_\beta \log L(\beta) &=  \nabla_\beta \sum_{k=1}^n y_k \beta^Tx_k -\log\left( 1+\exp(\beta^Tx_k) \right)
\\ &=
\sum_{k=1}^n y_k x_k -\nabla_\beta \log\left( 1+\exp(\beta^Tx_k) \right)
\\ &=
\sum_{k=1}^n y_k x_k - h(x_k) x_k 
\\ &=
\sum_{k=1}^n \left(y_k - h(x_k) \right) x_k 
\end{align*}
$$

This helps to implement gradient descent with update rule

$$\beta \gets \beta +\eta  \sum_{k=1}^n \left(y_k - h(x_k) \right) x_k $$

Intrinsically logistic regression squeeze the data as illustrated in the following figure:

{% include figures/logisticcompress.html %}

You will see, that applying $h(x)$ for a appropriate $\beta$ will force the data point to move at the correct side of the intervall $$[0,1]$$. Then, we can classify each point with ease.

<h3>Application</h3>
Let use again the dataset *breast cancer* containing 683 entries from a clinical study from 1989 having 9 recorded features for both classes. After normalization we should augment the data $$X$$ by adding a dimension with constant 1. [Doing so][juliabox_logregression] we can achieve an accuracy of 74%.

<span class="gist">https://gist.githubusercontent.com/PatWie/035d4c45eb9eef06ebe5/raw</span>

This is higher than our [first simple learning algorithm](/).


[juliabox_logregression]:http://nbviewer.ipython.org/gist/PatWie/035d4c45eb9eef06ebe5

