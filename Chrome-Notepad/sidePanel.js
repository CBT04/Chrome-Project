// Delceration of variables and binding event listeners to buttons.
var active;
var timeoutIDsave;
var timeoutIDdesc;

let currentNote = "note1";
let note1Obj = {title:"", theme:"", contents:""};
let note2Obj = {title:"", theme:"", contents:""};
let note3Obj = {title:"", theme:"", contents:""};
let note4Obj = {title:"", theme:"", contents:""};
let note5Obj = {title:"", theme:"", contents:""};
let note6Obj = {title:"", theme:"", contents:""};
let saveStack = [];

const content = document.getElementById("editor");

document.getElementById("fileName").addEventListener("click", enterFileName);

document.getElementById("save").addEventListener("click", download);
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

document.getElementById("green").addEventListener("click", function() {changeTheme("green", currentNote)});
document.getElementById("green").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("green", "right");}, 1000);});
document.getElementById("green").addEventListener("mouseout", function() {clear("green");});

document.getElementById("red").addEventListener("click", function() {changeTheme("red", currentNote)});
document.getElementById("red").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("red", "right");}, 1000);});
document.getElementById("red").addEventListener("mouseout", function() {clear("red")});

document.getElementById("yellow").addEventListener("click", function() {changeTheme("yellow", currentNote)});
document.getElementById("yellow").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("yellow", "right");}, 1000);});
document.getElementById("yellow").addEventListener("mouseout", function() {clear("yellow")});

document.getElementById("blue").addEventListener("click", function() {changeTheme("blue", currentNote)});
document.getElementById("blue").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("blue", "right");}, 1000);});
document.getElementById("blue").addEventListener("mouseout", function() {clear("blue")});

document.getElementById("bin").addEventListener("click", bin);
document.getElementById("bin").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("bin", "bin");}, 1000);});
document.getElementById("bin").addEventListener("mouseout", function() {clear("bin")});

document.getElementById("menu").addEventListener("click", openMenu);
document.getElementById("menu").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("menu", "menu");}, 1000);});
document.getElementById("menu").addEventListener("mouseout", function() {clear("menu")});

document.getElementById("menuBack").addEventListener("click", closeMenu);

document.getElementById("note1").addEventListener("click", function() {switchNote("note1")});
document.getElementById("note2").addEventListener("click", function() {switchNote("note2")});
document.getElementById("note3").addEventListener("click", function() {switchNote("note3")});
document.getElementById("note4").addEventListener("click", function() {switchNote("note4")});
document.getElementById("note5").addEventListener("click", function() {switchNote("note5")});
document.getElementById("note6").addEventListener("click", function() {switchNote("note6")});

// Functions are sorted in alphabetical order for convinience.
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
    save();
};

function bin()
{
    // Deletes the contents of the notepad and resets the title to new title.
    content.value = "";
    chrome.storage.sync.set({"title": document.getElementById("fileName").value})
    autoSave("enable");
}

function changeTheme(colour, note)
{   
    // Switches elements to a specified rgb colour depending on the value of the colour button that was chosen.
    clear(colour);
    switch(colour) 
    {
        case "red":
            document.body.style.background = "rgb(139, 0, 0)";
            document.getElementById("fileName").style.background = "rgb(139, 0, 0)";
            document.getElementById("bin").style.background = "rgb(139, 0, 0)";
            document.getElementById("menu").style.background = "rgb(139, 0, 0)";
            document.getElementById(note).style.background = "rgb(139, 0, 0)";
            chrome.storage.sync.set({"theme": "red"});
            break;
        case "green":
            document.body.style.background = "";
            document.getElementById("fileName").style.background = "rgb(39, 107, 27)";
            document.getElementById("bin").style.background = "rgb(39, 107, 27)";
            document.getElementById("menu").style.background = "rgb(39, 107, 27)";
            document.getElementById(note).style.background = "rgb(39, 107, 27)";
            break;
        case "blue":
            document.body.style.background = "rgb(0, 98, 139)";
            document.getElementById("fileName").style.background = "rgb(0, 98, 139)";
            document.getElementById("bin").style.background = "rgb(0, 98, 139)";
            document.getElementById("menu").style.background = "rgb(0, 98, 139)";
            document.getElementById(note).style.background = "rgb(0, 98, 139)";
            break;
        case "yellow":
            document.body.style.background = "rgb(186, 176, 14)";
            document.getElementById("fileName").style.background = "rgb(186, 176, 14)";
            document.getElementById("bin").style.background = "rgb(186, 176, 14)";
            document.getElementById("menu").style.background = "rgb(186, 176, 14)";
            document.getElementById(note).style.background = "rgb(186, 176, 14)";
            break;
    }
    save();
};

