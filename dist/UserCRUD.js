import { User } from "./User.js";
import data from "./data.json" assert { type: "json" };
import { Role } from "./Role.js";
export class UserCRUD {
    constructor() {
        this.users = [];
        this.col = [];
        this.tableContainer = document.querySelector('.table');
        this.initialize();
        this.tableEle = document.createElement("table");
    }
    initialize() {
        for (let key in data[0]) {
            if (this.col.indexOf(key) < 0) {
                this.col.push(key);
            }
        }
        data.forEach(ob => {
            this.users.push(new User(ob["First Name"], ob["Middle Name"], ob["Last Name"], ob.Email, ob.Phone, ob.Role, ob.Address));
        });
    }
    load() {
        this.tableEle = document.createElement("table");
        let tr = this.tableEle.insertRow(-1);
        for (let i = 0; i < this.col.length; i++) {
            let th = tr.insertCell(i);
            th.innerHTML = this.col[i];
        }
        this.users.forEach((user) => this.create(user));
    }
    create(user) {
        let tr = document.createElement("tr");
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.addEventListener('click', () => this.update(user));
        editBtn.classList.add("edit");
        let deleteBtn = document.createElement("button");
        deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        // deleteBtn.addEventListener('click',(e:Event) => this.delete(e));
        deleteBtn.addEventListener('click', () => this.delete(user));
        deleteBtn.classList.add("dlt");
        tr.innerHTML = `<td>${user.firstName}</td>
                        <td>${user.middleName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.phone_no}</td>
                        <td>${user.role}</td>
                        <td>${user.address}</td>
                        `;
        tr.append(editBtn);
        tr.append(deleteBtn);
        this.tableEle.append(tr);
        this.tableContainer.innerHTML = "";
        this.tableContainer.append(this.tableEle);
    }
    read() {
    }
    update(user) {
        let i = this.users.indexOf(user);
        let tr = this.tableEle.children[i + 1];
        let editbtn = tr.children[7];
        let dltbtn = tr.children[8];
        if (editbtn.innerHTML === "Edit") {
            tr.contentEditable = "true";
            editbtn.innerHTML = "Save";
            dltbtn.innerHTML = "Cancel";
            editbtn.contentEditable = "false";
            dltbtn.contentEditable = "false";
            let select = document.createElement("select");
            select.classList.add("select");
            for (const i in Role) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
                if (tr.children[5].textContent === i) {
                    option.selected = true;
                }
                else
                    option.selected = false;
                select.appendChild(option);
            }
            tr.children[5].replaceWith(select);
        }
        else {
            tr.contentEditable = "false";
            editbtn.innerHTML = "Edit";
            dltbtn.innerHTML = "Delete";
            user.firstName = tr.children[0].textContent;
            user.middleName = tr.children[1].textContent;
            user.lastName = tr.children[2].textContent;
            user.email = tr.children[3].textContent;
            user.phone_no = tr.children[4].textContent;
            user.address = tr.children[6].textContent;
            for (let i = 0; i <= 2; i++) {
                let s = tr.children[5].children[i];
                if (s.selected) {
                    user.role = s.textContent;
                }
            }
            let td = document.createElement("td");
            tr.children[5].replaceWith(td);
            tr.children[5].innerHTML = user.role;
        }
    }
    cancel(user) {
        let i = this.users.indexOf(user);
        let tr = this.tableEle.children[i + 1];
        let editbtn = tr.children[7];
        let dltbtn = tr.children[8];
        tr.contentEditable = "false";
        dltbtn.innerHTML = "Delete";
        editbtn.innerHTML = "Edit";
        this.load();
    }
    delete(user) {
        let i = this.users.indexOf(user);
        let tr = this.tableEle.children[i + 1];
        let editbtn = tr.children[7];
        let dltbtn = tr.children[8];
        if (dltbtn.innerHTML === "Delete") {
            tr.remove();
            this.users.splice(i - 1, 1);
            this.load();
        }
        else {
            this.cancel(user);
        }
    }
    refresh() {
        this.users = [];
        this.initialize();
        this.load();
    }
}
