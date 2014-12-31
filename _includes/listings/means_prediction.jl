# load csv file
listingdata = readdlm("breast-cancer.csv", ',');
# get number of entries and dimension
(m,n) = size(data);
# split dataset
pos = int(m/2)
# get training data
y = data[1:int(m/2),1]; 
x = data[1:int(m/2),2:end];
# normalize training data
no = sum(x,1)
x = x./no;
# get and normalize test data
y_test = data[int(m/2):end,1];
x_test = data[int(m/2):end,2:end];
x_test = x_test./no;
# get centroids
μ₀ = mean(x[y.==-1,:],1)
μ₁ = mean(x[y.==1,:],1)
# calculate distance to each test entry
Δμ₀ = repmat(μ₀,m-pos+1,1)-x_test;
Δμ₀ = sum(Δμ₀.^2,2);
Δμ₁ = repmat(μ₁,m-pos+1,1)-x_test;
Δμ₁ = sum(Δμ₁.^2,2);
# transform prediction in to its label {-1,+1}
y_pred=int((Δμ₀.<Δμ₁))*2-1;
# check overall performance
accuracy = 100/size(y_pred,1)*sum(int(y_pred.==y_test))