function clear(button) 
{
    // Clears the textcontent of the corresponding button.
    clearTimeout(timeoutIDdesc);
    if (button == "bin")
    {
        buttonDesc = document.getElementById('description-bin');
    }
    else if (button == "menu")
    {
        buttonDesc = document.getElementById('description-menu');
    }
    else
    {
        buttonDesc = document.getElementById('description');
    }
    buttonDesc.style.display = "none";
};

function closeMenu()
{
    // Closes the popup menu by hiding the popup element.
    popup = document.getElementById("popup");
    popup.style.display = "none";
};

function copy() 
{   
    // Uses the navigator object and clipboard API to copy the text area content to the clipboard.
    clear("copy");
    const textToCopy = content;
    textToCopy.select();
    navigator.clipboard.writeText(textToCopy.value);
};

function download() 
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

function enterFileName() 
{   
    // Clears the defualt fileName input field for convinience when clicked on.
    const fileName = document.getElementById("fileName").value;
    if (fileName == "New Note" || fileName == "Untitled Note")
    {
        document.getElementById("fileName").value = "";
    }
    // If the user did not type a fileName into the field the defualt value "Untitled Note" is used instead.
    document.getElementById("fileName").addEventListener("focusout", function() {
        if (document.getElementById("fileName").value == "")
        {
            document.getElementById("fileName").value = "Untitled Note";
        }
        document.getElementById(currentNote).textContent = document.getElementById("fileName").value;
    })
    save();
};

function info(button, pos)
{   
    // Checks if the button is the bin button so that the correct description element can be used to display the information.
    if (button == "bin")
    {
        buttonDesc = document.getElementById('description-bin');
    }
    else if (button == "menu")
    {
        buttonDesc = document.getElementById('description-menu');
    }
    else
    {
        buttonDesc = document.getElementById('description');
    }
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
        offsetX = -15;
    }
    else if(pos == "bin")
    {
        offsetX = -80;
    }
    else if(pos == "menu")
    {
        offsetX = -10;
        buttonDesc.style.top = "20px";
    }
    else
    {
      offsetX = -20;
    }
    buttonDesc.style.left = (rect.right + offsetX) + "px";
    buttonDesc.textContent = buttonText;
    buttonDesc.style.display = "block";
};

function openMenu()
{
    // Opens the popup menu by showing the popup element.
    popup = document.getElementById("popup");
    popup.style.display = "block";
};

async function paste() 
{   
    // Uses the navigator object and clipboard API to read the clipboard contents and paste them into the text area.
    clear("paste");
    const clipboardText = await navigator.clipboard.readText();
    content.value = content.value + clipboardText;
    autoSave("enable");
};

function recordData(title, theme, contents, current)
{   
 /* Records the title, theme and contents of the current note and saves them using the chrome storage API so that they can be retrieved
 for when the extension is reopened. */
 if (current == "note1")
 {
    note1Obj = {title: title, theme: theme, contents: contents};
    chrome.storage.sync.set({"note1": note1Obj});
 }
 else if (current == "note2")
 {
    note2Obj = {title: title, theme: theme, contents: contents};
    chrome.storage.sync.set({"note2": note2Obj});
 }
 else if (current == "note3")
 {
    note3Obj = {title: title, theme: theme, contents: contents};
    chrome.storage.sync.set({"note3": note3Obj});
 }
 else if (current == "note4")
 {
    note4Obj = {title: title, theme: theme, contents: contents};
    chrome.storage.sync.set({"note4": note4Obj});
 }
 else if (current == "note5")
 {
    note5Obj = {title: title, theme: theme, contents: contents};
    chrome.storage.sync.set({"note5": note5Obj});
 }
 else if (current == "note6")
 {
    note6Obj = {title: title, theme: theme, contents: contents};
    chrome.storage.sync.set({"note6": note6Obj});
 }
}

function save()
{
    // Checks for the background colour so the correct value can be saved for future use.
    let colour = "green";
    noteNumber = currentNote;
    if (document.body.style.background == "rgb(39, 107, 27)")
    {
        colour = "green";
    }
    else if (document.body.style.background == "rgb(139, 0, 0)")
    {
        colour = "red";    
    }
    else if (document.body.style.background == "rgb(0, 98, 139)")
    {
        colour = "blue";        
    }
    else if (document.body.style.background == "rgb(186, 176, 14)")
    {
        colour = "yellow";        
    }
    
    // Saves all of the relevent data.
    recordData(document.getElementById("fileName").value, colour, content.value, currentNote);
}

