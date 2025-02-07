//script setup

//document.getElementById("popupButton").addEventListener("click", showM);

//document.getElementById("popupButton").addEventListener("click", popup());

//document.getElementById("popupClose").addEventListener("click", popupClose());
const context_path = "";
var dateArray = [];

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

sessionStorage.setItem('cm', currentMonth);
sessionStorage.setItem('cy', currentYear);

window.onload = function (){
	var title = document.title;
	
	if(title === "login"){

		const localUsername = localStorage.getItem('localUsername');

		if(localUsername !== null) document.getElementById("username").value = localUsername;
		//localStorage.clear();
	}

	if(title === "dashboard"){

		
		if(sessionStorage.getItem('lastPage') === 'task'){
			showTask();
		}
		
		else showCourse();
		const currentUsername = localStorage.getItem('localUsername');
		
		if(currentUsername !== null){
			calendarRequest(currentUsername);
		}
	}

	if(title === "editTask"){

		const currentTaskID = localStorage.getItem('currentTaskID');
		const currentTaskUsername = localStorage.getItem('currentTaskUsername');
		const currentNameTask = localStorage.getItem('currentNameTask');
		const currentIsDoneTask = localStorage.getItem('currentIsDoneTask');
		const currentDetailTask = localStorage.getItem('currentDetailTask');
		const currentDeadlineTask = localStorage.getItem('currentDeadlineTask');

		if(currentTaskID !== null && currentTaskUsername !== null){
			document.getElementById("editNameTask").value = currentNameTask;
			document.getElementById("editDetailTask").value = currentDetailTask;
			document.getElementById("editDeadlineTask").value = currentDeadlineTask;
		}
	}

	if(title === "editCourse"){
		const currentCourseID = localStorage.getItem('currentCourseID');
		const curentCourseUsername = localStorage.getItem('currentCourseUsername');
		const currentCourseName = localStorage.getItem('currentCourseName');
		const currentCourseProfessorName = localStorage.getItem('currentCourseProfessorName');
		const currentColorCourse = localStorage.getItem('currentColorCourse');
		const currentStartTime = localStorage.getItem('currentStartTime');
		const currentEndTime = localStorage.getItem('currentEndTime');
		const currentDayOfWeek = localStorage.getItem('currentDayOfWeek');

		if(curentCourseUsername !==null){

			document.getElementById("editCourseID").value = currentCourseID;
			document.getElementById("editDayOfWeek").value = currentDayOfWeek;
			document.getElementById("editCourseName").value = currentCourseName;
			document.getElementById("editProfessorName").value = currentCourseProfessorName;
			document.getElementById("editColorCourse").value = currentColorCourse;
			document.getElementById("startTime").value = currentStartTime.slice(0, -8);
			document.getElementById("endTime").value = currentEndTime.slice(0, -8);
		}
	}
}

function goToAdd(){
	if(sessionStorage.getItem('lastPage') === 'task'){
		goToAddTask();
	}
	else if(sessionStorage.getItem('lastPage') === 'course'){
		goToAddCourse();
	}
}

//utility
function logout(){
	localStorage.clear();
	window.location.href = "index.html";
}

function goToAddTask(){
	window.location.href = "addTask.html";
}

function goToAddCourse(){
	window.location.href = "addCourse.html";
}

function resetIcon(){
	document.getElementById("icon_schedule").innerHTML = `<img class="img-100" src="images/icon_schedule.png">`;
	document.getElementById("icon_tasks").innerHTML = `<img class="img-100" src="images/icon_tasks.png">`;
	document.getElementById("icon_calendar").innerHTML = `<img class="img-100" src="images/icon_calendar.png">`;
}

function toggleSidePopup(){
	const localUsername = localStorage.getItem('localUsername');
	document.getElementById("sidePopupContainer").style.display = "flex";
	document.getElementById("sidepopupuser").innerHTML=`<div class="username1"> `+ localUsername +`</div>
	<div class="username2">
		<button onclick="toggleSidePopupClose()" class="clear cancle"><img class="img-100" src="images/icon_cancle.png"></button>
	</div>`;
}

function toggleSidePopupClose(){
	document.getElementById("sidePopupContainer").style.display = "none";
}

function calendarRequest(username){
	var url = '/findTaskByUsername?username=' + encodeURIComponent(username);
	const container = document.getElementById('list-container');
	//container.innerHTML="";
	//container.innerHTML=tableHTML;
	fetch(url)
    .then(response => response.json())
    .then(data => {
	const set = new Set();
	data.forEach(item =>{
		set.add(item.deadlineTask);
	});
	set.forEach(deadlineTask => {
		dateArray.push(deadlineTask);
	})
	dateArray.forEach(item => {
		console.log(item);
	})
    dateArray = dateArray.map(subtractOneDayFromDate);
    })
    .catch(error => console.error('Error:', error));
}

