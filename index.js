const Keyboard = {

//SETUP

    //The new elements that have to be created with js
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
    },
    //the events that will be handled throughout the keyboard object
    eventHandlers: {
        oninput: null,
        onclose: null,
    },
    //this will be the properties of the created key buttons
    properties: {
        value: "",
        capsLock: false,
    },

    //CREATE AND INITIALIZE THE NEEDED ELEMENTS AND SET THE VIRTUAL KEYBOARD AS DEFAULT FOR CERTAIN ELEMENTS

    init() {
    // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

    // Add classes to those new elements
        this.elements.main.classList.add("keyboard", "hidden-keyboard");
        this.elements.keysContainer.classList.add("keyboard-keys");

    //Append the buttons that will be created with the createBtnKeys function to the keysContainer
        this.elements.keysContainer.appendChild(this.createBtnKeys());

    //The keys element will be equal to all the elements within the keysContainer with the class individualKey
        this.elements.keys =this.elements.keysContainer.querySelectorAll(".individualKey");

    // Append newly created elements to the DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

    // Use the virtual keyboard when giving input to an element with the class use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach((element) => {
            element.addEventListener("focus", () => {
            this.open(element.value, (currentValue) => {
            element.value = currentValue;
        });
        });
    });
    },

    //THE FUNCTION TO CREATE AND APPEND THE NEWLY CREATED BUTTON KEYS AND ADD THE INDIVIDUAL BUTTON LOGIC

    createBtnKeys() {
    //Create a document fragment to hold the new keys
        const fragment = document.createDocumentFragment();
    //an array with the keyLayout that we can loop through
        const keyLayout = ["1","2","3","4","5","6","7","8","9","0", "backspace",
    "q", "w","e","r","t","y","u","i","o","p","caps","a","s","d","f","g","h", "j",
    "k","l","enter","done","z", "x","c","v","b", "n","m",",",".","?", "space",
    ];
     //A function that renders different icons needed for the special buttons
        const createIcon = (iconName) => {
            return `<i class = "fa-solid fa-${iconName}"></i>`;
        };

        //A forEach statement that loops through the keyLayout array. For each key: ...
        keyLayout.forEach((key) => {
         //create a new button element
            const keyElement = document.createElement("button");
         //insert line breaks for the these specific buttons located at the end of each line of keys.
            const insertLineBreak =["backspace", "p", "enter", "?"].indexOf(key) !== -1;
         // Add the attributes and classes for the new buttons
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("individualKey");

        //A switch statement to handle the logic for the special buttons
        switch (key) {
        case "backspace":
            //The backspace button will be wider and needs a class to express that as well as an icon
            keyElement.classList.add("individualKey-wide");
            keyElement.innerHTML = createIcon("arrow-left-long");
            //When clicked the backspace button will
            keyElement.addEventListener("click", () => {
            //Remove the last input
                this.properties.value = this.properties.value.substring(0,this.properties.value.length - 1);
            //Run the function to handle events, this one is an input event.
                this.handleEvent("oninput");
            });
            break;

            case "caps":
            // The caps  button will be wider and have styles that appear only on activation and needs classes to express that as well as an icon
                keyElement.classList.add( "individualKey-wide", "individualKey-activatable");
                keyElement.innerHTML = createIcon("lock");
             //When the caps button is clicked: ..
                keyElement.addEventListener("click", () => {
            //run the togglesCapsLock function
                this.toggleCapsLock();
            //toggle the active class on the caps button and change the capsLock boolean
                keyElement.classList.toggle( "individualKey-active",this.properties.capsLock );
            });
            break;

            case "enter":
            //The enter button will be wide and needs a class to show that as well as an icon.
                keyElement.classList.add("individualKey-wide");
                keyElement.innerHTML = createIcon("right-to-bracket");
            //if enter is clicked..
                keyElement.addEventListener("click", () => {
                // start a new line after the last input
                    this.properties.value += "\n";
              //Run function that handles events, this one is an input event
                    this.handleEvent("oninput");
            });
            break;

            case "space":
            //the space button will be EXTRA wide. it needs a class to show this as well as an icon
                keyElement.classList.add("individualKey-x-wide");
                keyElement.innerHTML = createIcon("arrow-right-long");
            //if clicked the space button will...
                keyElement.addEventListener("click", () => {
            //Add an empty space after the last input
                this.properties.value += " ";
              //run the function that handles events. this is an input event.
                this.handleEvent("oninput");
            });
            break;

            case "done":
            //The done button will be wide and dark and needs classes to show this, as well as an icon
                keyElement.classList.add( "individualKey-wide","individualKey-dark");
                keyElement.innerHTML = createIcon("circle-check");
            //If clicked the done button will...
                keyElement.addEventListener("click", () => {
             //Run the function that closes our keyboard
                    this.close();
            //Run the function that handles events. This is our only close event.
                    this.handleEvent("onclose");
            });
            break;

            default:
            //If the button is not one of these special buttons, have the text set to lowercase on default
                keyElement.textContent = key.toLowerCase();
            //If clicked a regular button will...
                keyElement.addEventListener("click", () => {
            //Uppercase text if capsLock is true and lowercase text if it's false
                this.properties.value += this.properties.capsLock
                    ? key.toUpperCase()
                    : key.toLowerCase();
             //Run function that handles events, this event is an input event
                this.handleEvent("oninput");
            });
            break;
        }
        //Append the keys onto the fragment
        fragment.appendChild(keyElement);

        //If the button is one that needs a line break, add a br to the fragment
        if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
        }
    });
        //The fragment now holding the button is returned and the init function earlier up in the object will render it.
    return fragment;
    },

//EVENT HANDLER FUNCTION

    handleEvent(handlerName) {
    //If the event handler name is a function...
        if (typeof this.eventHandlers[handlerName] == "function") {
    //update the value of the button property
            this.eventHandlers[handlerName](this.properties.value);
            }
    },

//TOGGLE CAPSLOCK FUNCTION

    toggleCapsLock() {
        //Change the value of capsLock to the opposite
        this.properties.capsLock = !this.properties.capsLock;
            for (const key of this.elements.keys) {
                //the the key from keys child element count is 0
                if (key.childElementCount === 0) {
                    //change the text content to uppercase if capLock is true and keep it lowercase if it's false
                    key.textContent = this.properties.capsLock
                    ? key.textContent.toUpperCase()
                    : key.textContent.toLowerCase();
                }
            }
    },

    //FUNCTION FOR WHEN THE KEYBOARD OPENS

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("hidden-keyboard");
    },

    //FUNCTION FOR WHEN THE KEYBOARD CLOSES

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("hidden-keyboard");
    },
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
