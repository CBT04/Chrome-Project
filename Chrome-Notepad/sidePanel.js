// Delceration of variables and binding event listeners to buttons.
let saveStack = [];

var timeoutIDsave;
var timeoutIDdesc;
const content = document.getElementById("editor");

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

document.getElementById("paste").addEventListener("click", paste);
document.getElementById("paste").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("paste");}, 1000);});
document.getElementById("paste").addEventListener("mouseout", function() {clear("paste")});

document.getElementById("green").addEventListener("click", function() {changeTheme("green")});
document.getElementById("green").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("green", "right");}, 1000);});
document.getElementById("green").addEventListener("mouseout", function() {clear("green");});

document.getElementById("red").addEventListener("click", function() {changeTheme("red")});
document.getElementById("red").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("red", "right");}, 1000);});
document.getElementById("red").addEventListener("mouseout", function() {clear("red")});

document.getElementById("yellow").addEventListener("click", function() {changeTheme("yellow")});
document.getElementById("yellow").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("yellow", "right");}, 1000);});
document.getElementById("yellow").addEventListener("mouseout", function() {clear("yellow")});

document.getElementById("blue").addEventListener("click", function() {changeTheme("blue")});
document.getElementById("blue").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("blue", "right");}, 1000);});
document.getElementById("blue").addEventListener("mouseout", function() {clear("blue")});

function copy() 
{   
    // Uses the navigator object and clipboard API to copy the text area content to the clipboard.
    clear("copy");
    const textToCopy = content;
    textToCopy.select();
    navigator.clipboard.writeText(textToCopy.value);
};

async function paste() 
{   
    // Uses the navigator object and clipboard API to read the clipboard contents and paste them into the text area.
    clear("paste");
    const clipboardText = await navigator.clipboard.readText();
    content.value = content.value + clipboardText;
    autoSave("enable");
};

function changeTheme(colour)
{   
    // Switches elements to a specified rgb colour depending on the value of the colour button that was chosen.
    clear(colour);
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
        case "yellow":
            document.body.style.background = "rgb(186, 176, 14)";
            document.getElementById("fileName").style.background = "rgb(186, 176, 14)";
    }
};

function enterFileName() 
{
    // Clears the defualt fileName input field for convinience when clicked on.
    let fileName = document.getElementById("fileName").value;
    if (fileName == "New Note")
    {
        document.getElementById("fileName").value = "";
    }
};

function save() 
{
    // Creates and appends a link to the document body so that it can be saved as a text file.
    clear("save");
    var link = document.createElement('a');
    link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content.value));
    let fileName = document.getElementById("fileName").value;

    // If the file name is left empty a defualt value is provided.
    if (fileName == '') 
    {
        fileName = "Untitled Note";
    }

    link.download = fileName + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

function autoSave(instant) 
{   
    /* Peeks to check that the top value is not the same as the current value and pushes a new save to the stack.
    Converts the values to strings and trims any whitespace at the end to make sure that values are correctly compared. */
    if (instant == "enable")
        {
        saveStack.push(content.value); 
        }    
    if (String(saveStack[saveStack.length-1]).trimEnd() != String(content.value).trimEnd()) 
        {
        saveStack.push(content.value);
        }
};

function undo() 
{   
    // Removes the latest item from the stack and peeks to provide the last save state. If the stack is empty the content is also empty.
    clear("undo");
    saveStack.pop();
    let lastSave = saveStack[saveStack.length-1];
    content.value = lastSave;
    if (saveStack == '') 
    {
        content.value = '';
    }
};

function info(button, pos)
{   
    const buttonDesc = document.getElementById('description');
    button = document.getElementById(button);
    let buttonText = button.dataset.desc;
    buttonDesc.style.borderStyle = "ridge";
    /* Using getBoundingClientRect method to get the position and size of the button so that the decritpion can float 
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
    buttonDesc.style.display = "block";
};

function clear(button) 
{
    // Clears the textcontent of the corresponding button.
    clearTimeout(timeoutIDdesc);
    const buttonDesc = document.getElementById('description');
    button = document.getElementById(button);
    buttonDesc.style.borderStyle = "none";
    buttonDesc.style.backgroundColor = "rgb(246, 241, 241)";
    buttonDesc.textContent = "";
    buttonDesc.style.display = "none";
};

content.addEventListener("input", function() 
{
    // Timeout used to make sure that there is a 1 second delay after input before saving to prevent unnecessary save states.
    clearTimeout(timeoutIDsave);
    timeoutIDsave = setTimeout(function() {
        autoSave();
    }, 1000);
});