//////////////////////////////////////
// Chess clock inspired Pomodoro timer
// by Andrew Creech 2017
//////////////////////////////////////

$(document).ready(function(){
	// sounds
	var bellSound = $('#bell-sound')[0];
	var toggleSound = $('#toggle-sound')[0];
	
	// work timer variables
	var displayWorkTime = $('#work-time');
	var workTime = 25;
	var workSeconds = workTime * 60;
	var setWorkTime = $('#set-work-time');
	var workSwitch = $('#work-switch');
	
	// break timer varialbles
	var displayBreakTime = $('#break-time')
	var breakTime = 5;
	var breakSeconds = breakTime * 60;
	var setBreakTime = $('#set-break-time');
	var breakSwitch = $('#break-switch');
	
	var timer;
	
	// set default clock times
	setWorkTime.html(workTime);
	setBreakTime.html(breakTime);
	
	// increment & decrement buttons
	$('#work-decrement').click(function(){
		if(workTime > 1 ){
			workTime--;
		}
		setWorkTime.html(workTime);
		workSeconds = workTime * 60;
	});
	
	$('#work-increment').click(function(){
		if(workTime < 60 ){
			workTime++;
		}
		setWorkTime.html(workTime);
		workSeconds = workTime * 60;
	});
	
	$('#break-decrement').click(function(){
		if(breakTime > 1 ){
			breakTime--;
		}
		setBreakTime.html(breakTime);
		breakSeconds = breakTime * 60;
	});
	
		$('#break-increment').click(function(){
		if(breakTime < 60 ){
			breakTime++;
		}
		setBreakTime.html(breakTime);
		breakSeconds = breakTime * 60;
	});
	
	// startBreakTimer function
	var startBreakTimer = function(){
		breakSwitch.addClass('switch-down');
		workSwitch.removeClass('switch-down');
		var counter = 0;
		timer = setInterval(function(){
			counter++;
			displayBreakTime.html(formatTime(breakSeconds));
			if(breakSeconds < 1){
				resetTimer();
				toggleSound.play();
				bellSound.play();
				startWorkTimer();
				breakSeconds = counter;
			}
			breakSeconds--;
		},1000);
	};
	
	// startWorkTimer function
	var startWorkTimer = function(){
		workSwitch.addClass('switch-down');
		breakSwitch.removeClass('switch-down');
		var counter = 0;
		timer = setInterval(function(){
			counter++;
			displayWorkTime.html(formatTime(workSeconds));
			if(workSeconds < 1){
				resetTimer();
				toggleSound.play();
				bellSound.play();
				startBreakTimer();
				workSeconds = counter;
			}
			workSeconds--;
		},1000);
	};
	
	// Start button
	workSwitch.click(function(){
		if(timer === undefined){
			toggleSound.play();
			startWorkTimer();
		}
	});
	
	// Reset button
	breakSwitch.click(function(){
		toggleSound.play();
		breakSwitch.addClass('switch-down');
		workSwitch.removeClass('switch-down');
		resetTimer();
		displayWorkTime.html("00:00");
		displayBreakTime.html("00:00");
		breakSeconds = breakTime * 60;
		workSeconds = workTime * 60;
		
	});
	
	// resetTimer function
	var resetTimer = function(){
		clearTimeout(timer);
		timer = undefined;
	};
	
	// formatTime function
	var formatTime = function(seconds) {
		if (seconds < 60){
			seconds = ("0" + seconds).slice(-2);
			return  '00:' + seconds;
		}
		var minutes = Math.floor(seconds / 60);
		var remainingSeconds = seconds % 60;
		seconds = ("0" + remainingSeconds).slice(-2);
		minutes = ("00" + minutes).slice(-2);
		return minutes + ':' + seconds;
	};
	
});