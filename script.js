let saveStack = [];

document.getElementById("undo").addEventListener("click", undo);

document.getElementById("save").addEventListener("click", save);

document.getElementById("title").addEventListener("click", clear);

document.getElementById("copy").addEventListener("click", copy);

document.getElementById("red").addEventListener("click", function() {changeTheme("red")});

document.getElementById("green").addEventListener("click", function() {changeTheme("green")});

document.getElementById("blue").addEventListener("click", function() {changeTheme("blue")});

const content = document.getElementById("editor");

var timeoutID;

function copy() 
{   
    // Uses the navigator API to copy the text area content to the clipboard.
    const textToCopy = content;
    textToCopy.select();
    navigator.clipboard.writeText(textToCopy.value);
};

function changeTheme(colour)
{   
    // Switches elements to a specified rgb colour depending on the value of the colour button that was chosen.
    switch(colour) 
    {
        case "red":
            document.body.style.background = "rgb(139, 0, 0)";
            document.getElementById("title").style.background = "rgb(139, 0, 0)";
            break;
        case "green":
            document.body.style.background = "rgb(39, 107, 27)";
            document.getElementById("title").style.background = "rgb(39, 107, 27)";
            break;
        case "blue":
            document.body.style.background = "rgb(0, 98, 139)";
            document.getElementById("title").style.background = "rgb(0, 98, 139)";
            break;
    }
};

function clear() 
{
    // Clears the title input field for convinience when clicked on.
    document.getElementById("title").value = '';
};

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
};

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