function goToDashboard(){
	var title = document.title;

	if(title === "editTask"){
		localStorage.removeItem('currentTaskID');
		localStorage.removeItem('currentTaskUsername');
		localStorage.removeItem('currentNameTask');
		localStorage.removeItem('currentIsDoneTask');
		localStorage.removeItem('currentDetailTask');
		localStorage.removeItem('currentDeadlineTask');
		
	}

	if(title === "editCourse"){
		localStorage.removeItem('currentCourseID');
		localStorage.removeItem('currentCourseUsername');
		localStorage.removeItem('currentCourseName');
		localStorage.removeItem('currentCourseProfessorName');
		localStorage.removeItem('currentColorCourse');
		localStorage.removeItem('currentStartTime');
		localStorage.removeItem('currentEndTime');
		localStorage.removeItem('currentDayOfWeek');
	}

	window.location.href = "dashboard.html";
}

function popup() {
	//document.getElementById("popupMessage").textContent = "error"
    document.getElementById("popupContainer").style.display = "block";
}
/*function popup(m) {
	document.getElementById("popupMessage").textContent = m
    document.getElementById("popupContainer").style.display = "block";
}*/

function popupClose() {
    document.getElementById("popupContainer").style.display = "none";
}

function validateInput(input) {
    var regex = /^[a-zA-Z0-9!@#$%^&*()_+={}[\]:;"'<>,.?/|\\-]{1,20}$/;
    return regex.test(input);
}

function listTest(){
    var url = "/listTest";
	// สร้าง FormData object เพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
	// ทำการ POST request ไปยังหลังบ้าน
	fetch(url, {
    	method: "POST",
	})
	.then(response => response.text())
	.then(data => popup(data))
	.catch(error => console.error("Error:", error));
}

function clearLocalStorage(){
    localStorage.clear();
}

function showCalender(){
	sessionStorage.setItem('cm', currentMonth);
	sessionStorage.setItem('cy', currentYear);
	resetIcon();
	document.getElementById('icon_calendar').innerHTML = `<img class="img-100" src="images/icon_calendar_active.png">`;

	var username = localStorage.getItem('localUsername');
	sessionStorage.setItem('lastPage', "task");
	var header = document.getElementById("list-header");

	if(username != null){
		
		createCalendar(username);
	}
}

//register
function register(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var cpassword = document.getElementById("cpassword").value;
	if(password == cpassword && validateInput(username) && validateInput(password)){
		//popup(username + password + cpassword);
		registerRequest(username, password);
	}
	else document.getElementById("signupMessage").textContent = "โปรดใสภาษาอังกฤษ, เลข และ สัญลักษญ์พิเศษเท่านั้น(ไม่เกิน 20 ตัวอักษร)";
}

//API
function registerRequest(username, password){
	// สร้าง URL สำหรับการส่ง POST request
	var url = context_path + "/register";

	// สร้าง FormData object เพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
	/*var formData = new FormData();
	formData.append("username", username);
	formData.append("password", password);*/

	var obj = {
      username: username,
      password: password
    };

	var data = JSON.stringify(obj);

	// ทำการ POST request ไปยังหลังบ้าน
	fetch(url, {
    	method: "POST",
    	headers: {
            'Content-Type': 'application/json'
        },
    	body : data
	})
	/*.then(response => response.text())
	.then(data => {
	    console.log(data);
	    if(data === "PASS"){
	        console.log("OK");
            window.location.href = "index.html";
        }
        else{
            console.log("NOT OK");
            popup(data);
        }
	})*/
	/*.then(response => {
	    console.log(response.status);
	    if(response.status === 200){
	        //console.log("OK");
	        window.location.href = "index.html";
	    }
	    else{
	        //console.log("NOT OK");
	    }
	})*/
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        //console.log("Data:", data);
        //console.log("Status:", status);
        if(status === 200){
            window.location.href = "index.html";
        }
        else{
            //popup(data);
			document.getElementById("signupMessage").textContent = data;
        }
    })
	.catch(error => console.error("Error:", error));
}

//login
function login(){

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	loginRequest(username, password);
}

//API
function loginRequest(username, password){
	var url = context_path + "/login"

	var obj = {
		username: username,
		password: password
	};

	var data = JSON.stringify(obj);

	fetch(url, {
    	method: "POST",
    	headers: {
            'Content-Type': 'application/json'
        },
    	body : data
	})
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        console.log("Data:", data);
        console.log("Status:", status);
        if(status === 200){
            localStorage.setItem('localUsername', username);
			window.location.href = "dashboard.html";
        }
        else{
            //popup(data);
			document.getElementById("loginMessage").textContent = data;
        }
    })
	.catch(error => console.error("Error:", error));
}

//notification
function showNotification(){
	let currentDate = new Date();

	const year = currentDate.getFullYear();
	let month = currentDate.getMonth() + 1;
	let day = currentDate.getDate();
 
	month = (month < 10) ? '0' + month : month;
	day = (day < 10) ? '0' + day : day;
	const date = `${year}-${month}-${day}`;
	
	let username = localStorage.getItem('localUsername');

	if(username != null){
		popup();
		notificationTaskRequest(username, date);
	}
}

