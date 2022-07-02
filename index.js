const Keyboard = {
   //the elements that we need to create are the main div, the keys container, and an array of keys.
    elements:{
        main: null,
        keysContainer: null,
        keys: [],
    },
    //the types of events that will be handled are input and close events.
    eventHandlers: {
        oninput: null,
        onclose: null
    },
    //the properties of the keys will be:
    properties: {
        values: "", 
        capsLock: false
    },
    init() {

    },
    createBtnKeys() {

    },
    handleEvent(handlerName) {

    },
    open() {

    },
    close() {

    }
};
window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});