# Events plugin for jQuery
Binding variables to HTML tags. Create variable as alias for tags. Set value to tags as set value to variables.
We bind tags and functions to specific variable names.
By assigning a value to the variable name, we will assign a value to the variable in all associated tags and functions.
##### Features:
- string formatting
- Binding objects
- Bindings constant or once for a tag or function.
 
##### Simple example:
#### We have tags for displaying data:
```html
<span class='ammount'>0</span>
<span class='cart_cost'>0</span>
<span class='order_cost'>0</span>
<span class='order_cost_tax'>0</span>
```

#### First, we bind the values of HTML tags and functions to the variable name.
```javascript
jQuery().event('cost', '.ammount');
jQuery().event('cost', '.cart_cost');
jQuery().event('cost', '.order_cost');
jQuery().event('cost', '.order_cost_tax',function(){ return this*1.2});
jQuery().event('cost', function(){ console.log('Cost of products:',this)});
```

## Now let's set the value of the variable.
```javascript
jQuery().var('cost',200); 
```
*We have placed the value 200 in all binding tags to the cost variable, and in the tag .order_cost_tax placed a value of 240, which is 20% more than the value of the variable.*

##### Result:
```html
<span class='ammount'>200</span>
<span class='cart_cost'>200</span>
<span class='order_cost'>200</span>
<span class='order_cost_tax'>240</span>
```

##### Now let's set a new value:
```javascript
jQuery().var('cost',6000); 
```
##### Result:
```html
<span class='ammount'>6000</span>
<span class='cart_cost'>6000</span>
<span class='order_cost'>6000</span>
<span class='order_cost_tax'>7200</span>
```
*Set by the `jQuery().var('cost',6000);` we automatically change all values associated with cost*


## Removing the binding to the variable:
```javascript
jQuery().event('cost', false);
```
*All tags and functions associated with the cost variable will be deleted.*

##### Second example:

## Formatting strings.
Создаем новую привязку к переменной:
```javascript
jQuery().event('cost', '.ammount',      'This is the total purchase amount {0} $');
jQuery().event('cost', '.cart_cost',    'Amount {0} $');
jQuery().event('cost', '.order_cost',   '{0} $');
jQuery().event('cost', '.order_cost_tax',function(){ return 'The amount of ${this*1.2} $ of purchases including tax.'});
```

##### Set the value
```javascript
jQuery().var('cost',20);
```

##### Result:
```html
<span class='ammount'>This is the total purchase amount 20 $</span>
<span class='cart_cost'>Amount 20 $</span>
<span class='order_cost'>20 $</span>
<span class='order_cost_tax'>The amount of 24 $ of purchases including tax.</span>
```
*By creating formatting in the binding to the tag. We no longer think or worry about formats when new values are received.
Now specifying `jQuery().var('cost', 20);` the new values are automatically displayed in the linked HTML tags.*


##### Removing the binding to the variable:
```javascript
jQuery().event('cost', false);
//All tags and functions associated with the cost variable will be deleted.
```


##### Third example:

## Binding an object:
```javascript
jQuery().event('cost', '.ammount',      'The buyer {this.FirstName} {this.LastName} only purchases in the amount of $ {this.Cost}.');
jQuery().event('cost', '.cart_cost',    'Amount {this.Cost} $ Number of products {this.CountProducts}');
jQuery().event('cost', '.order_cost',   '{this.FirstName}: {this.Cost} $');
jQuery().event('cost', '.order_cost_tax',function(){ let averagePrice = this.Cost/this.CountProducts; return 'Average price: ${averagePrice} $ of ${averagePrice*1.2} purchases including tax.'});
```

##### Set the object 
```javascript
let user = {FirstName:'Madonna',LastName:'Ciccone',Cost:20,CountProducts:5};
jQuery().var('cost',user);
```

##### Result:
```html
<span class='ammount'>The buyer Madonna Ciccone only purchases in the amount of $ 20.</span>
<span class='cart_cost'>Amount 20 $ Number of products 4</span>
<span class='order_cost'>Madonna: 20 $</span>
<span class='order_cost_tax'>Average price: 5 $ of 6 purchases including tax.</span>
```
*By creating formatting in the binding to the tag. We no longer think or worry about formats when new values are received. 
Now specifying `jQuery().var('cost',20);` the new values are automatically displayed in the linked HTML tags.*


## The Format Of The Event:
```javascript
jQuery().event(variableName, SelectorName); 
jQuery().event(variableName, function(e){});
jQuery().event(variableName, false, SelectorName);  //bind for only onetime
jQuery().event(variableName, false, function(e){}); //bind for only onetime
jQuery().event(variableName, SelectorName, FormatString); //bind to SelectorName with FormatString
jQuery().event(variableName, SelectorName, function(e){}); //bind to SelectorName with FormatString returned from fucntion
jQuery().event(variableName, SelectorName, false); // Unbind SelectorName
jQuery().event(variableName, bindName, SelectorName);//bind SelectorName  with name for after unbindto
jQuery().event(variableName, bindName, function(e){}); //bind with name for after unbind
jQuery().event(variableName, bindName, false); // Unbind bindname
jQuery().event(variableName, false); //unbind all binders for one variable name
```

## The Variable Format:
```javascript
jQuery().var(variableName); // Get value from variable
jQuery().var(variableName,variableValue); // Set value in variable
jQuery().var(variableName,variableObject); // Set Object in variable
jQuery().var(variableName,null); // Delete variable
```

## Format of the event function:
```javascript
function(e){
    e.unbind(); //Unbind this function.
    e.id; //element selector
    e.elements; //jQuery elements
    e.value; //The new value of the variable to get.
    this; //The new value of the variable to get.
    return false; //Unbind this function.
    return "Dier {0} my friend!"; //Return Formating string for apply in DOM element
    return 'String for show in HTML element'; // Return string  will be show in binding html elements
}
```

## String format:
```
{this} - Set value variable in string;
{0} - Set value variable in string;
{value} - Set value variable in string;
{this.FirstProp} - Set Propertie object in string
{this.SecondProp} - Set Propertie object in string
{this.ThirdProp} - Set Propertie object in string
Example 1: "Dier {0} my friend!" 
Example 2: "Dier {this.FirstProp} {this.SecondProp} my friend" 
```
## Include Events Plugin jQuery:
```html
<script  src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script  src="/release/events_lite.min.js"></script>
```
## Short Alias Events Plugin jQuery:
```javascript
jQuery.v(); //Alias for jQuery().var()
jQuery.e(); //Alias for jQuery().event()
```
## Demo:
https://jsfiddle.net/KoreshS/1e4vqcs5/
## Demo:
https://explorer-office.ru/files/index.html

## Donate PayPal: koreshs@mail.ru 
-  Please support the development of the plugin.
-  We must make the world a better place.