function showNotificationByDate(date){
	
	let username = localStorage.getItem('localUsername');

	if(username != null){
		popup();
		notificationTaskRequest(username, date);
	}
}

//API
function notificationTaskRequest(username, date){
	var url = '/findTaskByDate?username=' + encodeURIComponent(username) + '&date=' + date;
	const container = document.getElementById('noti-container');
	container.innerHTML="";

	fetch(url)
    .then(response => response.json())
    .then(data => {
        
        data.forEach(task => {
            const newItem = document.createElement('div');
            newItem.textContent = task.nameTask;
            newItem.classList.add('item');
            //newItem.onclick = () => showDetails(task); // เพิ่มการกำหนดค่า onClick
            container.appendChild(newItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

//task
function addTask(){
	var username = localStorage.getItem('localUsername');

	var nameTask = document.getElementById("nameTask").value;
	var detailTask = document.getElementById("detailTask").value;
	var deadlineTask = document.getElementById("deadlineTask").value;


	if(username != null){
		if(nameTask != "" && deadlineTask != ""){
			//alert(nameTask +" "+ detailTask +" "+ deadlineTask +" " + username);
			addTaskRequest(nameTask, detailTask, deadlineTask, username);
		}
		else alert("please input nameTask and detailTask");
	}
	else alert("please login first");
}

//API
function addTaskRequest(nameTask, detailTask, deadlineTask, username){
	var url = context_path + "/addTask"

	var obj = {
		nameTask: nameTask,
        detailTask: detailTask,
        isDone: 0,
        deadlineTask: deadlineTask,
		username: username
	};

	var data = JSON.stringify(obj);

	fetch(url, {
    	method: "POST",
    	headers: {
            'Content-Type': 'application/json'
        },
    	body : data
	})
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        console.log("Data:", data);
        console.log("Status:", status);
        if(status === 200){
            //localStorage.setItem('localUsername', username);
			window.location.href = "dashboard.html";
        }
        else{
            //popup(data);
			document.getElementById("loginMessage").textContent = data;
        }
    })
	.catch(error => console.error("Error:", error));
}

function showTask(){
	resetIcon();
	document.getElementById('icon_tasks').innerHTML = `<img class="img-100" src="images/icon_tasks_active.png">`;
	var username = localStorage.getItem('localUsername');
	sessionStorage.setItem('lastPage', "task");
	var header = document.getElementById("list-header");
	header.innerHTML = `<div class="rounded-box">Task</div>`;
	if(username != null){
		deleteCalendar();
		findTaskRequest(username);
	}
}

//API
function findTaskRequest(username){
	var url = '/findTaskByUsername?username=' + encodeURIComponent(username);
	const container = document.getElementById('list-container');
	container.innerHTML="";
	fetch(url)
    .then(response => response.json())
    .then(data => {
        let dataArray = [];
		const set = new Set();
		data.forEach(item =>{
			set.add(item.deadlineTask);
		});
		set.forEach(deadlineTask => {
			dataArray.push(deadlineTask);
		})
		console.log(dataArray);

        data.forEach(task => {
            const newItem = document.createElement('div');
			const button = document.createElement('button');
			const text = document.createElement('div');

			button.classList.add('isDone-button'); // เพิ่มคลาสให้กับปุ่ม

			text.classList.add('taskText');
            text.textContent = task.nameTask;
            newItem.classList.add('item');
            text.onclick = () => showTaskDetails(task); // เพิ่มการกำหนดค่า onClick
			if(task.isDone === false){
				button.style.backgroundColor = "red"
			}
			else if(task.isDone === true){
				button.style.backgroundColor = "green"
			}
			button.onclick = () => {
				toggleIsDone(task.nameTask, task.deadlineTask, task.isDone, task.deadlineTask, task.username, task.taskID);
				if (button.style.backgroundColor === "green") {
					button.style.backgroundColor = "red";
				} else {
					button.style.backgroundColor = "green";
				}
				if(task.isDone === false){
					task.isDone = true;
				}
				else if(task.isDone === true){
					task.isDone = false
				}
			}
			newItem.appendChild(text);
			newItem.appendChild(button);
            container.appendChild(newItem);
        });
    })
    .catch(error => console.error('Error:', error));
}



function toggleIsDone(nameTask, detailTask, isDone, deadlineTask, username, taskID){
	var url = context_path + "/editTask"
	var newisDone;
	if(isDone === false){
		newisDone = true;
	}
	else if(isDone === true){
		newisDone = false
	}
	var obj = {
		taskID: taskID,
		nameTask: nameTask,
        detailTask: detailTask,
        isDone: newisDone,
        deadlineTask: deadlineTask,
		username: username
	};

	var data = JSON.stringify(obj);

	fetch(url, {
    	method: "POST",
    	headers: {
            'Content-Type': 'application/json'
        },
    	body : data
	})
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        console.log("Data:", data);
        console.log("Status:", status);
        if(status === 200){
			//lert("success");
        }
        else{
            //popup(data);
			//document.getElementById("loginMessage").textContent = data;
        }
    })
	.catch(error => console.error("Error:", error));
	
}

function showTaskDetails(task) {
	localStorage.setItem('currentTaskID', task.taskID);
	localStorage.setItem('currentTaskUsername', task.username);
	localStorage.setItem('currentNameTask', task.nameTask);
	localStorage.setItem('currentIsDoneTask', task.isDone);
	localStorage.setItem('currentDetailTask', task.detailTask);
	localStorage.setItem('currentDeadlineTask', task.deadlineTask);
	window.location.href = "editTask.html";
}

function editTask(){
	const taskID = localStorage.getItem('currentTaskID');
	const username = localStorage.getItem('currentTaskUsername');
	const nameTask = document.getElementById("editNameTask").value;
	const isDone = localStorage.getItem('currentIsDoneTask');
	const detailTask = document.getElementById("editDetailTask").value;
	const deadlineTask = document.getElementById("editDeadlineTask").value;
	if(nameTask !== null && deadlineTask !== null){
		editTaskRequest(nameTask, detailTask, isDone, deadlineTask, username, taskID)
	}
	else{

	}
}

//API
function editTaskRequest(nameTask, detailTask, isDone, deadlineTask, username, taskID){
	var url = context_path + "/editTask"

	var obj = {
		taskID: taskID,
		nameTask: nameTask,
        detailTask: detailTask,
        isDone: isDone,
        deadlineTask: deadlineTask,
		username: username
	};

	var data = JSON.stringify(obj);

	fetch(url, {
    	method: "POST",
    	headers: {
            'Content-Type': 'application/json'
        },
    	body : data
	})
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        console.log("Data:", data);
        console.log("Status:", status);
        if(status === 200){
			localStorage.removeItem('currentTaskID');
			localStorage.removeItem('currentTaskUsername');
			localStorage.removeItem('currentNameTask');
			localStorage.removeItem('currentIsDoneTask');
			localStorage.removeItem('currentDetailTask');
			localStorage.removeItem('currentDeadlineTask');
            //localStorage.setItem('localUsername', username);
			window.location.href = "dashboard.html";
        }
        else{
            //popup(data);
			//document.getElementById("loginMessage").textContent = data;
        }
    })
	.catch(error => console.error("Error:", error));
	
}

