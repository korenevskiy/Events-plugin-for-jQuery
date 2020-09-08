/**
 * Events plugin for jQuery
 * @summary Binding variables to HTML tags. Create variable as alias for tags. Set value to tags as set value to variables.
 * @description
 *
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license 
 * https://github.com/jquery/jquery/issues/4745 
 * https://github.com/jquery/jquery/issues/4747 
 *
 * Date: 2020-07-15T00:00Z
 * @module Events plugin for jQuery
 * @param $ {jQuery} jQuery
 * @extends jQuery
 * @license: http://opensource.org/licenses/MIT
 * @requires jQuery
 * @link 
 * @tutorial https://github.com/korenevskiy/Events-plugin-for-jQuery
 * @see https://github.com/korenevskiy/Events-plugin-for-jQuery
 * @see https://habr.com/ru/post/512330/
 * @example https://explorer-office.ru/files/index.html
 * @version 0.9
 * @mail koreshs@mail.ru
 * @author Korenevskiy Sergei Borisovich (Кореневский Сергей Борисович)
 * @copyright  Korenevskiy Sergei Borisovich (Кореневский Сергей Борисович)
 */

(function (factory) {
    //<editor-fold defaultstate="collapsed" desc="UMD">
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
    //</editor-fold>
}
(
/**
 * 
 * @class Events
 * @param {jQuery} $
 * @returns {undefined}
 */
function( $ ) {
"use strict";
//<editor-fold defaultstate="collapsed" desc="SaveHandler">
    
/**
@property hash Хэш случай одинаковых индексов фунций без индексов
@type String
@private
@final    
*/
const hash = ''.concat((new Date()).valueOf().toString()) ;
    
/**
@property events Массив событий
@type Object
@private
@final    
*/
const events = {};
/**
@property vars Хэш случай одинаковых индексов фунций без индексов
@type Object
@private
@final    
*/
const vars = {};
    
const ADD = '+';
const REMOVE = null;
const ONLY_ONE = false;
    
    
    
    /**
     * @method SaveHandler Subscribe fucntion for variable;
     * @param nameValue {string} The name of the person to greet 
     * @param {handler|} func Funtion 
     * @param {String||Number} id ID function in array one variable.
     * @param {Object}[data={}] Data for function in attribute
     * @returns {void}
     */
    const SaveHandler = function(nameValue, func, id = 0, data = {}){
        
        if(events.hasOwnProperty(nameValue) === false){
            events[nameValue] = {};
        }
        
        if(id === 0){ // Generate id
            id = Object.keys(events[nameValue]).length + 1;
            id = hash.concat(id);
        }
        
        if(typeof(func)==='undefined' || [false,null,'undefined',undefined].includes(func)){//events[nameValue].indexOf(id) !== -1
            delete events[nameValue][id];
            return;
        }
        events[nameValue][id] = func;
        
    };


/**
 * @method [setPropertyAdd] Set primitive types as value to tag  <br> Присвоение приметивного значения в тег
 * @param {string} [selector] The name of the person to greet 
 * @param {any} [value] Value property
 * @param {String} [varName] ID function in array one variable.
 * @param {Object}[data={}] Data for function in attribute
 * @returns {jQuery} binding tag selector 
 */
function setPrimitive(selector,value,varName,it){
    return $(selector).prop("value",value).prop("var",varName).html(it);
}; 
/**
 * @method [setPropertyAdd] Set object as value <br> Присвоение объекта как значение
 * @param {string} [selector] The name of the person to greet 
 * @param {any} [value] Value property
 * @param {String} [varName] ID function in array one variable.
 * @param {Object}[data={}] Data for function in attribute
 * @returns {jQuery} binding tag selector 
 */
function setObject(selector,value,varName,data,it){
//    if(data.format)
//        it = StringFormat(data.format,it,data);
    return $(selector).prop("value",value).prop("property",data.property).prop("var",varName).html(it);
}; 
/**
 * @method [setPropertyAdd] Set array as list values  <br> Присвоение массива как списка значений
 * @param {string} [selector] The name of the person to greet 
 * @param {any} [value] Value property
 * @param {String} [varName] ID function in array one variable.
 * @param {Object}[data={}] Data for function in attribute
 * @returns {jQuery} binding tag selector 
 */
function setArray(selector,value,varName,data){
    let jq = $(selector).empty().prop("value",value).prop("var",varName);


        //let property = data.property;
        let content ='';
        let classListItem = data.classListItem? data.classListItem: '';



    for(let prop in value){
        
        if(isFinite(prop))
            prop = parseInt(prop); 
        let clss = ' class = \'' + classListItem + ' prop_' + prop  + '\'';
        
        if(data.tagListItem){
            content =  $('<' + data.tagListItem + clss +'>' + value[prop] + '</' + data.tagListItem + '>')
                .prop("value",value[prop]).prop("property",prop);//.prop("var",varName)
        }else{
            content = value[prop];
        }
         
        jq.append(content);
    }
    return  jq;
};
/**
 * @method [setPropertyAdd] Add new tag with new value property object <br> Добавление нового тега с новым значением свойства объекта
 * @param {string} [selector] The name of the person to greet 
 * @param {any} [value] Value property
 * @param {String} [varName] ID function in array one variable.
 * @param {Object}[data={}] Data for function in attribute
 * @returns {jQuery} binding tag selector 
 */
function setPropertyAdd(selector,value,varName,data){
     
    let jq = $(selector);
    jq.each(function(index,item){

        let content ='';
        let property = data.prevProp + 1;
        
        if(data.tagListItem){
            let classListItem = data.classListItem? data.classListItem: '';
            let clss = ' class = \'' + classListItem + ' prop_' + property  + '\'';
        
            content =  $('<' + data.tagListItem + clss +'>' + value + '</' + data.tagListItem + '>')
                .prop("value",value).prop("property",property).prop("var",varName);
        }else{
            content = value;
        }
        
        let filt = $(this).children().filter((i,el)=>el.property===data.prevProp);
        
        if(filt.length){
            filt.after( content );
        }
        else{
            $(this).append(content);
        }
    });
    return jq;
};
/**
 * @method [setPropertyAdd] Remove property for object and remove binding proprty <br> Удаление свойства объекта и удаление привязанного тега
 * @param {string} [selector] The name of the person to greet 
 * @param {any} [value] Value property
 * @param {String} [varName] ID function in array one variable.
 * @param {Object}[data={}] Data for function in attribute
 * @returns {jQuery} binding tag selector 
 */
function setPropertyRemove(selector,value){
    return $(selector).children().filter((i,el)=>el.value===value).remove();
};
/**
 * @method [setPropertyAdd] Set value property object for binding tag <br> Присвоение значения свойства объекта к привязанному тегу
 * @param {string} [selector] The name of the person to greet 
 * @param {any} [value] Value property
 * @param {String} [varName] ID function in array one variable.
 * @param {Object}[data={}] Data for function in attribute
 * @returns {jQuery} binding tag selector 
 */
 function setPropertyVal(selector,value,varName,data){
    $(selector).prop('value',data.object);


        let content ='';
        let property = data.property;
        let classListItem = data.classListItem? data.classListItem: '';
        let clss = ' class = \'' + classListItem + ' prop_' + property  + '\'';
        
        if(data.tagListItem){
            content =  $('<' + data.tagListItem + clss +'>' + value + '</' + data.tagListItem + '>')
                .prop("value",value).prop("property",property).prop("var",varName);
        }else{
            content = value;
        }
    
        let childs = $(selector).children(); 

        if([null,undefined].includes(value)){
        childs.filter((i,el)=>el.property===data.property).remove();
            return $(selector);
        }
        let filt = childs.filter((i,el)=>el.property === data.property);
        if(filt.length){
            filt.replaceWith(content);
            return $(content);
        }
        let prevs = childs.filter((i,el)=>el.property===data.prevProp);
        if(prevs.length)
            prevs.after(content);
        else
            $(selector).append(content);
                        
        return $(content);
};
//Set primitive types as value 
function setFunction(selector,value,varName,data){
    return value;
};
function setValue(selector,value,varName,data,it){
    
                //Set primitive types as value 
                if(['boolean','string','number','bigint','symbol',''].includes(typeof value) && data.property === undefined){
                    return setPrimitive(selector, value, varName, it);
                }
//???           //Set array and object as list
                if(Array.isArray(value) && data.property === undefined || data.property === null){
                    return setArray(selector, value, varName,data, it); 
                }
                //Set array and object as value
                if(!Array.isArray(value) && typeof value === 'object' && data.property === undefined || data.property === ''){
                    return setObject(selector,value,varName,data,it);
                }
                //Add new item in list existing tags  ОТРОРЕМОНТИРОВАТЬ!
                if(data.property === true){
                    return setPropertyAdd(selector,value,varName,data, it);
                }
                //Remove item from list existing tags
                if(data.property === false){
                    return setPropertyRemove(selector,value);;
                }
                //Replace item in list existing tags
                if(false  === [undefined, null,'',true,false].includes(data.property)){
                    return setPropertyVal(selector,value,varName,data);
                }
                return $(selector).html(this);
};


/**
 * @method event
 * @param {string} [name]
 * @param {string|number|boolean|handler|function|undefined|null} [selector] Selector/Function binding to variable
 * @param {string|boolean|handler|function|undefined} [function] Fucntion binding to variable
 * @returns jQuery
 */
function Event(name) {//,selector, data, handler
//    typeof : number, string, function, object

    let selector = arguments[1];
    let formatStr = arguments[2];
    let data = {id:selector,onlyone:false,name:name, property: undefined, elements:this, tagListItem:'div', classListItem:'',
        unbind: function(onlyone){
        if(arguments.length===0){
            delete events[name][aselector];
            this.onlyone = true;
            return this;
        }
        if(['1',1, true].includes(onlyone)){
            delete events[name][selector];
            this.onlyone = true;
            return this;
        }
        this.onlyone = false;
        return this;
    }};
    let _data = data;
    let func; 
    

    if(arguments.length===0 || ['undefined',undefined,null].includes(name)){
        return events;
    }
    if(arguments.length===1){
        if(['handler','function'].includes(arguments[0])){
            StringFormat = arguments[0];
            return events;
        }
        if(typeof name === 'string'){
            return events[name];
        }
        if(Array.isArray(name)){
        }
        if(typeof name === 'object'){
            //events = name;
            
            for(let varName in name){
                if(typeof name[varName] === 'string'){
                    Event.call(this,varName, name[varName]);
                    continue;
                }
                if(typeof name[varName] === 'undefined' || ['undefined',undefined, null].includes(name[varName])){
                    Event.call(this,varName, null);
                    continue; 
                }
                if(typeof name[varName] === 'function'){
                    Event.call(this,varName, name[varName]);
                    continue;
                }
                if(typeof name[varName] === 'object'){
                    for(let sel_rs in  name[varName]){
                        Event.call(this,varName, sel_rs, name[varName][sel_rs]);
                        
                    }
                    continue;
                }
                Event.call(this,varName, name[varName]);
            }
            
            return this;
        }
        
    } 
    if(arguments.length===2){ 
	// event(varName, null);
        if(['undefined',undefined, null].includes(selector)){
            delete events[name];
            return this;
        }
	// event(varName, [...]);
	// event(varName, {...});
        if(typeof selector === 'object' && !(selector instanceof HTMLElement)){
            //events = name;
            let load_events = arguments[1];
            for(let sel_rs in load_events){
				
		// event(varName, [...]);
		// event(varName, {...className: 'StringFormat'});
                if(['string'].includes(typeof load_events[sel_rs])){
                    if(Array.isArray(arguments[1]))
                        Event.call(this,name, load_events[sel_rs]);
                    else
                        Event.call(this,name, sel_rs, load_events[sel_rs]);
                    continue;
                }
		// event(varName, className, null);
                if(['undefined',undefined, null].includes(load_events[sel_rs])){
                    Event.call(this,name, sel_rs, null);
                    continue;
                }
		// event(varName, [...function(){}]);
		// event(varName, {...className: function(){},});
                if(typeof load_events[sel_rs] === 'function'){
                    if(Array.isArray(arguments[1]))
                        Event.call(this,name, load_events[sel_rs]);
                    else
			Event.call(this,name, sel_rs, load_events[sel_rs]);
                    continue;
                }
            // event(varName, {...  ___: '<span></span>',});
            if(load_events[sel_rs] instanceof HTMLElement){
                    Event.call(this,name, load_events[sel_rs]);
                    continue;
            }
                Event.call(this, name, load_events[sel_rs]);
            }
            return this;
        }
	// event(varName, '<span></span>');
    // event(varName, className);
        if(['string'].includes(typeof selector) || selector instanceof HTMLElement){
            
            func = function(value, ...params){
        //property: undefined - (auto-default) Array as list, Object as value
        //property: null - Array & Object as list
        //property: '' - Array & Object as value
                let data = Object.assign({},_data,{value:value},...params);
                return setValue(selector,value,name,data,this);
            };
        }
	// event(varName, function(){});
        if(['function','handler'].includes(typeof selector)){
            func = function(value, ...params){
                let data = Object.assign({},_data,{value:value},...params);
                return selector(value,data);
            };
        }
        SaveHandler(name,func);
        return this;
    }
    if(arguments.length===3){
        if(['function','handler'].includes(typeof formatStr)){
            // event(varName, 2, function(){});
            if([undefined, null, false, '', 0].includes(selector)){                
                data.onlyone = true;
            }
             
            func = arguments[2];
            func = function(value,...params){
                let data = Object.assign({},_data,{value:value},...params);
//                selector = arguments[1];  
//                data.id = arguments[1];
                let newValue = func.call(value,value,data);
                if(typeof newValue === 'String'){
                    newValue = StringFormat(newValue,value);
                }
                if(newValue && selector){// && (typeof selector ==='string' || selector instanceof HTMLElement)
                    newValue = StringFormat(newValue,value);
                    newValue = setValue(selector,newValue,name,data,newValue); 

                }
                if(data.onlyone === true)
                    return false;
                
                return newValue;
            };
            SaveHandler(name,func,selector,data);
            return this;
        }
         
        if([null,''].includes(selector))
            return this;
        
        if(['undefined', undefined, null, false, 0, ''].includes(formatStr) ){//boolean, number
            // event(varName, '<span></span>', null); Remove
            if(selector instanceof HTMLElement){ 
                for(let _selector in events[name]){
                    if(events[name][_selector] === selector){
//???
                        delete events[name][_selector];
                    }
                }
                return this;
            }
            // event(varName, className, null); Remove
            if(['string','number'].includes(typeof selector) && selector !== '' ){ 
                delete events[name][selector];
            }
            return this;
        }
        
        if(typeof(formatStr)==='string' && (typeof(selector)==='string' || selector instanceof HTMLElement)){
            // event(varName, '<span></span>', StringFormat); 
            // event(varName, className, StringFormat);  
            
            
            func = function(value,...params){
                let data = Object.assign({},_data,{value:value},...params);
//                selector = arguments[1];  
//                data.id = arguments[1];
                let newValue = this;
                if(formatStr)
                    newValue = StringFormat(formatStr,this);
                newValue = setValue(selector,value,name,data,newValue); 
                    
                if(data.onlyone === true)
                    return false;
                    
                return newValue;
            };
            
            SaveHandler(name,func,selector);
            return this;
        }
        
        if(['object'].includes(typeof formatStr)){
            let new_data = formatStr;           
            
            func = function(value,...params){
                let data = Object.assign({},_data,{value:value},...params,new_data);
//                selector = arguments[1];  
//                data.id = arguments[1];

                formatStr = data.format||'';

                let newValue = this;
                if(formatStr)
                    newValue = StringFormat(formatStr,this);
                newValue = setValue(selector,value,name,data,newValue); 
                    
                if(data.onlyone === true)
                    return false;
                    
                return newValue;
            };
            
            SaveHandler(name,func,selector);
            return this;
        }
    }
};
$.fn.event = Event;

/**
 * @method v Execute all fucntion for one name variable
 * @param {string} [name] Name variable
 * @param {string|number|boolean|handler|function|undefined|null} [value] Selector/Function binding to variable
 * @returns {jQuery} 
 */
jQuery.fn.var = function(name, value) {//, ...theArgs
     
   
    if(arguments.length === 0){
        return vars;
    }
	
    if(arguments.length === 1){
        if(['string','number','boolean','bigint','symbol'].includes(typeof name)){
            //return vars[name] ?? null;//vars.hasOwnProperty(name)===false
            
            if([undefined,null].includes(vars[name]))
               return null;
            vars[name]
        }
        
        if(typeof name === 'object'){
            let _vars = name;
            for(let n in _vars){
                if(_vars[n] === null)
                    delete vars[n];
                vars[n] = _vars[n];
                
                for(let id in events[n]){
                    let result = events[n][id].call(value,value,{
                        value:value,property:undefined,propsRequaire:[],object:value,id:id});
                    if([false,null].includes(result)){
                        delete events[n][id];
                    }
                }
            }
        }
        
        return vars[name];
    }
	
    if(arguments.length === 2){
        
        if([undefined,null].includes(value)){
            delete vars[name];
        }
        else{//['string','number','boolean','bigint','symbol'].includes(typeof value)
            vars[name] = value;
        }
       
        if(events[name] === undefined){
            events[name] = {};
            return this;
        }
        for(let id in events[name]){
            let result = events[name][id].call(value,value,{
                value:value,property:undefined,propsRequaire:[],object:value,id:id});
            if([false,null].includes(result)){
                delete events[name][id];
            }
        }
    }
	
    if(arguments.length === 3){
        let property = arguments[2];
        // undefined - (auto-default) Array as list, Object as value
        // null - Array & Object as list
        // '' - Array & Object as value
        if(['undefined', undefined, null, false, '', 0].includes(vars[name])){
            vars[name] = {};
        }
        
        if(['object'].includes(typeof property)){// && ! Array.isArray(property)
            let new_data = property;
            //this code copyd from metods VAR() for arguments.length === 2
            if([undefined,null].includes(value)){
                delete vars[name];
            }
            else{//['string','number','boolean','bigint','symbol'].includes(typeof value)
                vars[name] = value;
            }
            
            if(events[name] === undefined){
                events[name] = {};
                return this;
            }
            
            for(let id in events[name]){
                let result = events[name][id].call(value,value,{
                    value:value,property:undefined,propsRequaire:[],object:value,id:id},new_data);
                if([false,null].includes(result)){
                    delete events[name][id];
                }
            }
            
            if(new_data.property === undefined)
                return this;
            else
                property = new_data.property
        }
        
        // SET property or SET element in object/array 
        if(false === [ADD,REMOVE,ONLY_ONE,true,false,null,'+','-',''].includes(property)){
            vars[name][property] = value;
            
            let props = Object.keys(vars[name]);
            if(isFinite(property)){
                props.sort((a,b)=>a-b);
            }else{
                props.sort();
            }
            
            let properties = Object.values(vars[name]); 
            //let index = properties.lastIndexOf(value);//lastIndexOf
            let propsRequaire = [];
            //let i = 0;
            for(let prop in vars[name]){//Verify value all requires in array
                if(vars[name][prop] === value){
                    propsRequaire.push(prop); 
                }
            }


            for(const [id,event] of Object.entries(events[name])){
                let result = event.call(value,value,{
                    value:value,property:property,propsRequaire:propsRequaire,object:vars[name],id:id});
                //this.events.push(result);
                
                if([false,null].includes(result))
                    delete events[name][property];
            }
            
            if([null,undefined].includes(value)){
                delete events[name][property];
            }
            
            return this;
        }
        // ADD new item in list
        if([ADD,true].includes(property)){// + ,'ADD','Add','add'
            let prevProp = 0;
            let nextProp = 0;
            property = true;
            if (Array.isArray(vars[name])){
                prevProp = vars[name].length-1;
                vars[name].push(value);
            }
            else if(vars[name]){
                for(let key of Object.keys(vars[name]).sort((a, b) => b - a)){//.sort((a, b) => a - b).reverse()
                    if(isFinite(key)){
                        key = parseInt(key);
                        prevProp = key;
                        nextProp = 1 + key;
                        break;
                    }
                }
                vars[name][nextProp] = value;
            } 
            let propsRequaire = [];   
            //let i = 0;
            for(let prop in vars[name]){
                if(vars[name][prop] === value){
                    //i = properties.indexOf(value,i);
                    propsRequaire.push(prop);
                    //i += 1;
                }
            }
            
            //this.events = []; 
            for(const [id,event] of Object.entries(events[name])){
                let result = event.call(value,value,{
                    value:value,property:property,propsRequaire:propsRequaire,prevProp:prevProp,object:vars[name],id:id});
                //this.events.push(result);
                
                if([false,null].includes(result))
                    delete events[name][property];
            }
            return this;
        }
        if([REMOVE,false,'-'].includes(property)){// null
            property = false; 
            let propsRequaire = [];
            //let i = 0;
            for(let prop in vars[name]){
                if(vars[name][prop] === value){
                    //i = properties.indexOf(value,i);
                    propsRequaire.push(prop); 
                    //i += 1;
                    delete vars[name][prop];
                }
            }  
            
            //this.events = []; 
            for(const [id,event] of Object.entries(events[name])){
                let result = event.call(value,value,{
                    value:value,property:property,propsRequaire:propsRequaire,object:vars[name],id:id});
                //this.events.push(result);
                
                if([false,null].includes(result))
                    delete events[name][property];
                
            } 
            return this;
        }
        
        
        return this;
    }
    
     
}; 
    
    /*
     * Short Alias for Event
     */
    jQuery.fn.e = jQuery().event;
    /*
     * Short Alias for Variable
     */
    jQuery.fn.v = jQuery().var;
    
    /*
     * Short Alias for Variable
     */
    jQuery.v = jQuery().var;
    /*
     * Short Alias for Event
     */
    jQuery.e = jQuery().event;
    
/**
 * @method [StringFormat] Formating string for objects, arrays, numbers, strings and other primitive types
 * @param {string} [format] Format string
 * @param {any} [value] Value
 * @returns {string} Formated string
 */
    function StringFormat(format, value, data){ 
        
        if(typeof value !== 'object'){
            format = format.replace('{0}', value).replace('{this}', value).replace('{value}', value).replace('{val}', value);
            format = format.replace('{var}', value).replace('{variable}', value);
            return format;
        }
        
        for (let key in value){
            this[key]=value[key];
            format = format.replace('{' + key + '}', value[key]).replace('{this.' + key + '}', value[key]).replace('{value.' + key + '}', value[key]);
        }
        return format;
    };
    

})
);
