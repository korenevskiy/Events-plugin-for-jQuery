/**
 * Events plugin for jQuery
 * @summary Binding variables to HTML tags. Create variable as alias for tags. Set value to tags as set value to variables.
 * @description Binding variables to HTML tags. Create variable as alias for tags. Set value to tags as set value to variables.
 * @link  https://github.com/korenevskiy/Events-plugin-for-jQuery
 * @license: http://opensource.org/licenses/MIT
 * @module Events plugin for jQuery
 * Date: 2020-07-15T00:00Z
 * @param $ {jQuery} jQuery
 * @extends jQuery
 * @requires jQuery
 * @tutorial https://github.com/korenevskiy/Events-plugin-for-jQuery
 * @see https://github.com/korenevskiy/Events-plugin-for-jQuery
 * @example https://explorer-office.ru/files/index.html
 * @version 0.9
 * @mail koreshs@mail.ru
 * @yandex-money 41001899218982
 * @paypal koreshs@mail.ru
 * @donat 2$
 * @author Korenevskiy Sergei Borisovich (Кореневский Сергей Борисович)
 * @copyright  Korenevskiy Sergei Borisovich (Кореневский Сергей Борисович)
 */

(
/**
@class Events
 */
function( $ ) {
    "use strict";
    
/**
@property hash Хэш случай одинаковых индексов фунций без индексов
@type String
@private
@final    
*/
var hash = ''.concat((new Date()).valueOf().toString()) ;
    
/**
@property events Массив событий
@type Object
@private
@final    
*/
var events = {};
/**
@property vars Хэш случай одинаковых индексов фунций без индексов
@type Object
@private
@final    
*/
var vars = {};
 

/**
 * @method SaveHandler Subscribe fucntion for variable;
 * @param nameValue {string} The name of the person to greet 
 * @param {handler|} func Funtion 
 * @param {String||Number} id ID funcion in array one variable.
 * @param {Object}[data={}] Data for function in attribute
 * @returns {void}
 */
var SaveHandler = function(nameValue, func, id = 0, data = {}){
    
    if(events.hasOwnProperty(nameValue) === false){
        events[nameValue] = {};
    }
    
    if(id === 0){ // Generate id
        id = Object.keys(events[nameValue]).length + 1;
        id = hash.concat(id);
    }
    
    if(typeof(func)==='undefined' ||  func === null ||  func === false){//events[nameValue].indexOf(id) !== -1
        delete events[nameValue][id];
        return;
    }
    data = Object.assign({id:id, name: nameValue, onlyone:false, unbind:function(onlyone){
            if(arguments.length===0){
                delete events[nameValue][id];
                this.onlyone = true;
                return this;
            }
            if(onlyone === true){
                delete events[nameValue][id];
                this.onlyone = true;
                return this;
            }
            this.onlyone = false;
            return this;
        }},data);
    events[nameValue][id] = function(value){
        data['value'] = value;  
        return func.call(value,data);
    };
};

//$.fn.test = function(){
//    this.vars = vars;
//    console.log('Func TEST:',arguments);
//    console.log('This:',this); 
//    return events;
//};
/**
 * @method event
 * @param {string} [name]
 * @param {string|number|boolean|handler|function|undefined|null} [selector] Selector/Function binding to variable
 * @param {string|boolean|handler|function|undefined} [function] Fucntion binding to variable
 * @returns jQuery
 */
$.fn.event = function(name) {//,selector, data, handler
//    typeof : number, string, function, object

    let selector = 0;
    let data = {};
    let func;
    
    
    if(arguments.length===1 && (typeof(arguments[0])==='handler' || typeof(arguments[0])==='function')){
        String.prototype.format = arguments[0];
        return events;
    }

    if(arguments.length===0 || typeof(name)==='undefined'){
        return events;
    }
    if(arguments.length===1){
        return events[name];
    }
    
    if(arguments.length===2){ 
        if(arguments[1]===null || arguments[1]===false || arguments[1]===0){
            delete events[name];
            return this;
        }
        data = {};
        if(typeof(arguments[1])==='string' || typeof(arguments[1])==='object'){
            selector = arguments[1];
            func = function(value){
                return $(selector).html(this);
            };
        }
        if(typeof(arguments[1])==='handler' || typeof(arguments[1])==='function'){
            func = arguments[1];
        }
        SaveHandler(name,func,selector);
        return this;
    }
    if(arguments.length===3){
        data = {};
        if(typeof(arguments[2])==='handler' || typeof(arguments[2])==='function'){
            func = arguments[2];
            if(typeof(arguments[1])==='string' && arguments[1] !== '' || typeof(arguments[1])==='object'){
                selector = arguments[1];
                func = function(value){
                    let text = func(value);
                    if(text){
                        return $(selector).html(text);
                    }
                    return text;
                };
            }
            if(typeof(arguments[1])==='number' && arguments[1] !== 0){
                selector = arguments[1];
            }
            if(typeof(arguments[1])==='undefined' || arguments[1]===null || arguments[1]===false || arguments[1]==='' || arguments[1] === 0){                
                data.onlyone = true;
            }
            data.elements = this;
            SaveHandler(name,func,selector,data);
            return this;
        }
        if(typeof(arguments[2])==='undefined' || arguments[2]===null || arguments[2]===false || arguments[2] === '' || arguments[2] === 0){//boolean, number
            selector = arguments[1];
            delete events[name][selector];
            return this;
        }
        if(typeof(arguments[2])==='string' && typeof(arguments[1])==='string' && arguments[1]!==''){
            selector = arguments[1];
            let format = arguments[2];
            if(format)
                func = function(value){ 
                    return $(selector).html(format.format(this));};
            else
                func = function(value){ 
                    return $(selector).html(this);};
            SaveHandler(name,func,selector);
            return this;
        }
    } 
};

/**
 * @method v Execute all fucntion for one name variable
 * @param {string} [name] Name variable
 * @param {string|number|boolean|handler|function|undefined|null} [value] Selector/Function binding to variable
 * @returns {jQuery} 
 */
jQuery.fn.var = function(name, value) {
    
    if(this.length == 0)
    ;
    
    if(arguments.length === 1){
        if(vars.hasOwnProperty(name)===false)
            return null;
        return vars[name];
    }
    
    if(arguments.length === 0){
        return vars;
    }
    
    if(typeof(value)==='undefined' || value===null){
        let val = vars[name];
        delete vars[name];
        delete events[name];
        return val;
    }
    
    vars[name] = value;
     
    if(events.hasOwnProperty(name) === false){
        events[name] = {};
    }
    for(let id in events[name]){
        let result = events[name][id].call(value,value);
        if(result === false){
            delete events[name][id];
        } 
    }
};
    
/*
 * Short Alias for Event
 */
jQuery.fn.e = jQuery().event;
/*
 * Short Alias for Var
 */
jQuery.fn.v = jQuery().var;

/*
 * Short Alias for Event
 */
jQuery.e = jQuery().event;
/*
 * Short Alias for Var
 */
jQuery.v = jQuery().var;
 
String.prototype.format = String.prototype.format || function (value) {
    var newStr = this;
    
    //Fixing: Add formating with support settings object
    if(typeof value !== 'object'){
        newStr = newStr.replace('{0}', value).replace('{this}', value).replace('{value}', value);
        return newStr;
    }
    
    for (var key in value){
        this[key]=value[key];
        newStr = newStr.replace('{' + key + '}', value[key]).replace('{this.' + key + '}', value[key]).replace('{value.' + key + '}', value[key]);
    }
    return newStr;
};
  
})(jQuery);
