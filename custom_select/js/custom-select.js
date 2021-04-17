/*------------------------
Custom Select - Plugin
by Lucas Santana (b4tman)
------------------------*/
// Custom Select Class.
class Select {
    constructor(element) {
        this.element = element;
        this.customElement = document.createElement('div');
        this.customLabel = document.createElement('span');
        this.options = getFormattedOptions(element.querySelectorAll('option'));
        this.customOptions = document.createElement('ul');

        // Setup the original element to generate the custom one.
        setup(this);

        // Append the custom select element after the original.
        element.after(this.customElement);

        // Hide the original element.
        element.style.display = 'none';

        // Prevent screen readers to read two elements.
        element.setAttribute('aria-hidden', 'true');
    }

    get selectedOption () {
        return this.options.find(option => option.selected);
    }

    get selectedOptionIndex () {
        return this.options.indexOf(this.selectedOption);
    }

    selectValue (value) {
        const newSelectedOption = this.options.find(option => {
            return option.value === value;
        });

        const prevSelectedOption = this.selectedOption;

        prevSelectedOption.selected = false;
        prevSelectedOption.element.selected = false;

        newSelectedOption.selected = true;
        newSelectedOption.element.selected = true;

        this.customLabel.innerText = newSelectedOption.label;

        // Remove selected class from previous and aplly in the selected option.
        this.customOptions.querySelector(`[data-value="${prevSelectedOption.value}"]`).classList.remove('selected');

        const newCustomElement = this.customOptions.querySelector(`[data-value="${newSelectedOption.value}"]`);

        // Scroll to active option.
        newCustomElement.classList.add('selected');
        newCustomElement.scrollIntoView({block: 'nearest'});
    }
}

// Create the custom select element.
function setup (select) {
    select.customElement.classList.add('cs');

    // Allow focusing.
    select.customElement.tabIndex = 0;

    select.customLabel.classList.add('cs__value');
    select.customLabel.innerText = select.selectedOption.label;
    select.customElement.append(select.customLabel);

    select.customOptions.classList.add('cs__options');

    // Create an object of the original options.
    select.options.forEach(option => {
        const optionElement = document.createElement('li');

        optionElement.classList.add('cs__options__option');
        optionElement.classList.toggle('selected', option.selected);
        optionElement.innerText = option.label;
        optionElement.dataset.value = option.value;

        // Apply selected class to the selected option.
        optionElement.addEventListener('click', () => {
            // Add the class to selected option and closes de dropdown.
            select.selectValue(option.value);
            select.customOptions.classList.remove('show');
            select.customLabel.classList.remove('active');
        });

        select.customOptions.append(optionElement);
    });

    select.customElement.append(select.customOptions);

    // Add event listener to show the options when clicked.
    select.customLabel.addEventListener('click', () => {
        select.customOptions.classList.toggle('show');
        select.customLabel.classList.toggle('active');
    });

    // Close the dropdown when clicked outside of it.
    select.customElement.addEventListener('blur', () => {
        select.customOptions.classList.remove('show');
        select.customLabel.classList.remove('active');
    });

    // Variables to select options with the letters pressed.
    let debounceTimeout;
    let searchTerm = "";

    // Toggle between options with keyboard.
    select.customElement.addEventListener('keydown', e => {
        switch (e.code) {
            case "Space":
                select.customOptions.classList.toggle('show');
                select.customLabel.classList.toggle('active');
                break;
            
            case "ArrowUp": { 
                const prevOption = select.options[select.selectedOptionIndex - 1]
                if (prevOption) {
                    select.selectValue(prevOption.value);
                }
                break;
            }
            
            case "ArrowDown": {
                const nextOption = select.options[select.selectedOptionIndex + 1]
                if (nextOption) {
                    select.selectValue(nextOption.value);
                }
                break;
            }

            case "Enter":
            case "Escape":
                select.customOptions.classList.remove('show');
                select.customLabel.classList.remove('active');
                break;
            
            default: {
                // Search for selected letters and reset the search term in 500ms.
                clearTimeout(debounceTimeout);
                searchTerm += e.key;
                debounceTimeout = setTimeout(() => {
                    searchTerm = "";
                }, 500);

                const searchedOption = select.options.find(option => {
                    return option.label.toLowerCase().startsWith(searchTerm);
                });

                if (searchedOption) {
                    select.selectValue(searchedOption.value);
                }

                console.log(searchTerm);
            }
        }
    });
}

// Get the original options and format to the custom element.
function getFormattedOptions (optionElements) {
    return [...optionElements].map(optionElement => {
        return {
            value: optionElement.value,
            label: optionElement.label,
            selected: optionElement.selected,
            element: optionElement
        }
    });
}

/*------------------------
Init Custom Select Plugin
------------------------*/
/** 
 * import Select from './custom-select.js' 
 * Use this in separated js files. 
 * Remember to export default class Select in this file. 
**/

// Gets all the select elements to be customized.
const selectElements = document.querySelectorAll('[data-cs');

// Apply the Select class to the elements.
selectElements.forEach(selectElement => {
    new Select(selectElement);
});
