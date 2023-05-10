const addBox = document.querySelector("add-box"),
popupBox = document.querySelector("popup-box"),
popupTitle = document.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
addBtn = popupBox.querySelector("button");
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea");

const moths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
 "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

 const notes = JSON.parse(localStorage.getItem("notes") || "[]");
 let isUpdate = false, updateId;
addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add a new Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="serttings">
                <i onclick "showMenu" (this) class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li onclick=> "updateNote"(${index}, '${note.title}', '${note.title}') class="uil uil-pen">edit</li>
                    <li onclick=> "deleteNote(${index})" class="uil uil-trash">delete</li>
                </ul>
            </div>
        </div>
    </li>`;
    addBox.insertAdjacentElement("afterend, liTag");
    });
}

showNotes();

function showMenu (elem) {
    parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote (noteId) {
    let confirmDel = confirm("Tem certeza que deseja deletar essa anotação?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes()
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId= noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
    console,log(noteId, title, desc);
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if (noteTtile || noteDesc) {
        let dataObj = new Date(),
        month = dateObj.getMonth(),
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }

        if(!isUpdate) {
            notes.push(noteInfo);
        } else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});