function deleteTask(){
	const taskID = localStorage.getItem('currentTaskID');
	var username = localStorage.getItem('localUsername');

	deleteTaskRequest(taskID, username);
}

//API
function deleteTaskRequest(taskID , username){
	var url = context_path + "/deleteTask"

	var data = new URLSearchParams();
    data.append("taskID", taskID);
    data.append("username", username);

	fetch(url, {
    	method: "POST",
		body: data
	})
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        console.log("Data:", data);
        console.log("Status:", status);
        if(status === 200){
            //localStorage.setItem('localUsername', username);
			localStorage.removeItem('currentTaskID');
			localStorage.removeItem('currentTaskUsername');
			localStorage.removeItem('currentNameTask');
			localStorage.removeItem('currentIsDoneTask');
			localStorage.removeItem('currentDetailTask');
			localStorage.removeItem('currentDeadlineTask');
			window.location.href = "dashboard.html";
        }
        else{
            //popup(data);
			document.getElementById("loginMessage").textContent = data;
        }
    })
	.catch(error => console.error("Error:", error));
}


//course
function addCourse(){
	var username = localStorage.getItem('localUsername');

	var courseID = document.getElementById("courseID").value;
	var courseName = document.getElementById("courseName").value;
	var colorCourse = document.getElementById("colorCourse").value;
	var professorName = document.getElementById("professorName").value;
	var dayOfWeek = document.getElementById("dayOfWeek").value;

	var startTime = document.getElementById("startTime").value;
	var endTime = document.getElementById("endTime").value;

	var timeParts = startTime.split(":");

	var startTimeCompare = parseInt(timeParts[0] + timeParts[1]);

	timeParts = endTime.split(":");

	var endTimeCompare = parseInt(timeParts[0] + timeParts[1]);

	//alert(startTimeCompare - endTimeCompare);

	if(username !== null && !((endTimeCompare - startTimeCompare) <= 0) && !((endTimeCompare - startTimeCompare) > 300)){
		addCourseRequest(courseID, username, colorCourse, courseName, professorName, dayOfWeek, startTime, endTime);
		//alert("pass");
	}
}
//API
function addCourseRequest(courseID, username, colorCourse, courseName, professorName, dayOfWeek, startTime, endTime){
	var url = context_path + "/addCourse"

	var obj = {
		courseID: courseID,
    	courseName: courseName,
    	professorName: professorName,
    	colorCourse: colorCourse,
    	startTime: startTime,
    	endTime: endTime,
    	username: username,
    	dayOfWeek: dayOfWeek
	};

	var data = JSON.stringify(obj);

	fetch(url, {
    	method: "POST",
    	headers: {
            'Content-Type': 'application/json'
        },
    	body : data
	})
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        console.log("Data:", data);
        console.log("Status:", status);
        if(status === 200){
            //localStorage.setItem('localUsername', username);
			window.location.href = "dashboard.html";
        }
        else{
            //popup(data);
			alert(data);
        }
    })
	.catch(error => console.error("Error:", error));
}

