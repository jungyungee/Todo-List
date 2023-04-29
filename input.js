let newTodo = document.getElementById("newTodo");  //입력된 할일
const button = document.querySelector("button"); //버튼
let list = document.getElementById("todoList");

//할일 추가 기능
function addTodo(){
    if(newTodo.value == false){
        alert("할 일이 입력되지 않았습니다!")   //아무것도 입력하지 않았을 때 경고창
    }
    else{
        //1. 추가할 li element 생성 (할일 리스트에 동적으로 추가)
        let li = document.createElement('li');
        //2. 삭제 버튼 생성
        let del = document.createElement('button');
        //3. 입력받은 값을 li에 담기
        li.innerHTML = newTodo.value;
        //4. li 내용을 todoList ul에 자식으로 추가
        document.getElementById('todoList').appendChild(li);
        //5. li에 삭제버튼 추가
        li.appendChild(del);
        del.innerText = "x";
        del.style.border = "none";
        del.style.background="none"
        del.style.cursor = "pointer";
        //6. 삭제버튼 클릭 시, 삭제 이벤트 실행
        del.addEventListener("click",deleteLi);
        // 입력된 내용 입력 창에서 사라지게
        newTodo.value = null;
    }
}

// 입력된 할 일 삭제 기능
function deleteLi(e){
    let removeOne = e.target.parentElement;  //선택된 버튼의 부모 객체를 변수로
    removeOne.remove(); //할당된 부모 객체 삭제
}