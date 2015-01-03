---
layout: default
title: Intelligen Algorithms
---

Why Machine Learning?
================

The main research direction of this field seems to be: How to build computers (especially intelligent algorithms), which are able to understand a problem to provide good solutions. After the invention of computers Alan Turing [discussed][thinkingmachines] intelligent machines in 1950 in a gedankenexperiment called "imitation game", where an interrogator communicates in a typewritten way with a machine or a human. If he has no clue if he is talking with a machine this machine will pass his Turing-Tests. However, till now currently no algorithm was published to pass this test. 

Now, in 2014 computers can do amazing things by developing strategies in the field of game AI or finding patterns in large data sets.
If you visit an online shop, then definitely there will be a 'recommender system' that provides you suggestions what else to buy if you put something on your shaopping card. This happens fully automatically by judging your actions, e.g., if you put item A at your wish list, the systems tries to find a pattern in the recorded history of all customers actions and buy-behaviours for suggesting you other items you probably interested in. 

Or in 1993 a [computer program][tdgammon] called *TD-Gammon* had a huge impact at the backgammon-community. Somehow, this program figured out how to play sucessfully the boardgame Backgammon. Just by playing 1,500,000 games against itself, learning from the outcome of each game. It plays unconventional moves and human players were experimenting with this program. 
Or, todays convolutional neural networks are able to [reach near-human performance][mnist-convnet] in recognizing handwritten digits. Another interesting results comes from the [Google-Brain team][google-brain]. They feed millions of images in their algorithm running on a huge cluster. And even without ever being told what a cat is, this algorithm was able to infer the visual concept of a cat.

When teaching a computer or an intelligent machine to *learn* to do something, the question what learning intrinsically means arises. While we have an very clear intuition what learning is and we are easily able to identify if somebody seems to be smart, it is hard to exactly define the underlying act. Learning at a very basic level can be considered as the process of dynamical adjustments that improves the act of solving a specific task with or without intention. As a consequence this implies that learning is build up on understanding. To perform these adjustments it is essentially to have a proper knowledge about the corresponding mechanism.



The most simple learning algorithm
--------------

Let's step back from sophisticated problems to a more simple problem, where you only have to decided whether the gray point belongs to the orange or blue points there are some cases where this seems easy:

{% include figures/gaussians.html %}

So, even when the position of the colored points change, our intuition would predict a relationship between the gray and orange points. They are somehow similiar. In fact, they are nearby. Let $$x_1,x_2,\ldots,x_n$$ be $$n$$ vectors data points with labels $$y_1,y_2,\ldots,y_n$$ either beloging to the class of orange points, i.e., $$y_i=1$$ or to the blue points, hence $$y_i=0$$. We would like to predict a label $$y$$ of the gray data point $$x$$. The most easy way is to compute the mean value of each class

