function openModal(bookID, bookName, bookAuthor, bookPages, bookPrice) {
	const form = $('#updateForm');
	// Set form action
	form.attr('action', `/admin/book/update/${bookID}`);
		
	// Populate form fields
	$('#bookID').val(bookID);
	$('#bookName').val(bookName).trigger('input');
	$('#bookAuthor').val(bookAuthor).trigger('input');
	$('#bookPages').val(bookPages).trigger('input');
	$('#bookPrice').val(bookPrice).trigger('input');

	// Initialize Bootstrap validation
	form.removeClass('was-validated');
		
	// Show modal
	new bootstrap.Modal('#updateModal').show();
}

$('#updateModal').on('hidden.bs.modal', function () {
	$('#updateForm')[0].reset();
	$('#updateForm').removeClass('was-validated');
});

// Form validation
document.getElementById('updateForm').addEventListener('submit', function(event) {
	if (!this.checkValidity()) {
		event.preventDefault();
		event.stopPropagation();
		$(this).addClass('was-validated');
	}
}, false);

// Delete Confirmation Modal Handler (jQuery version)
$('#deleteBookModal').on('show.bs.modal', function(event) {
	const button = $(event.relatedTarget);
	const bookID = button.data('book-id');
	const bookName = button.data('book-name');
		
	const modal = $(this);
	modal.find('#bookTitle').text(bookName);
	modal.find('#deleteForm').attr('action', `/admin/book/delete/${bookID}`);
});

// AJAX Delete Handling (jQuery version)
$('#deleteForm').on('submit', function(e) {
	e.preventDefault();
	const form = $(this);
	$.ajax({
		url: form.attr('action'),
		method: 'get',
		success: function(response) {
			$('#deleteBookModal').modal('hide');
			Swal.fire({
				icon: 'success',
				title: 'Book Deleted',
				text: 'The book has been successfully deleted.',
				showConfirmButton: false,
				timer: 1500
			});
			setTimeout(() => {
				location.reload();
			}, 1500);
		},
		error: function(xhr) {
			console.error('Error:', xhr.responseText);
			alert('Error deleting book. Please try again.');
		}
	});
});