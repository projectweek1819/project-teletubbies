// Schrijf hier je code
function onMouseDown(count, args){
    return count + 1;
}

function onMouseDown2(state, args){
    return {count: state.count+1};
}

function counter3(){
    function onMouseDown(state, args){
        return {count: state.count+1};
    }
    return {controller: { onMouseDown }};
}

function counter4(){
    function onMouseDown(state, args){
        return {count: state.count+1};
    }
    function onKeyDown(state, args){
        return {count:0};
    }
    return {controller: { onMouseDown, onKeyDown }};
}

function counter5(){
    function onMouseDown(state, args){
        if(args.shift) {
            if (state.count === 0) return {count:0};
            else return {count: state.count-1};
        }
        else return {count: state.count+1};
    }
    function onKeyDown(state, args){
        if (args.key === "0") return {count:0};
        else if(args.key === "ArrowUp" || args.key === " ") return {count: state.count+1};
        else if(args.key === "ArrowDown"){
            if (state.count === 0) return {count:0};
            else return {count: state.count-1};
        }
        else return {count: state.count};
    }
    return {controller: { onMouseDown, onKeyDown }};
}

function counter6(){
    function increment(state){
        return {count: state.count+1};
    }
    function decrement(state){
        if (state.count === 0) return {count:0};
        else return {count: state.count-1};
    }
    function reset(state){
        return {count:0};
    }
    function onMouseDown(state, args){
        if(args.shift) {
            return decrement(state);
        }
        else return increment(state);
    }
    function onKeyDown(state, args){
        if (args.key === "0") return reset(state);
        else if(args.key === "ArrowUp" || args.key === " ") return increment(state);
        else if(args.key === "ArrowDown"){
            return decrement(state);
        }
        else return {count: state.count};
    }
    return {controller: {onMouseDown, onKeyDown}, model: {increment, decrement, reset}};
}

function counter7(){
    function add(state, amount){
        if ((state.count + amount) <= 0) return {count:0};
        else return {count: state.count + amount};
    }
    function reset(state){
        return {count:0};
    }
    function onMouseDown(state, args){
        if(args.shift) {
            if (args.ctrl) return add(state, -5);
            else return add(state, -1);
        }
        else if (args.ctrl) return add(state, 5);
        else return add(state, 1);
    }
    function onKeyDown(state, args){
        if (args.key === "0") return reset(state);
        else if(args.key === "ArrowUp" || args.key === " ") {
            if (args.ctrl) return add(state, 5);
            else return add(state, 1);
        }
        else if(args.key === "ArrowDown"){
            if (args.ctrl) return add(state, -5);
            else return add(state, -1);
        }
        else return {count: state.count};
    }
    return {controller: {onMouseDown, onKeyDown}, model: {add, reset}};
}

function chronometer(){
    function timePassed(state, dt){
        return {elapsedTime: state.elapsedTime + dt}
    }
    function onTimerTick(state, dt){
        return timePassed(state, dt)
    }
    return {controller: {onTimerTick}, model: {timePassed}}
}

function chronometer2(){
    function timePassed(state, dt){
        if (state.active) return {elapsedTime: state.elapsedTime + dt, active:  state.active};
        else return {elapsedTime: state.elapsedTime, active:  state.active};
    }
    function toggle(state){
        return {elapsedTime: state.elapsedTime, active:  !state.active};
    }
    function onTimerTick(state, dt){
        return timePassed(state, dt)
    }
    function reset(state){
        return {elapsedTime: state.elapsedTime=0 , active: state.active};
    }
    function onKeyDown(state, args){
        if (args.key === "0") return reset(state);
        else if(args.key === " ") return toggle(state);
    }
    return {controller: {onTimerTick, onKeyDown}, model: {timePassed, toggle, reset}}
}

function circle(){
    function render(state){
        return [{type: "circle", center: {x: 100, y: 100}, radius: 10, color: "red"}];
    }
    return {view: {render}};
}

function circle2(){
    function moveTo(state, position){
        return {position: position};
    }
    function onMouseDown(state, args) {
        return moveTo(state, args.position);
    }
    function render(state){
        return [{type: "circle", center: {x: state.position.x, y: state.position.y}, radius: 10, color: "red"}];
    }
    return {view: {render}, controller: {onMouseDown}, model: {moveTo}};
}

function circle3() {
    function moveTo(state, position){
        return {position: position};
    }
    function onMouseMove(state, args) {
        return moveTo(state, args.position);
    }
    function render(state){
        return [{type: "circle", center: {x: state.position.x, y: state.position.y}, radius: 10, color: "red"}];
    }
    return{view: {render}, controller: {onMouseMove}, model: {moveTo}};
}

function drawing(){
    function moveTo(state, position){
        let dots = new Array();
        if(state.dots === null){state.dots = new Array();}
        for (let k in state.dots) {
            dots.push(state.dots[k]);
        }
        if (state.addMode){
            dots.push({x: position.x, y: position.y});
            return {position: position, dots: dots, addMode: state.addMode}
        }
        else return {position: position, dots: state.dots, addMode: state.addMode};
    }
    function setAddMode(state, addMode){
        return {position: state.position, dots: state.dots, addMode: addMode};
    }
    function onMouseMove(state, args) {
        return moveTo(state, args.position);
    }
    function onMouseDown(state, args){
        return setAddMode(state, true);
    }
    function onMouseUp(state, args) {
        return setAddMode(state, false);
    }
    function render(state) {
        if(state.addMode){return [{type: "circle", center: {x:  state.position.x, y: state.position.y},radius: 2, color:  "red"}]}

        let result = Array();
        for (let i = 0; i < state.dots.length; i++) {
            result.push({type: "circle", center: {x:  state.dots[i].x, y: state.dots[i].y},radius: 2, color:  "green"});

        }
        result.push({type: "circle", center: {x:  state.position.x, y: state.position.y},radius: 5, color:  "red"});
        return result;
    }
    return {view: {render}, controller: {onMouseMove, onMouseDown, onMouseUp}, model: {moveTo, setAddMode}};
}

function random() {
    function throwDie(state){
        let rng = (4578 * state.rng ** 2 - 976161 * state.rng + 6156489) % 79729693;;
        let dieValue = rng%6 + 1;
        return {rng: rng, dieValue: dieValue};
    }
    function onKeyDown(state, args) {
        if (args.key === " "){
            return throwDie(state)
        }
    }
    function render(state){
        return [{type: "text", position: {x: 50, y: 50}, string: state.dieValue.toString()}];
    }
    return {view: {render}, controller: {onKeyDown}, model: {throwDie}};
}

function random2(){
    function nextRandom(n) {
        return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
    }
    function throwDie(state){
        let rng = (4578 * state.rng ** 2 - 976161 * state.rng + 6156489) % 79729693;;
        let dieValue = rng%6 + 1;
        return [dieValue, {rng: rng, grade: state.grade}];
    }
    function generateGrade(state){
        let dieThrows = throwDie(state)[0];
        dieThrows += throwDie(state)[0];
        dieThrows += throwDie(state)[0];
        return {rng: state.rng, grade: dieThrows};
    }
    return {model: {nextRandom, throwDie, generateGrade}}
}