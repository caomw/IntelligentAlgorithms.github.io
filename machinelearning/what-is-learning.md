---
layout: default
---

What is Learning?
================

When teaching a computer or an intelligent machine to *learn* doing something, the question about what learning intrinsically means arises. While we have an very clear intuition what learning is and we are easily able to identify if somebody seems to be smart, it is hard to exactly define the underlying act. Learning at a very basic level can be considered as the process of dynamical adjustments that improves the act of solving a specific task with or without intention. As a consequence this implies that learning is build up on understanding. To perform these adjustemst it is essentially to have a proper knowledge about the corresponding mechanism.



The most simple learning algorithm
--------------

Let's step back from sophisticated problems to a more simple problem, where you only have to decided whether the gray point belongs to the red or blue points there are some cases where this seems easy:

<svg class="meanchart" width="420" height="120"></svg>
<script src="{{ "/js/meanchart.js" | prepend: site.baseurl }}"></script>
<script type="text/javascript">meanchart();</script>
<!--<button type="button" class="btn btn-default pull-right" onclick="updateMeanchart();">refresh</button>-->

So, even when the position of the colored points change our intuition would predict a relationship between the gray and red points. Let $$x_1,x_2,\ldots,x_n$$ be $$n$$ data points with labels $$y_1,y_2,\ldots,y_n$$ either beloging to the class of red points, i.e., $$y_i=1$$ or to the blue points, hence $$y_i=0$$. We would like to predict a label $$y$$ of the gray data point $$x$$. The most easy way is to compute the mean value of each class

$$\bar{x}_0 = \frac{1}{\#\{i:y_i=0\}}\sum_{i:y_i=0}x_i,\qquad \bar{x}_1 = \frac{1}{\#\{i:y_i=1\}}\sum_{i:y_i=1}x_i, $$

To predict the label $$\hat{y}$$ of $$x$$, we just need to compute

$$\hat{y} = \operatorname{argmin}_i\Vert x_i -x\Vert,$$

which will be 0 or 1 depending on if $$\bar{x}_0$$ or $$\bar{x}_1$$ is nearer to $$x$$.

<svg class="meanchart_predict" width="420" height="120"></svg>
<script src="{{ "/js/meanchart_predict.js" | prepend: site.baseurl }}"></script>
<script type="text/javascript">meanchart_predict();</script>
<button type="button" class="btn btn-default pull-right" onclick="updateMeanchart_predict();">refresh</button>