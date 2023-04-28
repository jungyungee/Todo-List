let newTodo = document.getElementById("newTodo");  //입력된 할일
const button = document.querySelector("button"); //버튼

function addTodo(){
    if(newTodo.value == false){
        alert("할 일이 입력되지 않았습니다!")   //아무것도 입력하지 않았을 때
    }
    else{
        //1. 추가할 li element 생성 (할일 리스트 동적으로 추가)
        let li = document.createElement("li");
        //2. 입력받은 값을 li에 담기
        li.innerHTML = newTodo.value;
        //3. li 내용을 todoList ul에 자식으로 추가
        document.getElementById('todoList').appendChild(li);
        newTodo.value = null; //입력된 내용 입력 창에서 사라지게
    }
}
