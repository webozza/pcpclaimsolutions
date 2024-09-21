jQuery(document).ready(function ($) {
  // Use delegated event handling for dynamically added elements
  $(document).on("click", ".view-more", function () {
    var entryId = $(this).data("id");
    $.ajax({
      url: ajaxurl,
      type: "POST",
      data: {
        action: "pcp_get_entry_details", // Matches PHP action
        entry_id: entryId,
      },
      success: function (response) {
        if (response.success) {
          $("#pcp-modal-body").html(response.data.html); // Ensure correct modal ID
          $("#pcp-details-modal").show(); // Ensure correct modal ID
        } else {
          alert("Failed to load details.");
        }
      },
      error: function () {
        alert("An error occurred while fetching entry details.");
      },
    });
  });

  // Delete entry functionality
  $(document).on("click", ".delete-entry", function () {
    if (confirm("Are you sure you want to delete this entry?")) {
      var entryId = $(this).data("id");
      $.ajax({
        url: ajaxurl,
        type: "POST",
        data: {
          action: "pcp_delete_entry", // Matches PHP action
          entry_id: entryId,
        },
        success: function (response) {
          if (response.success) {
            location.reload(); // Reload after successful delete
          } else {
            alert("Failed to delete entry.");
          }
        },
        error: function () {
          alert("An error occurred while deleting the entry.");
        },
      });
    }
  });

  // Close modal event
  $(document).on("click", "#pcp-close-modal", function () {
    $("#pcp-details-modal").hide();
  });
});
