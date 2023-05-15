var profilesKey = 'profiles';

(function ($) {
  'use strict';

  var profiles = $.jStorage.get(profilesKey, {});

  // Get current active tab
  function initializeProfile(profile_name) {
    if (!('current_tab' in profiles[profilesKey][profile_name]))
      profiles[profilesKey][profile_name].current_tab = '#tabPV';
  }

  // Restore all saved state
  function restoreState(profile_name) {
    $('a[href$="_col"]').each(function () {
      var value = profiles[profilesKey][profile_name].collapsed[$(this).attr('href')];
      var active = $(this).hasClass('collapsed');
    });
  }

  // Search and highlight functionality
  $(function () {
    var jets = [new Jets({
      searchTag: '#pv_search',
      contentTag: '#pv_list ul'
    }), new Jets({
      searchTag: '#mc_search',
      contentTag: '#mc_list ul'
    }), new Jets({
      searchTag: '#hmc_search',
      contentTag: '#hmc_list ul'
    })];

    $('#pv_search').keyup(function () {
      $('#pv_list').unhighlight();
      $('#pv_list').highlight($(this).val());
    });
    $('#mc_search').keyup(function () {
      $('#mc_list').unhighlight();
      $('#mc_list').highlight($(this).val());
    });
    $('#hmc_search').keyup(function () {
      $('#hmc_list').unhighlight();
      $('#hmc_list').highlight($(this).val());
    });
  });

  // Back to top functionality
  $(function () {
    var offset = 220;
    var duration = 500;
    $(window).scroll(function () {
      if ($(this).scrollTop() > offset) {
        $('.fadingbutton').fadeIn(duration);
      } else {
        $('.fadingbutton').fadeOut(duration);
      }
    });

    $('.back-to-top').click(function (event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, duration);
      return false;
    });
  });

  // Restore tabs/hidden sections functionality
  $(function () {
    restoreState(profiles.current);
    if (profiles[profilesKey][profiles.current].current_tab) {
      $('.nav.navbar-nav li a[href="' + profiles[profilesKey][profiles.current].current_tab + '"]').click();
    }
    $('.nav.navbar-nav li a').on('click', function (el) {
      profiles[profilesKey][profiles.current].current_tab = $(this).attr('href');
      $.jStorage.set(profilesKey, profiles);
    });
  });
})(jQuery);