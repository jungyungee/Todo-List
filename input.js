let newTodo = document.getElementById("newTodo");  //입력된 할일
const button = document.querySelector("button"); //버튼

//할일 추가 기능
function addTodo(){
    if(newTodo.value == false){
        alert("할 일이 입력되지 않았습니다!")   //아무것도 입력하지 않았을 때 경고창
    }
    else{
        // 추가할 li element 생성 (할일 리스트에 동적으로 추가)
        let list = document.createElement('li');
        // 할일 완료 체크 박스
        let chk = document.createElement("input");
        chk.type="checkbox"
        // 삭제 버튼
        let del = document.createElement('button');

        // 입력받은 값을 li에 담기
        list.innerHTML = newTodo.value;
        // li 내용을 todoList ul에 자식으로 추가
        document.getElementById('todoList').appendChild(list);

        // li에 체크박스 추가
        list.appendChild(chk);
        // li에 삭제버튼 추가
        list.appendChild(del);
        del.innerText = "x";
        del.style.border = "none";
        del.style.background="none"
        del.style.cursor = "pointer";

        //6. 삭제버튼 클릭 시, 삭제 이벤트 실행
        del.addEventListener("click",deleteLi);

        //할일 완료
        chk.addEventListener("change", () => {
            if (chk.checked == true ){
                list.style.textDecoration = "line-through";
                list.style.color = "gray"; 
            }
            else {
                list.style.textDecoration = "none";
                list.style.color = "black";
            }
        })

        // 입력된 내용 입력 창에서 사라지게
        newTodo.value = null;
    }
}

// 입력된 할 일 삭제 기능
function deleteLi(e){
    let removeOne = e.target.parentElement;  //선택된 버튼의 부모 객체를 변수로
    removeOne.remove(); //할당된 부모 객체 삭제
}