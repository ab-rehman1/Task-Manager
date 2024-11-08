window.onload = function() {

    var submitBtn = document.querySelector('.submit-btn');
    var input = document.querySelector('.input');
    var tasks = document.querySelector('.tasks');

    loadItems();


    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var inputText = input.value.trim();

        if (inputText === '') {
            alert('Please enter something!');
        } else {
            var span = document.createElement('span');
            span.textContent = inputText;
            span.classList.add('task-span'); 
            tasks.appendChild(span);          

            var delBtnSpan = document.createElement('span');
            delBtnSpan.classList.add('task-action-span');
            
            var delBtn = document.createElement('button');
            delBtn.textContent = "Delete";
            delBtnSpan.appendChild(delBtn);
            tasks.appendChild(delBtnSpan);

            delBtn.addEventListener('click', function(e) {
                e.preventDefault();

                var userConfirmed = confirm("Do you really wants to delete it?");
                if (userConfirmed) {
                    tasks.removeChild(span);      
                    tasks.removeChild(delBtnSpan);
                }               
            });
            

            storItems();
            input.value = '';
        }
    });

    function storItems() {
        var tasks = document.querySelector('.tasks');
        var taskHtml = tasks.innerHTML;
        localStorage.setItem('data', taskHtml);
    }

    function loadItems() {
        var tasks = document.querySelector('.tasks');
        var savedHtml = localStorage.getItem('data');
        if (savedHtml) {
            tasks.innerHTML = savedHtml;

            var deleteBtns = tasks.querySelectorAll('button');
            deleteBtns.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();

                    var userConfirmed = confirm("Do you really want to delete it?");
                    if (userConfirmed) {
                        var taskSpan = btn.parentNode.previousSibling; 
                        tasks.removeChild(taskSpan);
                        tasks.removeChild(btn.parentNode); 

                        storItems();
                    }
                });
            });


        }
    }
};
