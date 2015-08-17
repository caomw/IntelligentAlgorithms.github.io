---
layout: default
title: Perceptron Algorithm
---

Linear Classification
=====================

Perceptron Learning Algorithm
-----------------------------

Rather than solving a the linear classification problem by fitting the data to a probability model by logistic regression. It exists a much simpler idea called *Perceptron Learning Algorithm*, which was proposed by [Frank Rosenblatt in 1958][perceptron].

Again, this algorithm follows the idea to separate data points by a linear classification line: $$f(x)=\beta x $$. Initialised by random values, the algorithm will be presented by a pair $$(x_i,t_i)$$ of input $$x_i$$ and target $$t_i$$ from the training set in each iteration. Depending on whether the predicted sign $$y_i$$ matches the true label $$t_i$$ or not, the weight $\beta$ will be updated. The update rule is given by:

$$
\beta \gets \beta + \eta (t_i-y_i) x_i
$$

for each coordinate, where $$y_i, t_i\in\{-1, 1\}$$. In the case of a classification error the weight $$\beta$$ will be update. If the prediction is already correct ($$t_i=y_i$$) nothing changes.

{% include figures/gaussians_perceptron.html %}

Although this simple perceptron algorithm has a long running time on the example data set, it produces good results:

<span class="gist">https://raw.githubusercontent.com/IntelligentAlgorithms/JuliaFiles/master/linearmethods/perceptron.ipynb</span>


[perceptron]:http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.335.3398

