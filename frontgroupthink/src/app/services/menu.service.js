(function(){

  'use strict';

  angular.module('common.services')
    .factory('menu', [
      '$location',
      '$rootScope',
      function ($location) {

        var sections = [{
          name: 'Author',
          state: 'home.Author',
          type: 'link'
        }];

        sections.push({
          name: 'Author',
          type: 'toggle',
          pages: [{
            name: 'Add Vignette',
            type: 'link',
            state: 'home.author.add',
            icon: 'fa fa-group'
          }, {
            name: 'Manage Vignettes',
            state: 'home.author.manage',
            type: 'link',
            icon: 'fa fa-map-marker'
          },
            {
              name: 'View Map',
              state: 'home.author.map',
              type: 'link',
              icon: 'fa fa-plus'
            }]
        });

        sections.push({
          name: 'Reader',
          type: 'toggle',
          pages: [{
            name: 'Narrative',
            type: 'link',
            state: 'reader.narrative',
            icon: 'fa fa-group'
          }, {
            name: 'Map',
            state: 'reader.map',
            type: 'link',
            icon: 'fa fa-map-marker'
          },
            
        });

        var self;

        return self = {
          sections: sections,

          toggleSelectSection: function (section) {
            self.openedSection = (self.openedSection === section ? null : section);
          },
          isSectionSelected: function (section) {
            return self.openedSection === section;
          },

          selectPage: function (section, page) {
            page && page.url && $location.path(page.url);
            self.currentSection = section;
            self.currentPage = page;
          }
        };

        function sortByHumanName(a, b) {
          return (a.humanName < b.humanName) ? -1 :
            (a.humanName > b.humanName) ? 1 : 0;
        }

      }])

})();