$$\mu_0 = \frac{1}{\#\{i:y_i=0\}}\sum_{i:y_i=0}x_i,\qquad \mu_1 = \frac{1}{\#\{i:y_i=1\}}\sum_{i:y_i=1}x_i, $$

we were simply add the vectors of each class and divide them by the cardinality of each class.
And then to predict the label $$\hat{y}$$ of $$x$$, we just need to compute

$$\hat{y} = \operatorname{argmin}_i\Vert \mu_i -x\Vert,$$

which will be 0 or 1 depending on if $$\mu_0$$ or $$\mu_1$$ is nearer to $$x$$. So the position of the gray point will influence the prediction of the sketched algorithm. If the gray point moves around we may be would label it as blue if it comes closer to the blue points. Now, simply move the mouse over the next plot and see how the prediction changes. The green big circles represent the average of each class.

{% include figures/gaussians_mean_prediction.html %}

Depending on which center is nearer. This simple algorithm will predict the label of the moving point. This is a very fundamental concept of most learning algorithms. To create prediction a good way is to calculate somehow the 'similarity' between the query input (the point we want to label automatically) and our datapoint where we already know from history the correct output.

Hands on
--------------
There exists several [public binary datasets][libsvm]. We focus on a dataset called *breast cancer* containing 683 entries from a [clinical study][breastcancerstudy] from 1989 having 9 recorded features for both classes:
benign or malignant tumors. We will apply our first simple learning algorithm at this [dataset given as a csv file][breastcancercsv] in [Julia][julia]. The task is to use half of the data (342 entries) with kown tumor label (benign, malignant) to predict from the given features if a recorded tumor in the other half is malignant or not.

<pre>
{% include listings/means_prediction.jl %}
</pre>

This gives an accuracy of 53%. While this is just slightly better than random guessing (chance of 50%) we will we see how to improve this performance using more sophisticated algorithms.

Notation
--------------

Mostly we will name the $$n$$ known datapoints $$x_1,x_2,\ldots, x_n\in \mathcal{X}$$ as training data coming from some *input-space* $$\mathcal{X}$$. In practical applications there exists usually a finite set of training examples. Therefore, $$n\in\mathbb{N}$$ is used to be a finite constant. For all following illustrations we will use a subset of the two-dimensional euclidean space $$\mathcal{X}\subseteq \mathbb{R}^2$$. Each of these training examples $$x_j$$ is associated with a known *target* label $$y_j \in \mathcal{Y}$$. In the previous example $$\mathcal{Y}$$ is simply the set $$\{-1,1\}$$. But in general $$\mathcal{Y}$$ is not limited to these simple labels.

So, if we speak about training data we will handle elements from the cartesian product $$\mathcal{X}\times \mathcal{Y}$$:

$$(x_1,y_1),(x_2,y_2),(x_3,y_3),\ldots, (x_n,y_n) \in \mathcal{X}\times \mathcal{Y}.$$

Again, we know for each input example $$x_j$$  the correct output $$y_j$$. The output is generated by a latent mechanism

$$f\colon \mathcal{X} \to \mathcal{Y},\quad x \mapsto f(x),$$

which maps each input to its label. However, we cannot directly perceive this function. We are only able to see its mappings.
Now, the goal is to find a good hypothesis that is able to reproduce the mapping of $$f$$. We search for a function

$$h\colon \mathcal{X} \to \mathcal{Y},\quad x \mapsto h(x),$$

which tries to do the same thing as the function $$f$$ which we only can indirectly observe. We succeed if $$f(x)\approx h(x)$$ holds for most $$x$$.

### Problem types
The list of machine learning algorithms can be divided in unsupervised and supervised algorithms. Our first simple learning algorithm was allowed to use the label information from our training set. We will see, that it is possible to apply a learning algorithm which does not need the label information.

{% include figures/un-vs-supervised.html %}

Left part of this figure illustrates the setting of supervised learning problems and the right side illustrates the problems where we have to apply an unsupervised learning algorithm due to the missing label information. 
Another aspect of how to classify the algorithms is to divide them in static algorithms like our simple algorithm above or dynamically algorithms that are learning in an online-manner.

Finally the scale of the label is also important, since there can be classification task we we only have to classify the input into $$k$$ classes or a regression task where the output can be the complete real domain, e.g., consider the task of learning how to square a real number. 


[thinkingmachines]:http://www.csee.umbc.edu/courses/471/papers/turing.pdf
[tdgammon]: http://www.bkgm.com/articles/tesauro/TDGammonAchievesMasterLevelPlay.pdf
[mnist-convnet]:http://arxiv.org/abs/1202.2745
[google-brain]:http://static.googleusercontent.com/media/research.google.com/de//archive/unsupervised_icml2012.pdf
[libsvm]:http://www.csie.ntu.edu.tw/~cjlin/libsvmtools/datasets/binary.html
[breastcancerstudy]:https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Original%29
[breastcancercsv]:https://gist.github.com/PatWie/a3f5133b6cff917ae267
[julia]:http://julialang.org/