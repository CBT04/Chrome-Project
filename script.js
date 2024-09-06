let saveStack = [];

document.getElementById("undo").addEventListener("click", undo );

document.getElementById("save").addEventListener("click", save );

document.getElementById("title").addEventListener("click", clear );

const content = document.getElementById("editor");

var timeoutID;

function clear() 
{
    // Clears the title input field for convinience when clicked on.
    document.getElementById("title").value = '';
}

function save() 
{
    // Creates and appends a link to the document body so that it can be saved as a text file.
    var link = document.createElement('a');
    link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content.value));
    let fileName = document.getElementById("title").value;

    // If the file name is left empty a defualt value is provided.
    if (fileName == '') {
        fileName = "Untitled Note"
    }

    link.download = fileName + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function autoSave() 
{   
    // Peeks to see that the top value is not the same as the current value and pushes a new save to the stack.
    if (saveStack[saveStack.length-1] != content.value) 
        {
        saveStack.push(content.value);
        }
};

function undo() 
{   
    // Removes the latest item from the stack and peeks to provide the last save state. If the stack is empty the content is also empty.
    saveStack.pop();
    let lastSave = saveStack[saveStack.length-1];
    content.value = lastSave;
    if (saveStack == '') {
        content.value = '';
    }
};


content.addEventListener("input", function() 
{
    // Timeout used to make sure that there is a 1 second delay after input before saving to prevent unnecessary save states.
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function() {
        autoSave();
    }, 1000);
});