var courseArray = [];

function showCourse(){
	resetIcon();
	document.getElementById('icon_schedule').innerHTML = `<img class="img-100" src="images/icon_schedule_active.png">`;
	var username = localStorage.getItem('localUsername');
	sessionStorage.setItem('lastPage', "course");
	var header = document.getElementById("list-header");
	header.innerHTML = `<div class="rounded-box">Schedule</div>`;
	if(username != null){
		deleteCalendar();
		findCourseRequest(username);
	}
}

function convertToTimeFormat(input) {
    // แยกชั่วโมงและนาที
    var hours = Math.floor(input / 100);
    var minutes = input % 100;

    // สร้างรูปแบบของเวลา
    var timeString = hours.toString().padStart(2, '0') + ":" + (minutes < 10 ? "0" + minutes : minutes);
    return timeString;
}

//API
function findCourseRequest(username){
	courseArray = [];
	
	var scheduleHTML = `<table id="schedule">
      <tr>
        <th>วัน/เวลา</th>
        <th>08:00 - 09:30</th>
        <th>09:30 - 11:00</th>
        <th>11:00 - 12:30</th>
        <th>12:30 - 13:30</th>
        <th>13:30 - 15:00</th>
        <th>15:00 - 16:30</th>
        <th>16:30 - 18:00</th>
      </tr>
      <tr>
        <td class="grey-cell">จันทร์</td>
        <td id="monday_08:00" colspan="1"></td>
        <td id="monday_09:30" colspan="1"></td>
        <td id="monday_11:00" colspan="1"></td>
        <td id="monday_12:30" colspan="1"></td>
        <td id="monday_13:30" colspan="1"></td>
        <td id="monday_15:00" colspan="1"></td>
        <td id="monday_16:30" colspan="1"></td>
      </tr>
      <tr>
        <td class="grey-cell">อังคาร</td>
        <td id="tuesday_08:00" colspan="1"></td>
        <td id="tuesday_09:30" colspan="1"></td>
        <td id="tuesday_11:00" colspan="1"></td>
        <td id="tuesday_12:30" colspan="1"></td>
        <td id="tuesday_13:30" colspan="1"></td>
        <td id="tuesday_15:00" colspan="1"></td>
        <td id="tuesday_16:30" colspan="1"></td>
      </tr>
      <tr>
        <td class="grey-cell">พุธ</td>
        <td id="wednesday_08:00" colspan="1"></td>
        <td id="wednesday_09:30" colspan="1"></td>
        <td id="wednesday_11:00" colspan="1"></td>
        <td id="wednesday_12:30" colspan="1"></td>
        <td id="wednesday_13:30" colspan="1"></td>
        <td id="wednesday_15:00" colspan="1"></td>
        <td id="wednesday_16:30" colspan="1"></td>
      </tr>
      <tr>
        <td class="grey-cell">พฤหัสบดี</td>
        <td id="thursday_08:00" colspan="1"></td>
        <td id="thursday_09:30" colspan="1"></td>
        <td id="thursday_11:00" colspan="1"></td>
        <td id="thursday_12:30" colspan="1"></td>
        <td id="thursday_13:30" colspan="1"></td>
        <td id="thursday_15:00" colspan="1"></td>
        <td id="thursday_16:30" colspan="1"></td>
      </tr>
      <tr>
        <td class="grey-cell">ศุกร์</td>
        <td id="friday_08:00" colspan="1"></td>
        <td id="friday_09:30" colspan="1"></td>
        <td id="friday_11:00" colspan="1"></td>
        <td id="friday_12:30" colspan="1"></td>
        <td id="friday_13:30" colspan="1"></td>
        <td id="friday_15:00" colspan="1"></td>
        <td id="friday_16:30" colspan="1"></td>
      </tr>
      <tr>
        <td class="grey-cell">เสาร์</td>
        <td id="saturday_08:00" colspan="1"></td>
        <td id="saturday_09:30" colspan="1"></td>
        <td id="saturday_11:00" colspan="1"></td>
        <td id="saturday_12:30" colspan="1"></td>
        <td id="saturday_13:30" colspan="1"></td>
        <td id="saturday_15:00" colspan="1"></td>
        <td id="saturday_16:30" colspan="1"></td>
      </tr>
      <tr>
        <td class="grey-cell">อาทิตย์</td>
        <td id="sunday_08:00" colspan="1"></td>
        <td id="sunday_09:30" colspan="1"></td>
        <td id="sunday_11:00" colspan="1"></td>
        <td id="sunday_12:30" colspan="1"></td>
        <td id="sunday_13:30" colspan="1"></td>
        <td id="sunday_15:00" colspan="1"></td>
        <td id="sunday_16:30" colspan="1"></td>
      </tr>
    </table>`;
	var url = '/findCourseByUsername?username=' + encodeURIComponent(username);
	const container = document.getElementById('list-container');
	container.innerHTML="";
	container.innerHTML=scheduleHTML;
	fetch(url)
    .then(response => response.json())
    .then(data => {
		var course = data;
		data.forEach(item => {

			var timeParts = item.endTime.split(":");
			item.endTime = parseInt(timeParts[0] + timeParts[1]);
			
			if((item.endTime % 100) === 0){
				item.endTime = item.endTime - 170;
			}
			else {
				item.endTime = item.endTime - 130;
			}
			item.endTime = item.endTime.toString();
			item.endTime = convertToTimeFormat(item.endTime);

			if(item.dayOfWeek === "mon"){
				item.dayOfWeek = "monday_" + item.startTime.slice(0, -8);
				item.endTime = "monday_" + item.endTime;
			}
			else if(item.dayOfWeek === "tue"){
				item.dayOfWeek = "tuesday_" + item.startTime.slice(0, -8);
				item.endTime = "tuesday_" + item.endTime;
			}
			else if(item.dayOfWeek === "wed"){
				item.dayOfWeek = "wednesday_" + item.startTime.slice(0, -8);
				item.endTime = "wednesday_" + item.endTime;
			}
			else if(item.dayOfWeek === "thu"){
				item.dayOfWeek = "thursday_" + item.startTime.slice(0, -8);
				item.endTime = "thursday_" + item.endTime;
			}
			else if(item.dayOfWeek === "fri"){
				item.dayOfWeek = "friday_" + item.startTime.slice(0, -8);
				item.endTime = "friday_" + item.endTime;
			}
			else if(item.dayOfWeek === "sat"){
				item.dayOfWeek = "saturday_" + item.startTime.slice(0, -8);
				item.endTime = "saturday_" + item.endTime;
			}
			else if(item.dayOfWeek === "sun"){
				item.dayOfWeek = "sunday_" + item.startTime.slice(0, -8);
				item.endTime = "sunday_" + item.endTime;
			}
			//item.endTime = item.endTime.slice(0, -8);
			courseArray.push(item);
			console.log(item.endTime);
		});

		var table = document.getElementById("schedule");
  		var cells = table.getElementsByTagName("td");
  		for (var i = 0; i < cells.length; i++) {
			var cellID = cells[i].id;
			//console.log(cellID);
    		//cells[i].addEventListener("click", showAlert);
    		//cells[i].addEventListener("click", mergeCells);
			courseArray.forEach(item => {
				if(cellID === item.dayOfWeek || cellID === item.endTime){
					cells[i].style.backgroundColor = item.colorCourse;
					if(cellID === item.dayOfWeek){
						//cells[i].textContent = item.courseID + "\n" + item.professorName;
						cells[i].innerHTML = item.courseID + "<br>" + item.professorName;
					}
					cells[i].onclick = () => showCourseDetails(item.courseID, item.username);
					//cells[i].addEventListener("click", showCourseDetails(item.courseID, item.username));
				}
				//console.log(item.dayOfWeek);
			});
  		}
        /*data.forEach(course => {
            const newItem = document.createElement('div');
            newItem.textContent = course.courseID;
            newItem.classList.add('item');
            newItem.onclick = () => showCourseDetails(course); // เพิ่มการกำหนดค่า onClick
            container.appendChild(newItem);
        });*/
    })
    .catch(error => console.error('Error:', error));
	
}

