let newTodo = document.getElementById("newTodo");  //입력된 할일
const button = document.querySelector("button"); //버튼
let todoList = document.getElementById('todoList') //ul
let todos = JSON.parse(localStorage.getItem("todoLocal")); //할일 내용을 저장할 배열
let checks = JSON.parse(localStorage.getItem("checkLocal")) || []; //체크 여부를 저장할 배열

printSaved();

//할일 추가 기능 (추가 버튼 눌렀을 때)
function addTodo(){
    saveStorage();
    if(newTodo.value == false){
        alert("할 일이 입력되지 않았습니다!")   //아무것도 입력하지 않았을 때 경고창
    }
    else{
        let newTodoValue = newTodo.value;
        todoPrint(newTodoValue)
        // 입력된 내용은 입력 창에서 사라지게
        newTodo.value = null;
    }
}

// 새 할일 입력되었을 때 -> 화면에 체크박스, 내용, 삭제 버튼 나타나게!
// 할일의 삭제와 완료 이벤트 구현
function todoPrint(e){
    let list = document.createElement('li');
    // 체크박스, 할일 내용, 삭제 버튼 생성
    let chk = document.createElement("input"); 
    chk.type="checkbox"; chk.id="checkBox";
    todo = document.createElement("div");
    let del = document.createElement('button');

    // li에 체크박스 추가
    list.appendChild(chk);
    // 입력받은 값을 todo에 담기, li에 todo 추가
    todo.innerHTML = e;
    list.appendChild(todo);
    // li에 삭제버튼 추가
    list.appendChild(del);
    del.innerText = "x";
    del.style.border = "none";
    del.style.background="none"
    del.style.cursor = "pointer";

    // li 내용들을 todoList ul에 자식으로 추가
    todoList.appendChild(list);
    // 삭제버튼 클릭 시, 삭제 이벤트 실행
    del.addEventListener("click",deleteLi);
    //할일 완료 
    chk.addEventListener("change", checkLi);
}

//할일 완료 표시 함수 (체크박스)
function checkLi(){
    let todo = this.nextSibling; //체크박스의 다음요소: 텍스트 부분
    indexOfTodo = todos.indexOf(this.nextSibling.innerText);
    if (checks[indexOfTodo] == false ){
        todo.style.textDecoration = "line-through";
        todo.style.color = "gray"; 
        checks[indexOfTodo] = true;
    }
    else {
        todo.style.textDecoration = "none";
        todo.style.color = "#34393A";
        checks[indexOfTodo] = false;
    }
    localStorage.setItem("checkLocal", JSON.stringify(checks));  
}

// 입력된 할 일 삭제 기능 함수
function deleteLi(e){
    let removeOne = e.target.parentElement;  //선택된 버튼의 부모 객체를 변수로
    removeOne.remove(); //할당된 부모 객체 삭제
    // 로컬 스토리지에서 삭제
    // filter 기능 이용해서 삭제할 내용을 제외한 새로운 배열 만들기
    let changedBox = checks.filter(function(_, index){
        return index !== todos.indexOf(e.target.previousSibling.innerText);
    })
    checks = changedBox;
    localStorage.setItem("checkLocal", JSON.stringify(checks));
    
    let changedTodo = todos.filter(function(x){
        return x !== e.target.previousSibling.innerText;
    })
    todos = changedTodo;
    localStorage.setItem("todoLocal", JSON.stringify(todos));
}

// 로컬 스토리지에 저장하는 함수
function saveStorage(){
    if (todos !== null){
        // 기존 값이 있으면 배열에 내용 추가
        todos.push(newTodo.value);
    }
    else{
        // 기존 저장된 값이 없으면 배열 만들기
        todos = [newTodo.value];
    }
    localStorage.setItem("todoLocal", JSON.stringify(todos));
    checks.push(false);
    localStorage.setItem("checkLocal", JSON.stringify(checks));
}

// 로컬 스토리지에 저장되어 있던 값 출력 관련 함수
function printSaved(){
    if (todos !== null){
        let i = 0;
        // 로컬 스토리지에 저장되어 있던 모든 값들 출력 (todoPrint 함수 사용)
        for (e of todos){
        todoPrint(e);
        // 체크박스도 새로고침 전 값 유지하도록
        todo.previousSibling.checked = !!(checks[i]);
        if (todo.previousSibling.checked == true){
            todo.style.textDecoration = "line-through";
            todo.style.color = "gray"; 
        }
        else{
            todo.style.textDecoration = "none";
            todo.style.color = "#34393A";
        }   
        i++;
        };
    }
}