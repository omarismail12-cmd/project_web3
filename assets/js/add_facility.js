document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('addFacilityModal');
    const openBtn = document.getElementById('openAddFacility');
    const closeBtn = document.getElementById('closeAddFacility');
    const form = document.getElementById('facilityForm');
    const msgDiv = document.getElementById('addFacilityMsg');

    if (openBtn) {
        openBtn.onclick = () => { modal.style.display = 'block'; msgDiv.innerHTML = ""; };
    }
    if (closeBtn) {
        closeBtn.onclick = () => { modal.style.display = 'none'; form.reset(); msgDiv.innerHTML = ""; };
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none'; form.reset(); msgDiv.innerHTML = "";
        }
    };

    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            msgDiv.innerHTML = "Adding facility...";
            const formData = new FormData(form);

            fetch('../api/add_facility.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    msgDiv.style.color = "green";
                    msgDiv.innerHTML = "Facility added successfully!";
                    form.reset();
                    setTimeout(() => { modal.style.display = 'none'; msgDiv.innerHTML = ""; }, 1200);
                    // Optionally refresh facilities list
                } else {
                    msgDiv.style.color = "red";
                    msgDiv.innerHTML = data.message || "Error adding facility.";
                }
            })
            .catch(() => {
                msgDiv.style.color = "red";
                msgDiv.innerHTML = "Server error.";
            });
        };
    }
});