function showAlert(event) {
	var cellID = event.target.id;
	alert(cellID);
}

/*function mergeCells(event) {
	var cell = event.target;
  var isRightmostCell = cell.cellIndex === cell.parentNode.cells.length - 1; // ตรวจสอบว่าเป็นเซลล์ทางขวาสุดหรือไม่
  
  if (!isRightmostCell) {
    var colspan = parseInt(cell.getAttribute("colspan")) || 1;
    cell.setAttribute("colspan", colspan + 1);
    // เปลี่ยนสีพื้นหลังของเซลล์ที่ถูกคลิก
    cell.classList.add("highlight");
  }
  }*/

function showCourseDetails(courseID, username) {
	//alert("show detail" + username + courseID);
	var url = '/findCourseByUsernameAndCourseID?username=' + encodeURIComponent(username) + '&courseID=' + encodeURIComponent(courseID);
	fetch(url)
    .then(response => response.json())
    .then(data => {
		console.log(data);
        localStorage.setItem('currentCourseID', data.courseID);
		localStorage.setItem('currentCourseUsername', data.username);
		localStorage.setItem('currentCourseName', data.courseName);
		localStorage.setItem('currentCourseProfessorName', data.professorName);
		localStorage.setItem('currentColorCourse', data.colorCourse);
		localStorage.setItem('currentStartTime', data.startTime);
		localStorage.setItem('currentEndTime', data.endTime);
		localStorage.setItem('currentDayOfWeek', data.dayOfWeek);

		window.location.href = "editCourse.html";
    })
    .catch(error => console.error('Error:', error));

}

