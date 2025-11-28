window.initApplicantTable = function() {
    const applicantModalEl = document.getElementById('applicantModal');
    if (!applicantModalEl) return;

    const applicantModal = new bootstrap.Modal(applicantModalEl);
    const applicantForm = document.getElementById('applicantForm');
    const tableBody = document.querySelector('.table tbody');
    const modalTitle = document.getElementById('applicantModalLabel');
    const submitBtn = applicantModalEl.querySelector('button[type="submit"]');
    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photoPreview');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const addressInput = document.getElementById('address');
    const suggestions = document.getElementById('suggestions');
    const dropdownBtn = document.getElementById('dropdownBtn');

    let currentApplicantId = null;
    let currentFocus = -1;

    const barangays = [
        "Amagusan","Calintaan","Canlabian","Cogon","Capacuhan",
        "Kagingkingan","Lewing","Look","Mainit","Mahalo",
        "Manigawng","Poblacion","San Vicente","Tagup on"
    ];

    // -------------------------------
    // MESSAGE HELPER
    // -------------------------------
    function showMessage(msg, type='success') {
        const messageBox = document.getElementById('messageBox');
        if (!messageBox) return;
        messageBox.textContent = msg;
        messageBox.className = `message-box show ${type}`;
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 3000);
    }

    // -------------------------------
    // VALIDATION FUNCTIONS
    // -------------------------------
    function validateNameFields() {
        const first = document.getElementById("firstname");
        const middle = document.getElementById("middlename");
        const last = document.getElementById("lastname");
        const nameRegex = /^[A-Za-z\s'-]+$/;
        [first, middle, last].forEach(el => el.classList.remove("is-invalid"));
        let valid = true;
        if (!nameRegex.test(first.value.trim())) { first.classList.add("is-invalid"); valid = false; }
        if (middle.value.trim() && !nameRegex.test(middle.value.trim())) { middle.classList.add("is-invalid"); valid = false; }
        if (!nameRegex.test(last.value.trim())) { last.classList.add("is-invalid"); valid = false; }
        return valid;
    }

    function validateAgeField() {
        const ageInput = document.getElementById('age');
        ageInput.classList.remove('is-invalid');
        if (!ageInput.value || isNaN(ageInput.value) || Number(ageInput.value) <= 0) {
            ageInput.classList.add('is-invalid');
            return false;
        }
        return true;
    }

    function validateSelectFields() {
        const fields = ['sex', 'status', 'applicantType'];
        let valid = true;
        fields.forEach(id => {
            const el = document.getElementById(id);
            el.classList.remove('is-invalid');
            if (!el.value) { el.classList.add('is-invalid'); valid = false; }
        });
        return valid;
    }

    // -------------------------------
    // USERNAME & PASSWORD
    // -------------------------------
    function generateUsername(first,last){
        if(!first||!last) return '';
        return `${first.trim().toLowerCase()}.${last.trim().toLowerCase()}`;
    }

    function generatePassword(len=10){
        const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let pass=''; 
        for(let i=0;i<len;i++) pass+=chars.charAt(Math.floor(Math.random()*chars.length));
        return pass;
    }

    function updateCredentials(){
        const first = document.getElementById('firstname').value;
        const last = document.getElementById('lastname').value;
        if(usernameInput) usernameInput.value = generateUsername(first,last);
        if(passwordInput && !currentApplicantId) passwordInput.value = generatePassword();
    }

    // -------------------------------
    // MODAL HANDLERS
    // -------------------------------
    document.getElementById('addNewBtn')?.addEventListener('click', ()=>{
        applicantForm.reset();
        photoPreview.style.display='none';
        currentApplicantId = null;
        modalTitle.textContent = 'Applicant Information';
        submitBtn.textContent = 'Submit';
        updateCredentials();
        applicantModal.show();
    });

    document.getElementById('modalCloseBtn')?.addEventListener('click', ()=>applicantModal.hide());
    document.getElementById('modalFooterClose')?.addEventListener('click', ()=>applicantModal.hide());
    document.getElementById('firstname')?.addEventListener('input', updateCredentials);
    document.getElementById('lastname')?.addEventListener('input', updateCredentials);

    // -------------------------------
    // PHOTO PREVIEW
    // -------------------------------
    photoInput?.addEventListener('change', function(){
        const file = this.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = e => {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            photoPreview.src = '';
            photoPreview.style.display = 'none';
        }
    });

    // -------------------------------
    // ADDRESS AUTOCOMPLETE
    // -------------------------------
    function showSuggestions(filter='') {
        suggestions.innerHTML = '';
        const filtered = filter ? barangays.filter(b => b.toLowerCase().includes(filter.toLowerCase())) : [...barangays];
        filtered.forEach(b=>{
            const div = document.createElement('div');
            div.textContent = `${b}, Anahawan, Southern Leyte, 6610`;
            div.addEventListener('click', ()=>{ 
                addressInput.value = div.textContent; 
                hideSuggestions(); 
            });
            suggestions.appendChild(div);
        });
        suggestions.style.display = filtered.length ? 'block' : 'none';
        currentFocus = -1;
    }

    function hideSuggestions(){
        suggestions.style.display='none';
        suggestions.innerHTML='';
        currentFocus=-1;
    }

    addressInput?.addEventListener('input', ()=>showSuggestions(addressInput.value));
    addressInput?.addEventListener('keydown', (e)=>{
        const items = suggestions.getElementsByTagName('div');
        if(!items || items.length===0) return;
        if(e.key==='ArrowDown'){ currentFocus++; addActive(items); e.preventDefault(); }
        else if(e.key==='ArrowUp'){ currentFocus--; addActive(items); e.preventDefault(); }
        else if(e.key==='Enter'){ e.preventDefault(); if(currentFocus>-1 && items[currentFocus]) items[currentFocus].click(); }
        else if(e.key==='Escape'){ hideSuggestions(); }
    });

    dropdownBtn?.addEventListener('click', ()=>{ 
        if(suggestions.style.display==='block') hideSuggestions(); 
        else{ showSuggestions(); addressInput.focus(); }
    });

    applicantModalEl.addEventListener('hidden.bs.modal', hideSuggestions);

    // -------------------------------
    // FORM SUBMISSION
    // -------------------------------
    applicantForm?.addEventListener('submit', async (e)=>{
        e.preventDefault();

        if(!validateNameFields()){ alert("Please fix the fields highlighted in red."); return; }
        if(!validateAgeField()){ alert("Please enter a valid age."); return; }
        if(!validateSelectFields()){ alert("Please select Sex, Status, and Applicant Type."); return; }

        const formData = new FormData(applicantForm);

        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const fullName = `${firstName} ${lastName}`;

        // Map frontend input IDs to backend keys
        formData.set('first_name', firstName);
        formData.set('middle_name', document.getElementById('middlename').value);
        formData.set('last_name', lastName);
        formData.set('extra_name', document.getElementById('extraname').value);
        formData.set('marital_status', document.getElementById('status').value);
        formData.set('applicant_type', document.getElementById('applicantType').value);
        formData.set('age', document.getElementById('age').value);
        formData.set('sex', document.getElementById('sex').value);
        formData.set('birthdate', document.getElementById('birthdate').value);
        formData.set('address', document.getElementById('address').value);

        if(!currentApplicantId){
            formData.set('username', usernameInput.value);
            formData.set('password', passwordInput.value);
        }
        if(photoInput.files[0]) formData.set('applicant_photo', photoInput.files[0]);

        const method = currentApplicantId ? 'PUT' : 'POST';
        const url = currentApplicantId ? `/api/applicants/${currentApplicantId}` : `/api/applicants/create`;

        if(method==='PUT'){ formData.delete('username'); formData.delete('password'); }

        try{
            const res = await fetch(url, { method, body: formData });
            if(!res.ok) throw new Error(`Server error ${res.status}`);
            applicantModal.hide();
            fetchApplicants();
            showMessage(currentApplicantId ? `Applicant "${fullName}" updated successfully!` : `Applicant "${fullName}" added successfully!`);
        }catch(err){
            console.error(err);
            alert('Failed to submit applicant. Applicant may already exist or photo upload failed.');
        }
    });

    // -------------------------------
    // FETCH, EDIT, DELETE FUNCTIONS
    // -------------------------------
    async function fetchApplicants(){
        tableBody.innerHTML = '<tr><td colspan="9">Loading...</td></tr>';
        try{
            const res = await fetch('/api/applicants');
            if(!res.ok) throw new Error(`HTTP ${res.status}`);
            const applicants = await res.json();
            tableBody.innerHTML = applicants.length===0 ? '<tr><td colspan="9" class="text-center">No applicants found.</td></tr>' : '';
            applicants.forEach((a,i)=>{
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="text-center">${i+1}</td>
                    <td>${a.firstname} ${a.middlename||''} ${a.lastname} ${a.extraname||''}</td>
                    <td>${a.age}</td>
                    <td>${a.sex}</td>
                    <td>${a.birthdate ? new Date(a.birthdate).toLocaleDateString() : ''}</td>
                    <td>${a.address}</td>
                    <td>${a.status}</td>
                    <td>${a.applicantType}</td>
                    <td class="text-end">
                        <button class="btn btn-link btn-sm text-info" data-action="view" data-id="${a.id}"><i class="material-icons">person</i></button>
                        <button class="btn btn-link btn-sm text-success" data-action="edit" data-id="${a.id}"><i class="material-icons">edit</i></button>
                        <button class="btn btn-link btn-sm text-danger" data-action="delete" data-id="${a.id}"><i class="material-icons">close</i></button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });

            tableBody.querySelectorAll('button[data-action]').forEach(btn=>{
                btn.addEventListener('click', ()=>{
                    const action = btn.dataset.action;
                    const id = btn.dataset.id;
                    if(action==='edit') editApplicant(id);
                    else if(action==='delete') deleteApplicant(id);
                });
            });
        }catch(err){
            console.error(err);
            tableBody.innerHTML='<tr><td colspan="9">Failed to load applicants.</td></tr>';
        }
    }

    function setInputValue(id,value){ const el=document.getElementById(id); if(el) el.value=value||''; }

    async function editApplicant(id){
        try{
            const res = await fetch(`/api/applicants/${id}`);
            if(!res.ok) throw new Error(`HTTP ${res.status}`);
            const a = await res.json();
            currentApplicantId = id;
            modalTitle.textContent = `Edit Applicant #${id}`;
            submitBtn.textContent = 'Save Changes';
            setInputValue('firstname', a.first_name);
            setInputValue('middlename', a.middle_name);
            setInputValue('lastname', a.last_name);
            setInputValue('extraname', a.extra_name);
            setInputValue('age', a.age);
            setInputValue('sex', a.sex);
            setInputValue('birthdate', a.birthdate ? new Date(a.birthdate).toISOString().substring(0,10) : '');
            setInputValue('address', a.address);
            setInputValue('status', a.marital_status);
            setInputValue('applicantType', a.applicant_type);
            photoPreview.style.display='none';
            applicantModal.show();
        }catch(err){ console.error(err); alert('Failed to load applicant for editing.'); }
    }

    async function deleteApplicant(id){
        try{
            const resGet = await fetch(`/api/applicants/${id}`);
            if(!resGet.ok) throw new Error(`HTTP ${resGet.status}`);
            const applicant = await resGet.json();
            const fullName = `${applicant.first_name} ${applicant.last_name}`;
            if(!confirm(`Delete applicant "${fullName}"?`)) return;

            const resDelete = await fetch(`/api/applicants/${id}`, { method:'DELETE' });
            if(!resDelete.ok) throw new Error(`HTTP ${resDelete.status}`);
            fetchApplicants();
            showMessage(`Applicant "${fullName}" deleted successfully!`, 'danger');
        }catch(err){ 
            console.error(err); 
            alert('Failed to delete applicant.'); 
        }
    }

    fetchApplicants();
};
