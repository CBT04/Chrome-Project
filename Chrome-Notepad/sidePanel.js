// Delceration of variables and binding event listeners to buttons.
let saveStack = [];

var active;
var timeoutIDsave;
var timeoutIDdesc;
let currentNote = "note1";
const content = document.getElementById("editor");
let note1Arr = {title:"", theme:"", contents:"" };
let note2Arr = {title:"", theme:"", contents:"" };
let note3Arr = {title:"", theme:"", contents:"" };
let note4Arr = {title:"", theme:"", contents:"" };
let note5Arr = {title:"", theme:"", contents:"" };
let note6Arr = {title:"", theme:"", contents:"" };

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

document.getElementById("bin").addEventListener("click", bin);
document.getElementById("bin").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("bin", "bin");}, 1000);});
document.getElementById("bin").addEventListener("mouseout", function() {clear("bin")});

document.getElementById("new").addEventListener("click", newNote);
document.getElementById("new").addEventListener("mouseover", function() {timeoutIDdesc = setTimeout(function() {info("new", "bin");}, 1000);});
document.getElementById("new").addEventListener("mouseout", function() {clear("new")});

document.getElementById("menu").addEventListener("click", openMenu);
document.getElementById("menuBack").addEventListener("click", closeMenu);

document.getElementById("note1").addEventListener("click", function() {switchNote("note1")});
document.getElementById("note2").addEventListener("click", function() {switchNote("note2")});
document.getElementById("note3").addEventListener("click", function() {switchNote("note3")});
document.getElementById("note4").addEventListener("click", function() {switchNote("note4")});
document.getElementById("note5").addEventListener("click", function() {switchNote("note5")});
document.getElementById("note6").addEventListener("click", function() {switchNote("note6")});

function bin()
{
    // Deletes the contents of the notepad and resets the title to new title.
    content.value = "";
    chrome.storage.sync.set({"title": document.getElementById("fileName").value})
    autoSave("enable");
}

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
    /* Switches elements to a specified rgb colour depending on the value of the colour button that was chosen. 
    Uses the chrome storage API to save the theme value. */
    clear(colour);
    switch(colour) 
    {
        case "red":
            document.body.style.background = "rgb(139, 0, 0)";
            document.getElementById("fileName").style.background = "rgb(139, 0, 0)";
            document.getElementById("bin").style.background = "rgb(139, 0, 0)";
            document.getElementById("menu").style.background = "rgb(139, 0, 0)";
            document.getElementById("new").style.background = "rgb(139, 0, 0)";
            document.getElementById(currentNote).style.background = "rgb(139, 0, 0)";
            chrome.storage.sync.set({"theme": "red"});
            break;
        case "green":
            document.body.style.background = "";
            document.getElementById("fileName").style.background = "rgb(39, 107, 27)";
            document.getElementById("bin").style.background = "rgb(39, 107, 27)";
            document.getElementById("menu").style.background = "rgb(39, 107, 27)";
            document.getElementById("new").style.background = "rgb(39, 107, 27)";
            document.getElementById(currentNote).style.background = "rgb(39, 107, 27)";
            chrome.storage.sync.set({"theme": "green"});
            break;
        case "blue":
            document.body.style.background = "rgb(0, 98, 139)";
            document.getElementById("fileName").style.background = "rgb(0, 98, 139)";
            document.getElementById("bin").style.background = "rgb(0, 98, 139)";
            document.getElementById("menu").style.background = "rgb(0, 98, 139)";
            document.getElementById("new").style.background = "rgb(0, 98, 139)";
            document.getElementById(currentNote).style.background = "rgb(0, 98, 139)";
            chrome.storage.sync.set({"theme": "blue"});
            break;
        case "yellow":
            document.body.style.background = "rgb(186, 176, 14)";
            document.getElementById("fileName").style.background = "rgb(186, 176, 14)";
            document.getElementById("bin").style.background = "rgb(186, 176, 14)";
            document.getElementById("menu").style.background = "rgb(186, 176, 14)";
            document.getElementById("new").style.background = "rgb(186, 176, 14)";
            document.getElementById(currentNote).style.background = "rgb(186, 176, 14)";
            chrome.storage.sync.set({"theme": "yellow"});
            break;
    }
};

function enterFileName() 
{   
    // Clears the defualt fileName input field for convinience when clicked on.
    const fileName = document.getElementById("fileName").value;
    if (fileName == "New Note" || fileName == "Untitled Note")
    {
        document.getElementById("fileName").value = "";
    }
    document.getElementById("fileName").addEventListener("focusout", function() {
        if (document.getElementById("fileName").value == "")
        {
            document.getElementById("fileName").value = "Untitled Note";
        }
        document.getElementById(currentNote).textContent = document.getElementById("fileName").value;
    })
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
    // Uses the chrome storage API to save the content of the notepad when data is input.
    chrome.storage.sync.set({"savedContent": content.value});
    console.log(content.value);
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
    // Uses the chrome storage API to save the content of the notepad when data is input.
    chrome.storage.sync.set({"savedContent": content.value});
};

