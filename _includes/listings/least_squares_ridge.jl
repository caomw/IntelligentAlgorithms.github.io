# load data
data=[ 1.17   78.93
  2.97   58.20
  3.26   67.47
  4.69   37.47
  5.83   45.65
  6.00   32.92
  6.41   29.97]
x      = [ones(7) data[:,1]]
y      = data[:,2];
lambda = 5;
beta   = inv(x'*x+lambda*diagm(ones(size(x,2))))*x'*y