$(document).ready(function() {
    $.fn.sudoku = function() {
        var this_ = $(this);
        var size = 9;
        var minIndex = 0;
        var maxIndex = size - 1 + minIndex;
        var xDigits = initNumbers(size);
        var cells = initCells(size);
        var done = []; // saves cell index as one-d array
        var left = []; // saves cell index as one-d array
        var curCell = [0,0];
        
        init();
        build();
        //output();
        function build() {
            var c = chooseCell();
            console.log(c);
            var n = 0;
            for (var i = 0; i < size; i++) {
//                n = xDigits[i];
//                if (!conflict()) {
//                    done.push()
//                }
            }
        }
        
        function conlict(c_2d) {
            var row = function() {
                for (var i = 0; i < size; i++) {
                    
                }
            }
        }
        
        function init() {
            var max1dIndex = size * size - 1;
            for (var i = 0; i <= max1dIndex; i++) {
                left.push(i);
            }
        }
    
        function initCells(size) {
            var _cells = [];
            
            for (var i = 0; i < size; i++) {
                var row = [];
                for (var j = 0; j < size; j++) {
                    row.push(0);
                }
                _cells.push(row);
            }
            
            return _cells;
        }
        
        function initNumbers(size) {
            var _arr = [];
            for (var i = 1; i <= size; i++) {
                _arr.push(i);
            }
            return _arr;
        }
        
        function output() {
            this_.html('');
            for (var i = 0; i < size; i++) {
                var row = '';
                for (var j = 0; j < size; j++) {
                    row += '  ' + cells[i][j];
                }
                row += '<br>';
                this_.append(row);
            }
        }
        
        function rand(min,max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
        
        function moveNext() {
            if (curCell[1] == maxIndex) {
                curCell[0] = curCell[0] + 1;
                curCell[1] = 0;
            } else {
                curCell[1] = curCell[0] + 1;
            }
        }
        
        function movePrev() {
            if (curCell[1] == minIndex) {
                curCell[0] = curCell[0] - 1;
                curCell[1] = maxIndex;
            } else {
                curCell[1] = curCell[0] - 1;
            }
        }
        
        function get2DIndex(oneDIndex) {
             var rw_ = Math.floor(oneDIndex / size);
             var cl_ = oneDIndex % size;
             
             return [rw_, cl_];
        }
        
        function chooseCell() {
            var c_1d = rand(0, (left.length - 1));
            var c_2d = get2DIndex(c_1d);
            return {c_1d : c_1d, c_2d:c_2d};
        }
    }
});


