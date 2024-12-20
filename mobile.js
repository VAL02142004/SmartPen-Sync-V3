// List of valid users
const validUsers = ["user1", "user2", "user3"]; // Add more valid users as needed

// WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.type === 'note') {
        addNoteToGrid(data.noteName); // Add the shared note to the grid
    }
};

// Load existing notes from localStorage when the page loads
window.onload = function() {
    loadNotes();
};

function openSetting() {
    window.location.href = "Setti.html"; // Change to your actual settings page URL
}

function openProfile() {
    window.location.href = "profile.html"; // Change to your actual profile page URL
}

function logout() {
    window.location.href = "index.html"; // Change to your actual login page URL
}

function toggleDropdown() {
    var dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function openNote(noteName) {
    window.location.href = "note.html?note=" + encodeURIComponent(noteName); // Change to your actual notes page URL
}

function addNote() {
    document.getElementById("noteModal").style.display = "block"; // Show the modal
}

function closeNoteModal() {
    document.getElementById("noteModal").style.display = "none"; // Hide the modal
}

function submitNote() {
    var noteName = document.getElementById("noteInput").value; // Get the value from the input
    if (noteName) {
        saveNote(noteName);
        addNoteToGrid(noteName);
        // Send the note to other users via WebSocket
        socket.send(JSON.stringify({ type: 'note', noteName: noteName }));
        closeNoteModal(); // Close the modal after adding the note
        document.getElementById("noteInput").value = ""; // Clear the input
    } else {
        alert("Please enter a note name");
    }
}

function saveNote(noteName) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (!notes.includes(noteName)) {
        notes.push(noteName);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToGrid(note);
    });
}

function addNoteToGrid(noteName) {
    try {
        var gridContainer = document.getElementById("gridContainer");
        var newNote = document.createElement("div");
        newNote.className = "grid-item";

        // Create a container for the note name
        var noteContent = document.createElement("div");
        noteContent.className = "note-content"; // Optional: Add a class for styling

        // Append the note name to the note content
        noteContent.appendChild(document.createTextNode(noteName));
        // Add event listener for click to open the note
        noteContent.onclick = function() {
            openNote(noteName);
        };

        // Create a share icon
        var shareIcon = document.createElement("i");
        shareIcon.className = "fas fa-share-alt share-icon";
        shareIcon.onclick = function() {
            shareNote(noteName);
        };

        // Create a view icon
        var viewIcon = document.createElement("i");
        viewIcon.className = "fas fa-eye view-icon"; // Use Font Awesome eye icon
        viewIcon.onclick = function() {
            openNote(noteName); // Open the note on click
        };

        // Create a trash icon
        var trashIcon = document.createElement("i");
        trashIcon.className = "fas fa-trash-alt trash-icon"; // Use Font Awesome trash icon
        trashIcon.onclick = function() {
            deleteNote(noteName); // Directly delete the note without confirmation
        };

        // Append the note content, view icon, share icon, and trash icon to the new note element
        newNote.appendChild(noteContent);
        newNote.appendChild(viewIcon); // View icon is appended after the note content
        newNote.appendChild(shareIcon); // Share icon is appended after the view icon
        newNote.appendChild(trashIcon); // Trash icon is appended after the share icon

        // Add spacing between icons
        viewIcon.style.marginLeft = "10px"; // Add spacing to the view icon
        shareIcon.style.marginLeft = "10px"; // Add spacing to the share icon
        trashIcon.style.marginLeft = "10px"; // Add spacing to the trash icon

        // Append the new note element to the grid container
        gridContainer.appendChild(newNote);
    } catch (error) {
        console.error("Error adding note to grid:", error);
    }
}

function filterNotes() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var gridItems = document.getElementsByClassName("grid-item");

    // Loop through all grid items and hide those that don't match the search query
    for (var i = 0; i < gridItems.length; i++) {
        var noteName = gridItems[i].innerText.toLowerCase();
        if (noteName.includes(input)) {
            gridItems[i].style.display = ""; // Show the item
        } else {
            gridItems[i].style.display = "none"; // Hide the item
        }
    }
}

function deleteNote(noteName) {
    // Remove the note from localStorage
    let notes = JSON.parse(localStorage.getItem('notes'));
    if (notes && notes.includes(noteName)) {
        notes.splice(notes.indexOf(noteName), 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Remove the note from the grid
    var gridItems = document.getElementsByClassName("grid-item");
    for (var i = 0; i < gridItems.length; i++) {
        if (gridItems[i].innerText === noteName) {
            gridItems[i].remove();
            break;
        }
    }
}

function shareNote(noteName) {
    const shareMessage = `Check out this note: note.html?note=${encodeURIComponent(noteName)}`;
    document.getElementById("shareMessage").value = shareMessage;

    // Show the share dialog
    document.getElementById("shareDialog").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeShareDialog() {
    document.getElementById("shareDialog").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("errorMessage").style.display = "none";
}

function copyToClipboard() {
    const textarea = document.getElementById("shareMessage");
    textarea.select();
    document.execCommand('copy');
    alert('Share message copied to clipboard!');
}

function shareViaEmail() {
    const shareMessage = document.getElementById("shareMessage").value;
    const subject = "Check out this note";
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shareMessage)}`;
    window.location.href = mailtoLink;
}

function sendToUser () {
    const selectedUser  = document.getElementById("userInput").value; // Get value from input field
    const shareMessage = document.getElementById("shareMessage").value;

    // Validate the user
    if (!selectedUser ) {
        alert("Please enter a user name to send the notes to.");
        return;
    }

    if (!validUsers.includes(selectedUser )) {
        document.getElementById("errorMessage").innerText = "Error: Invalid user. Please enter a valid user name.";
        document.getElementById("errorMessage").style.display = "block";
        return;
    }

    // Here you would typically send the message to the backend server
    // For demonstration, we'll just log it to the console
    console.log(`Sending to ${selectedUser }: ${shareMessage}`);
    alert(`Notes shared with ${selectedUser }!`);

    // Simulate notifying the user that they have received the email
    alert(`Notification: ${selectedUser } has been notified about the shared notes.`);

    // Optionally, you can clear the input and message after sending
    document.getElementById("userInput").value = "";
    document.getElementById("shareMessage").value = "";
    closeShareDialog();
}

// Function to share notes in real-time
function shareNoteRealTime(noteName) {
    // Send the note to other users via WebSocket
    socket.send(JSON.stringify({ type: 'note', noteName: noteName }));
}

// Example of how to call the real-time sharing function
function submitNote() {
    var noteName = document.getElementById("noteInput").value; // Get the value from the input
    if (noteName) {
        saveNote(noteName);
        addNoteToGrid(noteName);
        shareNoteRealTime(noteName); // Share the note in real-time
        closeNoteModal(); // Close the modal after adding the note
        document.getElementById("noteInput").value = ""; // Clear the input
    } else {
        alert("Please enter a note name");
    }
}