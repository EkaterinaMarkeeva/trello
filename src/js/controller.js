import DragAndDrop from './dragAndDrop';

export default class Controller {
  constructor() {
    this.lists = {
      'todo': [],
      'progress': [],
      'done': []
    }
    this.dnd = new DragAndDrop(this);
  }

  init() {
    this.registrationEvents();
  }

  registrationEvents() {
    const board = document.querySelector('.board');
    const addCards = board.querySelectorAll('.btn-add');
    this.onCellClick = this.onCellClick.bind(this);

    addCards.forEach(addCard => addCard.addEventListener('click', this.onCellClick));
  }

  createForm(e) {
    const elem = e.target;
    const parent = elem.closest('.column');
    const form = document.createElement('form');
    const textarea = document.createElement('textarea');
    const btnAddCard = document.createElement('button');
    const btnDelete = document.createElement('button');
    
    textarea.placeholder = "Enter a title for this card...";
    btnAddCard.textContent = "Add Card";
    btnDelete.textContent = `\u{00d7}`;
    
    form.classList.add('form');
    btnAddCard.classList.add('btn');
    btnAddCard.classList.add('btn-add-crd');
    btnDelete.classList.add('btn-delete');
    
    form.appendChild(textarea);
    form.appendChild(btnAddCard);
    form.appendChild(btnDelete);
    parent.appendChild(form);
    
    btnAddCard.addEventListener('click', this.onCellClick);
    btnDelete.addEventListener('click', this.onCellClick);
  };

  createButton(e) {
    const elem = e.target;
    const parent = elem.closest('.column');

    const button = document.createElement('button');

    button.classList.add('btn');
    button.classList.add('btn-add');
    button.textContent = '+ Add another card';

    parent.appendChild(button);

    button.addEventListener('click', this.onCellClick);
  }

  createNewCard(e) {
    const elem = e.target;
    const parent = elem.closest('.column');
    const cards = parent.querySelector('.cards');
    const data = this.getDataForm();
    const index = this.lists[parent.id].length;

    const newCard = document.createElement('div');
    const btnDelete = document.createElement('button');

    newCard.classList.add('card');
    btnDelete.classList.add('btn-delete');

    newCard.dataset.index = index;
    newCard.dataset.columnIndex = parent.id;
    newCard.textContent = data;
    btnDelete.textContent = `\u{00d7}`;

    this.lists[parent.id].push(newCard);
    newCard.appendChild(btnDelete);
    cards.appendChild(newCard);
    btnDelete.addEventListener('click', this.onCellClick);
  }

  getDataForm() {
    const textarea = document.querySelector('textarea');
    return textarea.value;
  }

  removeForm(e) {
    const elem = e.target;
    const parent = elem.closest('.form');

    parent.remove();
  }

  onCellClick(e) {
    e.preventDefault();
    
    const elem = e.target;
    const form = elem.closest('.form');
    const card = elem.closest('.card');

    if (form) {
      if (!elem.className.includes('delete')) {
        if (this.getDataForm()) {
          this.createNewCard(e);
          this.createButton(e);
          this.removeForm(e);
        } else {
          this.createButton(e);
          thi.removeForm(e);
        }
      } else {
        this.createButton(e);
        this.removeForm(e);
      }
    } else if (card) {
      this.lists[card.getAttribute('data-column-index')] = this.lists[card.getAttribute('data-column-index')].filter(el => el.getAttribute('data-index') !== card.getAttribute('data-index'));
      card.remove();
    } else {
      this.createForm(e);
      e.target.remove();
    }
  }
}
