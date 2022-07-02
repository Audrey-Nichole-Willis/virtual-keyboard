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
        //create the div elements that will house the keys
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //add classes to newly created elements
        this.elements.main.classList.add("keyboard", "hidden-keyboard");
        this.elements.keysContainer.classList.add("keyboard-keys");

        //append the future rendered  keys to the key container
        this.elements.keysContainer.appendChild(this.createBtnKeys());

        //the keys are  all of the elements within the keysContainer with the class of keyboard-key
        this.elements.keys = this.elements.keysContainer.querySelectorAll("keyboard-key");

        //append elements  to the DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //use the virtual keyboard on elements that have the class use-keyboard-input
          document .querySelectorAll(".use-keyboard-input")
            .forEach((element) => {
              element.addEventListener("focus", () => {
                this.open(element.value, (currentValue) => {
                  element.value = currentValue;
                });
              });
            });
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