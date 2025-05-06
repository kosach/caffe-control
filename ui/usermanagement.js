userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const role = document.getElementById('userRole').value;
  const editingRowIndex = userForm.getAttribute('data-editing-row');

  if (editingRowIndex) {
    // Editing existing user
    const row = usersTbody.rows[editingRowIndex - 1];
    row.cells[0].innerText = name;
    row.cells[1].innerText = email;
    row.cells[2].innerText = role;
    users[editingRowIndex - 1] = { name, email, role };
  } else {
    // Adding new user
    const newRow = usersTbody.insertRow();
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${role}</td>
      <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
      </td>`;

    // Attach listeners to new buttons
    newRow.querySelector('.btn-edit').addEventListener('click', () => {
      const row = newRow;
      const userData = {
        name: row.cells[0].innerText,
        email: row.cells[1].innerText,
        role: row.cells[2].innerText
      };
      openModal(userData, row);
    });
    newRow.querySelector('.btn-delete').addEventListener('click', () => {
      deleteUser(newRow);
    });
    users.push({ name, email, role });
  }

  closeModal();
  filterUsers();
});
