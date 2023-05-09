let newTodo = document.getElementById("newTodo");  //입력된 할일
const button = document.querySelector("button"); //버튼
let todoList = document.getElementById('todoList') //ul
let todos = JSON.parse(localStorage.getItem("todoLocal"));

printSaved();

//할일 추가 기능
function addTodo(){
    saveStorage();
    if(newTodo.value == false){
        alert("할 일이 입력되지 않았습니다!")   //아무것도 입력하지 않았을 때 경고창
    }
    else{
        // 체크박스, 할일 내용, 삭제 버튼을 포함할 list 생성
        let list = document.createElement('li');
        // 체크박스, 할일 내용, 삭제 버튼 생성
        let chk = document.createElement("input");
        chk.type="checkbox";
        let todo = document.createElement("div");
        let del = document.createElement('button');

        // li에 체크박스 추가
        list.appendChild(chk);
        // 입력받은 값을 todo에 담기, li에 todo 추가
        todo.innerHTML = newTodo.value;
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

        // 입력된 내용은 입력 창에서 사라지게
        newTodo.value = null;
    }
}

//할일 완료 표시 함수 (체크박스)
function checkLi(){
    if (this.checked == true ){
        todo = this.nextSibling; //체크박스의 다음요소(텍스트 부분)
        todo.style.textDecoration = "line-through";
        todo.style.color = "gray"; 
    }
    else {
        todo.style.textDecoration = "none";
        todo.style.color = "#34393A";
    }
}

// 입력된 할 일 삭제 기능 함수
function deleteLi(e){
    let removeOne = e.target.parentElement;  //선택된 버튼의 부모 객체를 변수로
    removeOne.remove(); //할당된 부모 객체 삭제
    // 로컬 스토리지에서 삭제
    let changedTodo = todos.filter(function(x){
        return x !== e.target.previousSibling.innerText;
    }) //filter 기능 이용해서 삭제할 내용을 제외한 새로운 배열 만들기
    todos = changedTodo;
    localStorage.setItem("todoLocal", JSON.stringify(todos));
}

// 로컬 스토리지에 저장하는 함수
function saveStorage(){
    if (todos !== null){
        // 기존 값이 있으면 배열에 내용 추가
        todos.push(newTodo.value);
        localStorage.setItem("todoLocal", JSON.stringify(todos));
    }
    else{
        // 기존 저장된 값이 없으면 배열 만들기
        todos = [newTodo.value];
        localStorage.setItem("todoLocal", JSON.stringify(todos));
    }
}

// 로컬 스토리지에 저장되어 있던 값 출력 관련 함수
function printSaved(){
    if (todos !== null){
        todos.forEach(e => {
        // 체크박스, 할일 내용, 삭제 버튼을 포함할 list 생성
        let list = document.createElement('li');
        // 체크박스, 할일 내용, 삭제 버튼 생성
        let chk = document.createElement("input");
        chk.type="checkbox";
        let todo = document.createElement("div");
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
        del.addEventListener("click", deleteLi);
        //할일 완료 
        chk.addEventListener("change", checkLi);
        });
    }
    else {
        return;
    }
}