(function (){
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);
    
    function sortableDir() {
        function linkFunc(scope, element, attribute) {
            element.sortable({axis: 'y'});
        }
        return{
          link: linkFunc
        };
    }

})();