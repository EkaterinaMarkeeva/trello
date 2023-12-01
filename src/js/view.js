export default class View {
  constructor(target) {
    this.target = target;
  }

  createForm() {
    const form = document.createElement('form');
    const textarea = document.createElement('textarea');
    const btnAddCard = document.createElement('button');
    const btnDelete = document.createElement('button');
    
    textarea.placeholder = "Enter a title for this card...";
    btnAddCard.textContent = "Add Card";
    
    form.classList.add('form');
    btnAddCard.classList.add('btn');
    btnAddCard.classList.add('btn-add-crd');
    btnDelete.classList.add('btn-delete');
    
    form.appendChild(textarea);
    form.appendChild(btnAddCard);
    form.appendChild(btnDelete);

    return form;
  };

  createButton() {
    const button = document.createElement('button');

    button.classList.add('btn');
    button.classList.add('btn-add');
    button.textContent = '+ Add another card';

    return button;
  }

  createNewCard(e, title) {
    const elem = e.target;
    const parent = elem.closest('.column');
    const data = title;
    const index = this.target.lists[parent.id].length;

    const newCard = document.createElement('div');
    const btnDelete = document.createElement('button');

    newCard.classList.add('card');
    btnDelete.classList.add('btn-delete');

    newCard.dataset.index = index;
    newCard.dataset.columnIndex = parent.id;
    newCard.textContent = data;

    newCard.appendChild(btnDelete);
    
    return newCard;
  }

  createCardByData(parentId, index, title) {
    const parent = document.getElementById(parentId);
    const cards = parent.querySelector('.cards');
    const newCard = document.createElement('div');
    const btnDelete = document.createElement('button');

    newCard.classList.add('card');
    btnDelete.classList.add('btn-delete');

    newCard.dataset.index = index;
    newCard.dataset.columnIndex = parentId;
    newCard.textContent = title;

    this.target.lists[parentId].push(newCard);
    
    btnDelete.addEventListener('click', this.target.onCellClick);

    newCard.appendChild(btnDelete);
    cards.appendChild(newCard);
  }
}