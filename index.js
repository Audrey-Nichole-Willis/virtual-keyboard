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

    //INIT CREATES AND APPENDS THE NEW ELEMENTS

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
        this.elements.keys = this.elements.keysContainer.querySelectorAll("individualKey");

        //append elements  to the DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //use the virtual keyboard on elements that have the class use-keyboard-input
        document .querySelectorAll(".use-keyboard-input")
            .forEach((element) => {
            element.addEventListener("focus", () => {
                this.open(element.values, (currentValue) => {
                element.values = currentValue;
                });
            });
            });
    },

    // CREATE THE KEY BUTTONS

    createBtnKeys() {
        //create a fragment that will house all the new key buttons
        const fragment = document.createDocumentFragment();

        // the layout of the keys
        const keyLayout = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "q", "w", "e","r", "t", "y", "u", "i", "o","p", "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter", "done", "z", "x", "c", "v", "b","n","m",",",".","?", "space", ];

        //function to generate icons for the buttons that need them.
        const createIcon = (iconName) => {
            return `<i class = "fa-${iconName}"></i>`
        };

        // a forEach statement that will go through the keyLayout array and create buttons for them
        keyLayout.forEach((key) => {
        const keyElement = document.createElement("button");

        //the buttons backspace, p, enter, and ? should be the last on their line
        const insertLineBreak =["backspace", "p", "enter", "?"].indexOf(key)  !== -1;

        // add classes and attributed to those buttons
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("individualKey");

          // a switch statement to handle the different kind of buttons
            switch (key) {
            case "backspace":
                //this button will be wider than the regular buttons so it needs a wide class
                keyElement.classList.add("individualKey-wide");
                //the icon that will be on the button
                keyElement.innerHTML = createIcon("");
                //if the button is clicked
                keyElement.addEventListener("click", () => {
                  //remove the previous input
                this.properties.values = this.properties.values.substring(
                    0,
                    this.properties.values.length - 1
                );
                  //and trigger an input event handler
                this.handleEvent("oninput");
                });
                break;

            case "caps":
                //a class that shows the button will be wide and have an activatable property.
                keyElement.classList.add( "individualKey-wide","individualKey-activatable" );
                //create the needed icon
                keyElement.innerHTML = createIcon("");
                //if clicked
                keyElement.addEventListener("click", () => {
                  //activate the function that toggles the capsLock
                this.toggleCapsLock();
                  //toggle the class individualKey-active on the capsLock property
                keyElement.classList.toggle(
                    "individualKey-active",
                    this.properties.capsLock
                );
                });
                break;

            case "enter":
                //class that shows this button will be wide
                keyElement.classList.add("individualKey-wide");
                //create the needed icon
                keyElement.innerHTML = createIcon("");
                //if clicked
                keyElement.addEventListener("click", () => {
                  //start a new line from the last value
                this.properties.values += "\n";
                  //run the input event handler
                this.handleEvent("oninput");
                });
                break;

            case "space":
                //this button will be extra wide
                keyElement.classList.add("individualKey-x-wide");
                //create the needed icon
                keyElement.innerHTML = createIcon("");
                //if clicked
                keyElement.addEventListener("click", () => {
                  //add a blank space
                this.properties.values += " ";
                  //run the input event handler
                this.handleEvent("oninput");
                });
                break;

            case "done":
                //this element will be wide and also dark
                keyElement.classList.add( "individualKey-wide", "individualKey-dark" );
                //create the needed icon
                keyElement.innerHTML = createIcon("");
                //if clicked
                keyElement.addEventListener("click", () => {
                  //run the close function
                this.close();
                  //run the close event handler
                this.handleEvent("onclose");
                });
                break;

                default:
                //make the text lowercase by default
                keyElement.textContent = key.toLowerCase();
                //if clicked
                keyElement.addEventListener("click", () => {
                    //the value of the button checks the capslock property.
                this.properties.values += this.properties.capsLock
                  //if it's true, make the key uppercase
                    ? key.toUpperCase()
                    //if false make the key lowercase
                    : key.toLowerCase();
                    //run the input event handler
                this.handleEvent("oninput");
                });
                break;
                }
            //append the keys to the fragment
            fragment.appendChild(keyElement);

            //if the button includes a line break from being the last on its row, return <br> to make a new line
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
                    }
                });

                return fragment
        },

    //HANDLING EVENTS

    handleEvent(handlerName) {
    //if the type of event handler is equal to a function, then set it as the properties value; 
    if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.properties.values);
        }
    },

    //CAPS LOCK TOGGLE

    toggleCapsLock(){
        //turn the capsLock property from false to true
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                //if the caps lock is toggled on uppercase the text content, if it's not lowercase it.
            key.textContent = this.properties.capsLock
                ? key.textContent.toUpperCase()
                : key.textContent.toLowerCase();
            }
        }
    },

    //WHEN THE KEYBOARD OPENS

    open() {
     //set the value of the property of initial value or an empty string
    this.properties.values = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    //remove the class that hides the keyboard
    this.elements.main.classList.remove("hidden-keyboard");
    },

    //WHEN THE KEYBOARD CLOSES

    close() {
        this.properties.values = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("hidden-keyboard");
    }
};
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});