function info(button, pos)
{   
    if (button == "bin" || button == "new")
    {
        buttonDesc = document.getElementById('description-bin');
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
        offsetX = -40;
    }
    else if(pos == "bin")
    {
        offsetX = -80;
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
    if (button == "bin" || button == "new")
        {
            buttonDesc = document.getElementById('description-bin');
        }
    else
        {
            buttonDesc = document.getElementById('description');
        }
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

document.getElementById("fileName").addEventListener("focusout", function() {
    chrome.storage.sync.set({"title": document.getElementById("fileName").value});
});

// Retrieves relevant data that was saved using chrome's storage API upon loading of the DOM.
function onLoad(initial)
{  
  showCurrentNote = document.getElementById(currentNote);
  showCurrentNote.style.display = "inline";
  chrome.storage.sync.get(["savedContent", "title", "theme", "current"], function(result) {
  if (initial == true)
  {
    if (result.current !== undefined)
    {
     currentNote = result.current;
    } 
  }
  title = result.title; theme = result.theme; savedContent = result.savedContent;
  recordData(title, theme, savedContent, currentNote);

  if (initial == true)
    {
    setData(note1Arr);
    }
  }
)};


function openMenu()
{
    popup = document.getElementById("popup");
    popup.style.display = "block";
};

function closeMenu()
{
    popup = document.getElementById("popup");
    popup.style.display = "none";
};

function newNote()
{   
    // Creates a blank note in the next available space and updates the current note value.
    document.getElementById(currentNote).textContent = document.getElementById("fileName").value;
    let noteNo = currentNote;
    chrome.storage.sync.get(["savedContent", "title", "theme", "current"], function(result) {
        title = result.title; theme = result.theme; savedContent = result.savedContent;
        recordData(title, theme, savedContent, noteNo);
    });

    content.value = "";
    document.body.style.background = "rgb(39, 107, 27)";
    document.getElementById("fileName").style.background = "rgb(39, 107, 27)";
    document.getElementById("bin").style.background = "rgb(39, 107, 27)";
    document.getElementById("menu").style.background = "rgb(39, 107, 27)";
    document.getElementById("new").style.background = "rgb(39, 107, 27)";
    
    let intValue = Number(currentNote[4].valueOf());
    intValue++;
    currentNote = String("note" + intValue);
    document.getElementById(currentNote).style.display = "inline";
    document.getElementById("fileName").value = "New Note";
    document.getElementById(currentNote).textContent = document.getElementById("fileName").value;
    chrome.storage.sync.set({"title": document.getElementById("fileName").value});
    recordData("New Note", "green", "", currentNote);
    autoSave("enable");

    if (currentNote == "note6")
    {
        document.getElementById("new").style.display = "none";
    }
}

function recordData(title, theme, contents, current)
{   
 console.log(current);
 console.log(current == "note1");
 if (current == "note1")
 {
    note1Arr = {title: title, theme: theme, contents: contents};
    console.log(note1Arr);
 }
 else if (current == "note2")
 {
    note2Arr = {title: title, theme: theme, contents: contents};
    console.log(note2Arr);
 }
 else if (current == "note3")
 {
    note3Arr = {title: title, theme: theme, contents: contents};
 }
 else if (current == "note4")
 {
    note4Arr = {title: title, theme: theme, contents: contents};
 }
 else if (current == "note5")
 {
    note5Arr = {title: title, theme: theme, contents: contents};
 }
 else if (current == "note6")
 {
    note6Arr = {title: title, theme: theme, contents: contents};
 }

}

function setData(note)
{
    if (note.title !== undefined)
    {
        document.getElementById("fileName").value = note.title;
    }
    if (note.theme !== undefined)
    {
        changeTheme(note.theme);
    }
    if (note.contents !== undefined)
    {
        content.value = note.contents;
    }
}

function switchNote(note)
{   
    colour = "unkown";
    noteNo = currentNote;
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
    recordData(document.getElementById("fileName").value, colour, content.value, noteNo);
    currentNote = note;
    if (note == "note1")
        {   
           setData(note1Arr);
        }
    else if (note == "note2")
        {
           setData(note2Arr);
        }
    else if (note == "note3")
        {
           setData(note3Arr);
        }
    else if (note == "note4")
        {
           setData(note4Arr);
        }
    else if (note == "note5")
        {
           setData(note5Arr);
        }
    else if (note == "note6")
        {
           setData(note6Arr);
        }
    popup = document.getElementById("popup");
    popup.style.display = "none";
}

onLoad(true);