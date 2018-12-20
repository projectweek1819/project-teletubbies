function onMouseDown(count, args) {
    return count + 1;
}

function onMouseDown2(state, args) {
return{count:state.count +1};
}

function counter3() {
    function onMouseDown(state, args) {
      return{count:state.count +1};
    }
    return { controller: { onMouseDown } };
}

function counter4() {
  function onMouseDown(state, args) {
    return{count:state.count +1};
  }
    function onKeyDown(state, args) {
      return{count:0};
    }

    return {controller:{onMouseDown, onKeyDown}};
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
		console.log(state);
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
	function reset(state){
		return {count:0};
	}

  function onMouseDown(state, args){
  		if(args.shift){
  			if(args.ctrl){
  				return add(state, -5);
  			}
  			else{
  				return add(state, -1);
  			}
  		}
  		else if(args.ctrl){
  			return add(state, 5);
  		}
  		else{
  			return add(state, 1);
  		}
  	}

  function add(state, amount){
    if((state.count + amount) <= 0 ){
      return {count: 0};
    }
    else {
      return{count: state.count + amount};
    }
  }

  function onKeyDown(state, args){
		if (args.key === "0") return reset(state);
		else if(args.key === "ArrowUp" && args.ctrl || args.key === " " && args.ctrl) return add(state, 5);
		else if(args.key === "ArrowUp" || args.key === " ") return add(state, 1);
		else if(args.key === "ArrowDown"){
			if(args.ctrl){
				return add(state, -5);
			}
			else{
				return add(state, -1);
			}
		}
		else return {count: state.count};
	}
	return {controller: {onMouseDown, onKeyDown}, model: {add, reset}};
}

function chronometer(){
  function timePassed(state, dt){
    return{elapsedTime: state.elapsedTime + dt}
  }
  function onTimerTick(state,dt){
    return{elapsedTime: state.elapsedTime + dt}
  }
  return{model: {timePassed}, controller: {onTimerTick}}
}

function circle(){
  function render(state){
    return [{type: "circle", center: {x: 100, y: 100}, radius: 10, color: "red"}];
  }
  return{view: {render}}
}

function chronometer2() {
    function timePassed({elapsedTime, active}, amount) {
        if (active) {
            elapsedTime += amount;
        }
        return {elapsedTime, active};
    }

    function reset({elapsedTime, active}) {
        elapsedTime = 0;
        return {elapsedTime, active};
    }

    function toggle({elapsedTime, active}) {
        active = !active;
        return {elapsedTime, active};
    }

    function onKeyDown(state, args) {
        if (args.key === " ") {
            return model.toggle(state);
        }
        else if (args.key === "0") {
            return model.reset(state);
        }
    }

    function onTimerTick(state, dt) {
        return model.timePassed(state, dt);
    }
    const model = {timePassed, toggle, reset}
    const controller = {onTimerTick, onKeyDown}
    return {model, controller};
}

function circle2(){
  function render(state){
    return [{type: "circle", center: state.position, radius: 10, color: "red"}];
  }
  function moveTo(state, position){
		return {position: position};
	}
  function onMouseDown(state, args){
		return moveTo(state, args.position);
	}
  return{view: {render}, model: {moveTo}, controller: {onMouseDown}}
}

function circle3(){
  function render(state){
    return [{type: "circle", center: state.position, radius: 10, color: "red"}];
  }
  function moveTo(state, position){
		return {position: position};
	}
  function onMouseMove(state, args){
		return moveTo(state, args.position);
	}
  return{view: {render}, model: {moveTo}, controller: {onMouseMove}}
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

function random2() {
    const model = (() => {
        function nextRandom(n) {
            return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
        }
        function throwDie(state) {
            const value = nextRandom(state.rng);
            return [value % 6 + 1, { ...state, rng: value }];
        }
        function generateGrade(state) {
            const [a, state2] = throwDie(state);
            const [b, state3] = throwDie(state2);
            const [c, state4] = throwDie(state3);
            return { ...state4, grade: a + b + c };
        }
        return { nextRandom, throwDie, generateGrade };})();
    const controller = (() => {
        function onKeyDown(state, args) {
            return model.generateGrade(state);
        }
        return { onKeyDown };})();
    const view = (() => {
        function render(state) {
            return [{ type: 'text', position: { x: 50, y: 50 }, string: state.grade.toString() }];
        }
        return { render };})();
    return { model, view, controller };
}
