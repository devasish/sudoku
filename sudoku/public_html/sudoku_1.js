var STOP_S = 0;
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
        var avail = [];
        var ignore = [];
        var curCell = [0,0];
        var stack = [];
        var conflictedWithCell = 0;
        
        init();
        //build();
        while(left.length > 0 && STOP_S == 0) {
            build();
            //output();
        }
        output();
        
        
        function build() {
            var c = chooseCell();
            var n = 0;
            var success = false;
            
            curCell[0] = c.c_2d[0];
            curCell[1] = c.c_2d[1];
            
            var doneIndex = $.inArray(c.c_1d, done);
            var leftIndex = $.inArray(c.c_1d, left);;
            var inDone = doneIndex > -1 ? true : false;
            var inLeft = leftIndex > -1 ? true : false;
            var curCellVal = 0;
            if (inDone) {
                curCellVal = cells[c.c_2d[0]][c.c_2d[1]];
                cells[c.c_2d[0]][c.c_2d[1]] = 0;
                done.splice(doneIndex, 1);
                left.push(c.c_1d)
            }
            for (var i = 0; i < size; i++) {
                n = xDigits[i];
                
                if (curCellVal == n) {
                    //console.log('----------');
                    continue;
                }
                
                if (!conflict(c.c_2d, n)) {
                    if (success === false) {
                        done.push(c.c_1d);
                        left.splice(c.c_1d, 1);
//                        if (!inDone) {
//                            done.push(c.c_1d);
//                        }
//                        if (inLeft) {
//                            left.splice(c.c_1d, 1);
//                        }
                        cells[c.c_2d[0]][c.c_2d[1]] = n;
                        //stack.pop();
                        success = true;
                    } else {
                        avail[c.c_1d].push(n);
                    }
                    //break;
                }
            }
            
            if (success === false) {
                stack.push(c.c_1d);
                backtrack();
            }
            
            //console.log( ' ->'+ left.length);
            //log();
//            if (left.length > 0 && STOP_S == 0) {
//                build();
//            }
        }
        
        function conflict(c_2d, n_) {
            var rowFlag = false;
            var colFlag = false;
//            console.log(done.length);
//            console.log(left.length);
//            console.log(c_2d);
//            console.log(cells[c_2d[0]]);
            var rowWise = function() {
                for (var j = 0; j < size; j++) {
                    if (cells[j][c_2d[1]] == n_) {
                        conflictedWithCell = get1DIndex([j,c_2d[1]]);
                        rowFlag = true;
                        break;
                    }
                }
            }
            
            var colWise = function() {
                for (var j = 0; j < size; j++) {
                    if (cells[c_2d[0]][j] == n_) {
                        conflictedWithCell = get1DIndex([c_2d[0], j]);
                        colFlag = true;
                        break;
                    }
                }
            }
            ///console.log("[CON = " + conflictedWithCell);
            rowWise();
            if (!rowFlag) {
                colWise();
            }
            
            return (rowFlag || colFlag);
        }
        
        function backtrack() {
            //stack.push(conflictedWithCell);
            if (conflictedWithCell >= 0) {
                stack.push(conflictedWithCell);
            }
            else {
                stack.push(done[done.length - 1]);
            } 
                
            //console.log('Conflicted With Cell - ' + conflictedWithCell);
            
//            var doneLastCell = done[done.length - 1];
//            
//            left.push(doneLastCell);
//            done.splice((done.length - 1), 1);
//            
//            var twod = get2DIndex(doneLastCell);
//            cells[twod[0]][twod[1]] = 0;
            
//            console.log('=====================');
//            console.log(doneLastCell);
//            console.log(twod);
//            console.log(left.length);
//            console.log(done.length);
            
        }
        
        function init() {
            var max1dIndex = size * size - 1;
            for (var i = 0; i <= max1dIndex; i++) {
                left.push(i);
                ignore.push(0);
                avail.push([]);
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
            console.log('output');
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
        
        function log() {
            console.log(stack);
            console.info("output \n");
            for (var i = 0; i < size; i++) {
                var row = '';
                for (var j = 0; j < size; j++) {
                    row += '  ' + cells[i][j];
                }
                console.log(row);
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
        
        function get1DIndex(twoDIndex) {
            
        }
        
        function chooseCell() {
            var c_1d = 0;
            if (stack.length > 0) {
                c_1d = stack[(stack.length - 1)];
                stack.pop();
            } else {
                c_1d = rand(0, (left.length - 1));
            }
            var c_2d = get2DIndex(c_1d);
            return {c_1d : c_1d, c_2d:c_2d};
        }
    }
});
