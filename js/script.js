(() => {
	const popupShowBtn = document.querySelector('.btn-add');
	const popupWrapper = document.querySelector('.popup-wrapper');
	const popupInput = document.querySelector('.popup-input');
	const addTaskBtn = document.querySelector('.popup-btn');

	let taskList = [
		{
			text: 'Test task',
			status: false,
			id: 2838383
		}
	];

	generateList()

	popupShowBtn.addEventListener('click', showPopup);
	addTaskBtn.addEventListener('click', () => {
		if (popupInput.value) {
			addTask(popupInput.value);
			console.log(taskList);
			closePopup();
			popupInput.value = ''
			generateList()
		}
	})


	function showPopup() {
		popupWrapper.style.display = 'flex';
	}

	function closePopup() {
		popupWrapper.style.display = 'none';
	}

	function addTask(text) {
		const task = {
			text,
			status: false,
			id: new Date().getTime()
		}
		taskList.push(task);
	}

	function generateList() {
		const taskWrapper = document.querySelector('.todo-list')

		taskWrapper.addEventListener('click', actionHandle, false);

		taskWrapper.innerHTML = ''
		taskList.forEach(({ text, status, id }) => {
			const taskItem = document.createElement('div');
			taskItem.classList.add('todo-list__item');
			taskItem.dataset.status = status;
			taskItem.dataset.id = id;
			taskItem.innerHTML = `
				<span>${text}</span>
				<button data-action="done" class="btn todo-list__btn todo-list__btn--done">Done</button>
				<button data-action="remove" class="btn todo-list__btn todo-list__btn--delete">Remove</button>
			`;

			taskWrapper.insertAdjacentElement('beforeend', taskItem)

		})
	}

	function actionHandle(event) {
		let target = event.target;
		event.stopPropagation();
		if (target.tagName === 'BUTTON') {
			let taskItemId = target.parentElement.dataset.id;

			console.log(target.dataset.action)
			if (target.dataset.action === 'done' || target.dataset.action === 'undone') {
				setData(target)
				taskDone(taskItemId);
			}

			if (target.dataset.action === 'remove') {
				taskRemove(taskItemId);
			}
		}
	}

	function taskDone(id) {
		let el = document.querySelector(`[data-id="${id}"]`)
		let bool;
		taskList.forEach(item => {
			if (item.id == id) {
				bool = item.status
				item.status = !bool
			}
		})
		el.dataset.status = !bool
	}

	function taskRemove(id) {
		const el = document.querySelector(`[data-id="${id}"]`)
		taskList = taskList.map((item) => {
			if (item.id != id) {
				return item
			}
		}).filter(item => item ? item : null)
		generateList()
	}

	function setData(item) {
		item.innerHTML = item.innerHTML === 'Done' ? 'Undone' : 'Done';
		if (item.dataset.action === 'done') {
			item.dataset.action = 'undone'
		} else {
			item.dataset.action = 'done'
		}
	}

})()