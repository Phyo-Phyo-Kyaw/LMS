function openModal(bookID, bookName, bookAuthor, bookPages, bookPrice) {
    // Set form action and input values dynamically
    $('#updateForm').attr('action', '/update/' + bookID);
    $('#bookID').val(bookID);
    $('#bookName').val(bookName);
    $('#bookAuthor').val(bookAuthor);
    $('#bookPages').val(bookPages);
    $('#bookPrice').val(bookPrice);

    // Show the modal
    $('#updateModal').modal('show');
}

// Close the modal on clicking the 'Close' button or outside the modal
$('#updateModal').on('hidden.bs.modal', function () {
    $('#updateForm')[0].reset();
});