const students = []; // Tableau pour stocker les étudiants
let editIndex = -1; // Indice de l'étudiant en cours de modification
const users = {}; // Objet pour stocker les utilisateurs

document.getElementById('signupForm').addEventListener('submit', signup);
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('loadStudents').addEventListener('click', loadStudents);
document.getElementById('studentForm').addEventListener('submit', addOrUpdateStudent);
document.getElementById('showLogin').addEventListener('click', showLogin);
document.getElementById('showSignup').addEventListener('click', showSignup);

// Fonction pour l'inscription
function signup(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // Vérifier si l'utilisateur existe déjà
    if (users[newUsername]) {
        alert("Cet utilisateur existe déjà. Choisissez un autre nom.");
    } else {
        // Enregistrer le nouvel utilisateur
        users[newUsername] = newPassword;
        alert("Compte créé avec succès !");
        showLogin(); // Afficher la section de connexion après l'inscription
        document.getElementById('signupForm').reset();
    }
}

// Fonction pour la connexion
function login(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérifier les identifiants
    if (users[username] && users[username] === password) {
        document.getElementById('studentSection').style.display = 'block';
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('loginForm').reset();
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
}

// Fonction pour afficher la section de connexion
function showLogin() {
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
}

// Fonction pour afficher la section d'inscription
function showSignup() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
}

// Fonction pour charger les étudiants
function loadStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Réinitialiser la liste

    if (students.length === 0) {
        studentList.innerHTML = '<tr><td colspan="3">Aucun étudiant trouvé.</td></tr>';
        return;
    }

    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editStudent(${index})">Modifier</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Supprimer</button>
            </td>
        `;
        studentList.appendChild(tr);
    });
}

// Fonction pour ajouter ou modifier un étudiant
function addOrUpdateStudent(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const name = document.getElementById('studentName').value;
    const age = parseInt(document.getElementById('studentAge').value);

    if (editIndex === -1) {
        // Ajouter un nouvel étudiant
        students.push({ name, age });
    } else {
        // Modifier l'étudiant existant
        students[editIndex] = { name, age };
        editIndex = -1; // Réinitialiser l'indice
    }

    // Réinitialiser le formulaire
    document.getElementById('studentForm').reset();

    // Charger les étudiants après ajout ou modification
    loadStudents();
}

// Fonction pour éditer un étudiant
function editStudent(index) {
    editIndex = index;
    document.getElementById('studentName').value = students[index].name;
    document.getElementById('studentAge').value = students[index].age;
}

// Fonction pour supprimer un étudiant
function deleteStudent(index) {
    students.splice(index, 1); // Supprimer l'étudiant
    loadStudents(); // Recharger la liste des étudiants
}