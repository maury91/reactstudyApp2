function getTimers(opts) {
  $.ajax({ // eslint-disable-line no-undef
    url: '/api/timers',
    data: null,
    method: 'get',
    dataType: 'json',
    cache: false,
    success: opts.success,
    error: function (xhr, status, err) {
      console.error('GET /api/timers', status, err.toString()); // eslint-disable-line no-console
    },
  });
}

function createTimer(opts) {
  $.ajax({ // eslint-disable-line no-undef
    url: '/api/timers',
    data: opts.data,
    method: 'post',
    dataType: 'json',
    cache: false,
    success: opts.success,
    error: function (xhr, status, err) {
      console.error('POST /api/timers', status, err.toString()); // eslint-disable-line no-console
    },
  });
}

function updateTimer(opts) {
  $.ajax({ // eslint-disable-line no-undef
    url: '/api/timers',
    data: opts.data,
    method: 'put',
    dataType: 'json',
    cache: false,
    success: opts.success,
    error: function (xhr, status, err) {
      console.error('PUT /api/timers', status, err.toString()); // eslint-disable-line no-console
    },
  });
}

function startTimer(opts) {
  $.ajax({ // eslint-disable-line no-undef
    url: '/api/timers/start',
    data: opts.data,
    method: 'post',
    dataType: 'json',
    cache: false,
    success: opts.success,
    error: function (xhr, status, err) {
      console.error('POST /api/timers/start', status, err.toString()); // eslint-disable-line no-console
    },
  });
}

function stopTimer(opts) {
  $.ajax({ // eslint-disable-line no-undef
    url: '/api/timers/stop',
    data: opts.data,
    method: 'post',
    dataType: 'json',
    cache: false,
    success: opts.success,
    error: function (xhr, status, err) {
      console.error('POST /api/timers/stop', status, err.toString()); // eslint-disable-line no-console
    },
  });
}

function deleteTimer(opts) {
  $.ajax({ // eslint-disable-line no-undef
    url: '/api/timers',
    method: 'delete',
    data: opts.data,
    dataType: 'json',
    cache: false,
    success: opts.success,
    error: function (xhr, status, err) {
      console.error('DELETE /api/timers', status, err.toString()); // eslint-disable-line no-console
    },
  });
}

export default {
  getTimers: getTimers,
  createTimer: createTimer,
  updateTimer: updateTimer,
  startTimer: startTimer,
  stopTimer: stopTimer,
  deleteTimer: deleteTimer
};