function editCourse(){
	var username = localStorage.getItem("localUsername");
	var newCourseID = document.getElementById("editCourseID").value;
	var dayOfWeek = document.getElementById("editDayOfWeek").value;
	var courseName = document.getElementById("editCourseName").value;
	var professorName = document.getElementById("editProfessorName").value;
	var colorCourse = document.getElementById("editColorCourse").value;
	var startTime = document.getElementById("startTime").value;
	var endTime = document.getElementById("endTime").value;

	var timeParts = startTime.split(":");

	var startTimeCompare = parseInt(timeParts[0] + timeParts[1]);

	timeParts = endTime.split(":");

	var endTimeCompare = parseInt(timeParts[0] + timeParts[1]);

	//alert(startTimeCompare - endTimeCompare);

	if(!((endTimeCompare - startTimeCompare) <= 0) && !((endTimeCompare - startTimeCompare) > 300)){
		editCourseRequest(newCourseID, username, colorCourse, courseName, professorName, dayOfWeek, startTime, endTime);
		//alert("pass");
	}
}

//API
function editCourseRequest(newCourseID, username, colorCourse, courseName, professorName, dayOfWeek, startTime, endTime){
	var url = context_path + "/editCourse"

	var obj = {
		courseID: localStorage.getItem('currentCourseID'),
    	courseName: courseName,
    	professorName: professorName,
    	colorCourse: colorCourse,
    	startTime: startTime,
    	endTime: endTime,
    	username: username,
    	dayOfWeek: dayOfWeek,
		newCourseID: newCourseID
	};

	var data = JSON.stringify(obj);

	fetch(url, {
    	method: "POST",
    	headers: {
            'Content-Type': 'application/json'
        },
    	body : data
	})
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        console.log("Data:", data);
        console.log("Status:", status);
        if(status === 200){
			localStorage.removeItem('currentCourseID');
			localStorage.removeItem('currentCourseUsername');
			localStorage.removeItem('currentCourseName');
			localStorage.removeItem('currentCourseProfessorName');
			localStorage.removeItem('currentColorCourse');
			localStorage.removeItem('currentStartTime');
			localStorage.removeItem('currentEndTime');
			localStorage.removeItem('currentDayOfWeek');

			window.location.href = "dashboard.html";
        }
        else{
            //popup(data);
			//document.getElementById("loginMessage").textContent = data;
        }
    })
	.catch(error => console.error("Error:", error));
}

function deleteCourse(){
	const courseID = localStorage.getItem('currentCourseID');
	var username = localStorage.getItem('localUsername');
	//alert(username + courseID);
	deleteCourseRequest(courseID, username);
}

//API
function deleteCourseRequest(courseID , username){
	var url = context_path + "/deleteCourse"

	var data = new URLSearchParams();
    data.append("courseID", courseID);
    data.append("username", username);

	fetch(url, {
    	method: "POST",
    	body : data
	})
	.then(response => Promise.all([response.text(), response.status]))
    .then(([data, status]) => {
        console.log("Data:", data);
        console.log("Status:", status);
        if(status === 200){
			localStorage.removeItem('currentCourseID');
			localStorage.removeItem('currentCourseUsername');
			localStorage.removeItem('currentCourseName');
			localStorage.removeItem('currentCourseProfessorName');
			localStorage.removeItem('currentColorCourse');
			localStorage.removeItem('currentStartTime');
			localStorage.removeItem('currentEndTime');
			localStorage.removeItem('currentDayOfWeek');

			window.location.href = "dashboard.html";
        }
        else{
            //popup(data);
			//document.getElementById("loginMessage").textContent = data;
        }
    })
	.catch(error => console.error("Error:", error));
}


let calendarCreated = false;

    const array = ['2024-04-08', '2024-04-07', '2024-04-31'];

    function subtractOneDayFromDate(dateString) {
    var date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return date.toISOString().slice(0, 10);
    }
	function plusOneDayFromDate(dateString) {
		var date = new Date(dateString);
		date.setDate(date.getDate() + 1);
		return date.toISOString().slice(0, 10);
		}

    function createCalendar(username) {
		
        if (!calendarCreated) {
			calendarRequest(username);
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            generateCalendar(currentMonth, currentYear);
            calendarCreated = true;
            document.getElementById('calendar').classList.remove('hidden');
            //document.getElementById('deleteCalendarBtn').classList.remove('hidden');
            //document.getElementById('createCalendarBtn').classList.add('hidden');
        }
    }

    function deleteCalendar() {
		if (calendarCreated){
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';
        calendarCreated = false;
        calendar.classList.add('hidden');
        //document.getElementById('deleteCalendarBtn').classList.add('hidden');
        //document.getElementById('createCalendarBtn').classList.remove('hidden');
		}
    }


