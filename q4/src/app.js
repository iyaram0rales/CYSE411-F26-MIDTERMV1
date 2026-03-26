// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;

// Q4A JSON Input Validation

// creates a new function to validate data in profile
function validProfile(data) {
   // checks if all data is right type
   if (
        typeof data !== "object" ||
        data === null ||
        typeof data.username !== "string" ||
        !Array.isArray(data.notifications) ||
        typeof data.notifications !== "string"
      ) {
      
      return null;
   }

   // only returns data if correct type
   return {
        username: data.username,
        notifications: data.notifications
    };
}

/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;

    let safe_parse;

   // creates new element for safe parsing
   try { 
      safe_parse = JSON.parse(text);

   } catch (e) {
      alert("Invalid format");
      return;
   }

   const profile = validProfile(safe_parse);

   if(!profile) {
      alert("Invalid data");
      return;
   }
   
   currentProfile = profile;
   renderProfile(profile);
}


/* -------------------------
   Render Profile
-------------------------- */

// Q4B Secure DOM Manipulation
function renderProfile(profile) {

    // changed from innerHTML to textContent
    // prevents injection via html
    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");
    list.innerHTML = "";

    for (let n of profile.notifications) {

        const li = document.createElement("li");

        
        li.textContent = n;

        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    localStorage.setItem("profile", JSON.stringify(currentProfile));

    alert("Session saved");
}


function loadSession() {

    const stored = localStorage.getItem("profile");

    if (!stored) {
       return ;
    }
    let safe_parse;

    try {
       safe_parse = JSON.parse(stored);

    } catch (e) {
       alert("Invalid stored data");
       return;
    }
   
    const profile = validProfile(safe_parse);
    
   if (!profile) {
        alert("Invalid stored profile");
        return;
    }    

        currentProfile = profile;
        renderProfile(profile);
    }
}
