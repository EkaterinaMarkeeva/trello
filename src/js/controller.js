import DragAndDrop from './dragAndDrop';
import View from './view';
import State from './state';

export default class Controller {
  constructor(stateService) {
    this.stateService = stateService;
    this.state = new State();
    this.lists = {
      'todo': [],
      'progress': [],
      'done': []
    }
    this.dnd = new DragAndDrop(this);
    this.view = new View(this);
  }

  init() {
    this.registrationEvents();

    window.onload = this.onLoadListener.bind(this);
    window.onunload = this.onSaveListener.bind(this);
  }

  registrationEvents() {
    const s = document.getElementById('q');
    s.addEventListener('click', this.onSaveListener.bind(this));

    const board = document.querySelector('.board');
    const addCards = board.querySelectorAll('.btn-add');
    this.onCellClick = this.onCellClick.bind(this);
    
    addCards.forEach(addCard => addCard.addEventListener('click', this.onCellClick));
  }

  addForm(e) {
    const elem = e.target;
    const parent = elem.closest('.column');
    const form = this.view.createForm();
    parent.appendChild(form);

    const btnAddCard = parent.querySelector('.btn-add-crd');
    const btnDelete = parent.querySelector('.btn-delete');
    
    btnAddCard.addEventListener('click', this.onCellClick);
    btnDelete.addEventListener('click', this.onCellClick);
  };

  addButton(e) {
    const elem = e.target;
    const parent = elem.closest('.column');
    const button = this.view.createButton();

    button.classList.add('btn');
    button.classList.add('btn-add');
    button.textContent = '+ Add another card';

    parent.appendChild(button);

    button.addEventListener('click', this.onCellClick);
  }

  addNewCard(e, title) {
    const elem = e.target;
    const parent = elem.closest('.column');
    const cards = parent.querySelector('.cards');
    const newCard = this.view.createNewCard(e, title);

    this.lists[parent.id].push(newCard);

    cards.appendChild(newCard);
    
    const btnDelete = newCard.querySelector('.btn-delete');

    btnDelete.addEventListener('click', this.onCellClick);
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
          this.addNewCard(e, this.getDataForm());
          this.addButton(e);
          this.removeForm(e);
        } else {
          this.addButton(e);
          this.removeForm(e);
        }
      } else {
        this.addButton(e);
      
        this.removeForm(e);
      }
    } else if (card) {
      this.lists[card.getAttribute('data-column-index')] = this.lists[card.getAttribute('data-column-index')].filter(el => el.getAttribute('data-index') !== card.getAttribute('data-index'));
      
      card.remove();
    } else {
      this.addForm(e);
      e.target.remove();
    }
  }
  
  getDataForm() {
    const textarea = document.querySelector('textarea');
    return textarea.value;
  }

  onSaveListener() {
    this.stateService.clear();

    const result = {
      lists: {
        'todo': [],
        'progress': [],
        'done': []
      }
    };
    
    for (let list in this.lists) {
      this.lists[list].forEach(el => {
        result.lists[list][el.getAttribute('data-index')] = el.textContent;
      });
        
    }
    console.log('onSaveListener', result);
    this.stateService.save(result);
  }

  onLoadListener() {
    if(!State.from(this.stateService.load())) return;
    const newState = State.from(this.stateService.load());

    
    for (let key in this.state) {
      this.state[key] = newState[key];
    }

    // console.log('onLoadListener', this.state);
    for (let list in this.state.lists) {
    // console.log('onLoadListener', this.state.lists[list]);
      this.state.lists[list].forEach((title, index) => {
        // console.log('f'); 
        this.view.createCardByData(list, index, title);
      });
    }
    
  }
}
