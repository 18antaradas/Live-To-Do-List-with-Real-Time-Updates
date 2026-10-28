$(document).ready(function () {

  /* --------------------------------------------------------
     UTILITY FUNCTIONS
  -------------------------------------------------------- */

  function showToast(msg) {
    $('#toast').text(msg).addClass('show');
    setTimeout(() => $('#toast').removeClass('show'), 2200);
  }

  function timeNow() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function updateStats() {
    const total   = $('#taskList li.task-item').length;
    const done    = $('#taskList li.task-item.completed-item').length;
    const pending = total - done;

    $('#totalCount').text(total);
    $('#pendingCount').text(pending);
    $('#doneCount').text(done);

    if (total === 0 && $('#taskList .empty-state').length === 0) {
      $('#taskList').append(`
        <li class="empty-state">
          <span class="icon">🎉</span>
          All done! Add more tasks above.
        </li>`);
    } else if (total > 0) {
      $('#taskList .empty-state').remove();
    }
  }

  /* --------------------------------------------------------
     1. ADD TASK
  -------------------------------------------------------- */
  function addTask() {
    let taskText = $('#taskInput').val().trim();

    if (taskText === '') {
      showToast('⚠️ Please enter a task!');
      return;
    }

    let priority      = $('#prioritySelect').val();
    let badgeClass    = 'badge-' + priority;
    let priorityLabel = priority.charAt(0).toUpperCase() + priority.slice(1);
    let time          = timeNow();

    let taskItem = `
      <li class="task-item priority-${priority}" data-priority="${priority}">
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${$('<div>').text(taskText).html()}</span>
        <span class="priority-badge ${badgeClass}">${priorityLabel}</span>
        <span class="task-time">${time}</span>
        <div class="actions">
          <button class="btn-edit">✏️</button>
          <button class="btn-delete">🗑️</button>
        </div>
      </li>`;

    $('#taskList').append(taskItem);
    $('#taskInput').val('').focus();
    showToast('✅ Task added!');
    updateStats();
    applyFilter($('.filter-btn.active').data('filter'));
  }

  $('#addTask').click(addTask);
  $('#taskInput').keypress(e => { if (e.which === 13) addTask(); });

  /* --------------------------------------------------------
     2. MARK COMPLETE / UNDO
  -------------------------------------------------------- */
  $(document).on('change', '.task-checkbox', function () {
    let li       = $(this).closest('li');
    let textSpan = li.find('.task-text');

    if ($(this).is(':checked')) {
      textSpan.addClass('completed');
      li.addClass('completed-item');
      showToast('🎉 Task completed!');
    } else {
      textSpan.removeClass('completed');
      li.removeClass('completed-item');
      showToast('↩️ Task marked pending.');
    }

    updateStats();
    applyFilter($('.filter-btn.active').data('filter'));
  });

  /* --------------------------------------------------------
     3. DELETE TASK
  -------------------------------------------------------- */
  $(document).on('click', '.btn-delete', function () {
    $(this).closest('li').fadeOut(250, function () {
      $(this).remove();
      updateStats();
      applyFilter($('.filter-btn.active').data('filter'));
    });
    showToast('🗑️ Task deleted.');
  });

  /* --------------------------------------------------------
     4. EDIT TASK
  -------------------------------------------------------- */
  $(document).on('click', '.btn-edit', function () {
    let li       = $(this).closest('li');
    let textSpan = li.find('.task-text');

    if (li.find('.edit-input').length) return;

    let currentText = textSpan.text();
    textSpan.replaceWith(
      `<input type="text" class="edit-input" value="${$('<div>').text(currentText).html()}">`
    );
    li.find('.edit-input').focus().select();
    $(this).text('💾').removeClass('btn-edit').addClass('btn-save');
  });

  /* --------------------------------------------------------
     5. SAVE EDITED TASK
  -------------------------------------------------------- */
  $(document).on('click', '.btn-save', function () {
    let li      = $(this).closest('li');
    let input   = li.find('.edit-input');
    let newText = input.val().trim();

    if (newText === '') { showToast('⚠️ Task cannot be empty!'); return; }

    input.replaceWith(`<span class="task-text">${$('<div>').text(newText).html()}</span>`);
    $(this).text('✏️').removeClass('btn-save').addClass('btn-edit');
    showToast('📝 Task updated!');
  });

  $(document).on('keypress', '.edit-input', function (e) {
    if (e.which === 13) $(this).closest('li').find('.btn-save').click();
  });

  /* --------------------------------------------------------
     6. FILTER TASKS
  -------------------------------------------------------- */
  function applyFilter(filter) {
    $('#taskList li.task-item').each(function () {
      let isCompleted = $(this).hasClass('completed-item');
      let priority    = $(this).data('priority');
      let show        = false;

      if (filter === 'all')       show = true;
      if (filter === 'pending')   show = !isCompleted;
      if (filter === 'completed') show = isCompleted;
      if (filter === 'high')      show = (priority === 'high');

      $(this).toggle(show);
    });
  }

  $(document).on('click', '.filter-btn', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    applyFilter($(this).data('filter'));
  });

  /* --------------------------------------------------------
     7. CLEAR COMPLETED
  -------------------------------------------------------- */
  $('#clearCompleted').click(function () {
    let count = $('#taskList li.completed-item').length;
    if (count === 0) { showToast('No completed tasks to clear.'); return; }

    $('#taskList li.completed-item').fadeOut(300, function () {
      $(this).remove();
      updateStats();
    });
    showToast(`🧹 Cleared ${count} completed task(s).`);
  });

  /* --------------------------------------------------------
     INITIALISE
  -------------------------------------------------------- */
  updateStats();

});