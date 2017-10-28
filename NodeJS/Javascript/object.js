Object.create(proto[, propertiesObject])

//Parameters

//proto
//The object which should be the prototype of the newly-created object.

//propertiesObject
//Optional. If specified and not undefined, an object whose enumerable own properties
//(that is, those properties defined upon itself and not enumerable properties along its prototype chain)
//specify property descriptors to be added to the newly-created object, with the corresponding property names.
//These properties correspond to the second argument of Object.defineProperties().


Object.defineProperties(obj, props)
//Parameters

//obj
//The object on which to define or modify properties.

//props
//An object whose own enumerable properties constitute descriptors for the properties to be defined or modified.
//Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors
//(see Object.defineProperty() for more details). Descriptors have the following keys:

//configurable
//true if and only if the type of this property descriptor may be changed and if the property
//may be deleted from the corresponding object.
//Defaults to false.

//enumerable
//true if and only if this property shows up during enumeration of the properties on the corresponding object.
//Defaults to false.

//value
//The value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
//Defaults to undefined.

//writable
//true if and only if the value associated with the property may be changed with an assignment operator.
//Defaults to false.

//get
//A function which serves as a getter for the property, or undefined if there is no getter.
//The function return will be used as the value of property.
//Defaults to undefined.

//set
//A function which serves as a setter for the property, or undefined if there is no setter.
//The function will receive as only argument the new value being assigned to the property.
//Defaults to undefined.
