// Delceration of variables and binding event listeners to buttons.
let saveStack = [];

const content = document.getElementById("editor");
var timeoutIDsave;
var timeoutIDdesc;

document.getElementById("fileName").addEventListener("click", enterFileName);

document.getElementById("save").addEventListener("click", save);
document.getElementById("save").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("save", "left");}, 1000);});
document.getElementById("save").addEventListener("mouseout", function() {clear("save")});

document.getElementById("undo").addEventListener("click", undo);
document.getElementById("undo").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("undo");}, 1000);});
document.getElementById("undo").addEventListener("mouseout", function() {clear("undo")});

document.getElementById("copy").addEventListener("click", copy);
document.getElementById("copy").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("copy");}, 1000);});
document.getElementById("copy").addEventListener("mouseout", function() {clear("copy")});

document.getElementById("green").addEventListener("click", function() {changeTheme("green")});
document.getElementById("green").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("green", "right");}, 1000);});
document.getElementById("green").addEventListener("mouseout", function() {clear("green");});

document.getElementById("red").addEventListener("click", function() {changeTheme("red")});
document.getElementById("red").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("red", "right");}, 1000);});
document.getElementById("red").addEventListener("mouseout", function() {clear("red")});

document.getElementById("blue").addEventListener("click", function() {changeTheme("blue")});
document.getElementById("blue").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("blue", "right");}, 1000);});
document.getElementById("blue").addEventListener("mouseout", function() {clear("blue")});

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
            document.getElementById("fileName").style.background = "rgb(139, 0, 0)";
            break;
        case "green":
            document.body.style.background = "rgb(39, 107, 27)";
            document.getElementById("fileName").style.background = "rgb(39, 107, 27)";
            break;
        case "blue":
            document.body.style.background = "rgb(0, 98, 139)";
            document.getElementById("fileName").style.background = "rgb(0, 98, 139)";
            break;
    }
};

function enterFileName() 
{
    // Clears the fileName input field for convinience when clicked on.
    document.getElementById("fileName").value = "";
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
    // Peeks to check that the top value is not the same as the current value and pushes a new save to the stack.
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

function info(button, pos)
{   
    setTimeout(1000);
    const buttonDesc = document.getElementById('description');
    button = document.getElementById(button);
    let buttonText = button.dataset.desc;
    buttonDesc.style.borderStyle = "ridge";
    /* Using getBoundingCLientRect method to get the position and size of the button so that the decritpion can float 
    in a position relative to it.*/
    const rect = button.getBoundingClientRect();
    if (pos == "right")
    {
      offsetX = -150; 
    }
    else if(pos == "left")
    {
        offsetX = -40;
    }
    else
    {
      offsetX = -20;
    }
    buttonDesc.style.left = (rect.right + offsetX) + "px";
    buttonDesc.textContent = buttonText;
};

function clear(button) 
{
    // Clears the textcontent of the corresponding button.
    clearTimeout(timeoutIDdesc);
    const buttonDesc = document.getElementById('description');
    button = document.getElementById(button);
    buttonDesc.style.borderStyle = "none";
    buttonDesc.textContent = "";
};

content.addEventListener("input", function() 
{
    // Timeout used to make sure that there is a 1 second delay after input before saving to prevent unnecessary save states.
    clearTimeout(timeoutIDsave);
    timeoutIDsave = setTimeout(function() {
        autoSave();
    }, 1000);
});