function setData(note, init)
{ 
 /* Checks that setData is called upon opening the extension and sets each of the note buttons to their corresponding values that were
 stored using the chrome storage API. */
 if (init == true)
    {  
    if (note1Obj !== undefined)
    {
        document.getElementById("note1").textContent = note1Obj.title;
        changeTheme(note1Obj.theme, "note1");
    }
    if (note2Obj !== undefined)
        {
        document.getElementById("note2").textContent = note2Obj.title;
        changeTheme(note2Obj.theme, "note2");
    }
    if (note3Obj !== undefined)
        {
        document.getElementById("note3").textContent = note3Obj.title;
        changeTheme(note3Obj.theme, "note3");
        }
    if (note4Obj !== undefined)
        {
        document.getElementById("note4").textContent = note4Obj.title;
        changeTheme(note4Obj.theme, "note4");
        }
    if (note5Obj !== undefined)
        {
        document.getElementById("note5").textContent = note5Obj.title;
        changeTheme(note5Obj.theme, "note5");
        }
    if (note6Obj !== undefined)
        {
        document.getElementById("note6").textContent = note6Obj.title;
        changeTheme(note6Obj.theme, "note6");
        }
    }

    /* Checks that note values are not undefined or empty and updates the values of the current note with the stored data for the 
    correpsonding note. */

    console.log(note);

    if (note && (note.title !== undefined && note.title !== ""))
    {
        document.getElementById("fileName").value = note.title;
    }
    else
    {
        document.getElementById("fileName").value = "New Note";
    }
    if (note && (note.theme !== undefined && note.theme !== ""))
    {
        console.log(note.theme);
        changeTheme(note.theme, currentNote);
    }
    else
    {
        changeTheme("green", currentNote);
    }
    if (note && (note.contents !== undefined && note.contents !== ""))
    {
        content.value = note.contents;
    }
    else
    {
        content.value = "";
    }
    save();
}

function switchNote(note)
{   
    save();
    currentNote = note;
    chrome.storage.sync.set({"current": currentNote});

    // Sets the data depending on which note button was clicked on.
    if (note == "note1")
        {   
           setData(note1Obj, false);
        }
    else if (note == "note2")
        {
           setData(note2Obj, false);
        }
    else if (note == "note3")
        {
           setData(note3Obj, false);
        }
    else if (note == "note4")
        {
           setData(note4Obj, false);
        }
    else if (note == "note5")
        {
           setData(note5Obj, false);
        }
    else if (note == "note6")
        {
           setData(note6Obj, false);
        }
    if (document.getElementById("fileName").value == "New Note" && content.value == "")
    {
        changeTheme("green", currentNote);
    }

    // Hides the menu popup element.
    popup = document.getElementById("popup");
    popup.style.display = "none";

    save();
}

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
    save();
};

content.addEventListener("input", function() 
{
    // Timeout used to make sure that there is a 1 second delay after input before saving to prevent unnecessary save states.
    clearTimeout(timeoutIDsave);
    timeoutIDsave = setTimeout(function() {
        autoSave();
    }, 1000);
});

document.addEventListener("DOMContentLoaded", function() 
{
    // Retrieves relevant data that was saved using chrome's storage API upon loading of the DOM.
    document.getElementById("note1").style.marginTop = "-60px";
    document.getElementById("note6").style.marginBottom = "20px";
    chrome.storage.sync.get(["note1", "note2", "note3", "note4", "note5", "note6"], function(result)
    {
     note1Obj = result.note1;
     note2Obj = result.note2; 
     note3Obj = result.note3; 
     note4Obj = result.note4; 
     note5Obj = result.note5;
     note6Obj = result.note6;
    });

    // Switches to the note that the user was last editing.
    chrome.storage.sync.get(["current"], function(result) {
        if (result.current !== undefined)
    {
     currentNote = result.current;
    } 
    if (currentNote == "note1")
        {   
           setData(note1Obj, true);
        }
    else if (currentNote == "note2")
        {
           setData(note2Obj, true);
        }
    else if (currentNote == "note3")
        {
           setData(note3Obj, true);
        }
    else if (currentNote == "note4")
        {
           setData(note4Obj, true);
        }
    else if (currentNote == "note5")
        {
           setData(note5Obj, true);
        }
    else if (currentNote == "note6")
        {
           setData(note6Obj, true);
        }
   });
});