function generateCalendar(month, year) {
	var calendarHTML = `
  <table id="calendar" class="hidden">
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
    </tr>
    <tr id="week0"></tr>
    <tr id="week1"></tr>
    <tr id="week2"></tr>
    <tr id="week3"></tr>
    <tr id="week4"></tr>
    <tr id="week5"></tr>
  </table>
`;
        
	    const container = document.getElementById('list-container');
	    container.innerHTML="";
		container.innerHTML=calendarHTML;
	    
        const calendarBody = document.getElementById('calendar');
        const monthYearHeader = document.getElementById('list-header');
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        // Clear previous calendar
        calendarBody.innerHTML = '';
		calenderHeaderHTML =`<button onclick="changeMonth(-1)" id="prevMonthBtn" class="clear"><img class="img-100" src="images/icon_previous_month.png">
		</button> <div class="rounded-box">`+ new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) +`</div>
		<button id="nextMonthBtn" onclick="changeMonth(1)" class="clear"><img class="img-100" src="images/icon_next_month.png"></button>`;
		monthYearHeader.innerHTML = calenderHeaderHTML;
        // Set month and year header
        //monthYearHeader.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        // Array of day names

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Create table row for day names
        const dayNamesRow = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const th = document.createElement('th');
            th.textContent = dayNames[i];
            dayNamesRow.appendChild(th);
        }
        calendarBody.appendChild(dayNamesRow);

        // Calculate number of weeks needed
        const numWeeks = Math.ceil((firstDayOfMonth + daysInMonth) / 7);

        // Generate calendar rows
        let date = 1 - firstDayOfMonth; // Start date (may be negative)
        for (let i = 0; i < numWeeks; i++) {
            const weekRow = document.createElement('tr');
            weekRow.id = 'week' + i;

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                const dayNumber = document.createElement('span');
                dayNumber.classList.add('day-number');

                const currentDate = new Date(year, month, date);
                const formattedDate = currentDate.toISOString().slice(0, 10); // แปลงวันที่เป็น YYYY-MM-DD
                dayNumber.textContent = date > 0 && date <= daysInMonth ? formattedDate : '';

                dayNumber.textContent = date > 0 && date <= daysInMonth ? date : '';
                cell.appendChild(dayNumber);
                date++;

                // Highlight today's date
                if (date - 1 === currentDay && month === currentMonth && year === currentYear) {
                    cell.classList.add('today');
                }
				
                dateArray.forEach(item => {
					
                    if(item === formattedDate){
                        console.log(item + "   " + formattedDate);
                        cell.classList.toggle('selected');
						cell.onclick = () => {
							showNotificationByDate(plusOneDayFromDate(item));
						}
                    }
                });

                weekRow.appendChild(cell);
            }

            calendarBody.appendChild(weekRow);
        }
        dateArray = [];
       /* document.getElementById("calendar").addEventListener("click", function(event) {
			if (event.target.tagName === "TD" && event.target.innerHTML !== "") {
				var currentDate = new Date();
				var year = currentDate.getFullYear();
				var month = currentDate.getMonth() + 1;
				var day = event.target.textContent.trim();
				// เรียงวันที่ในรูปแบบ YYYY-MM-DD
				var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
				alert(formattedDate);
			}
		});*/
		
    }

	function changeMonth(delta) {

		deleteCalendar();
		sessionStorage.getItem('cm');
		sessionStorage.getItem('cy');
		var cMonth = parseInt(sessionStorage.getItem('cm'));
		var cYear = parseInt(sessionStorage.getItem('cy'));
		
		console.log(cMonth + " " + cYear);
		cMonth += delta;
		if (cMonth < 0) {
			cMonth = 11;
			cYear--;
		} else if (cMonth > 11) {
			cMonth = 0;
			cYear++;
		}
		sessionStorage.setItem('cm', cMonth);
		sessionStorage.setItem('cy', cYear)
		//alert(cMonth + " " + cYear);
		createCalendar2(localStorage.getItem('localUsername'), cMonth, cYear);
	}

	function createCalendar2(username, month, year) {
		
        if (!calendarCreated) {
			calendarRequest(username);
            generateCalendar(month, year);
            calendarCreated = true;
            document.getElementById('calendar').classList.remove('hidden');
            //document.getElementById('deleteCalendarBtn').classList.remove('hidden');
            //document.getElementById('createCalendarBtn').classList.add('hidden');
        }
    }