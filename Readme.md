# Herpstat Admin Panel


### Install yarn
We will use yarn as a client for NPM registry, because that will avoid some conflicts on dependencies between environments.  
Download and Install yarn (I have version 0.16.1 installed):
```
$ npm i -g yarn
```


### Install Project dependencies
As we have yarn, instead of using npm i to install all our dependencies in our node_modules folder, we will use just yarn.
*Note: you need to be sure your are inside the project folder because yarn will look for package.json file.*

``` 
$ yarn
```


### Start development server with Hot Reloading
```
$ yarn run start
```

### Done! 
Now you can edit the files .jsx and .scss and see how the browser automatically reflects the changes.