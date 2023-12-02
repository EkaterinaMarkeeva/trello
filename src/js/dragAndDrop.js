export default class DragAndDrop {
  constructor(target) {
    this.target = target;
    this.activeElement;
    this.shiftX;
    this.shiftY;
    this.activeElementHeight;
    this.activeElementWidth;
    this.position = null;
    this.cursorPosition;
    this.oldElem = null;
    
    this.board = document.querySelector('.board');

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.board.addEventListener('mousedown', this.onMouseDown);
  }

  onMouseOver(e) {
    this.cursorPosition = e.clientY;
    this.activeElement.style.top = e.clientY - this.shiftY + 'px';
    this.activeElement.style.left = e.clientX - this.shiftX + 'px';
    
    const newCard = this.createNewElement();
    const position = this.canDrop(e);

    newCard.style.height = this.activeElementHeight;
    newCard.style.width = this.activeElementWidth;

    if (!position) return;

    if (!this.position || position.join('') !== this.position.join('')) {
      this.position = position;
      
      if (this.oldElem) {
        this.oldElem.remove();
      }

      this.oldElem = this.addElement(position, newCard);
    }
  };

  onMouseUp(e) {
    if (this.oldElem) {
      this.oldElem.remove();
      this.addElement(this.position, this.activeElement);
    }

    this.target.lists[this.activeElement.getAttribute('data-column-index')] = this.target.lists[this.activeElement.getAttribute('data-column-index')].filter(elem => elem.getAttribute('data-index') !== this.activeElement.getAttribute('data-index'));
    
    this.target.lists[this.activeElement.getAttribute('data-column-index')].forEach(elem => {
      if (elem.getAttribute('data-index') >= this.activeElement.getAttribute('data-index')) {
        elem.setAttribute('data-index', +elem.getAttribute('data-index') - 1);
      }
    });
    
    if (this.activeElement.getAttribute('data-column-index') !== this.position[0]) {
      this.activeElement.setAttribute('data-column-index', this.position[0]);
      this.activeElement.setAttribute('data-index', this.position[1]);
    } else {
      if (this.position[1] === 0) {
        this.activeElement.setAttribute('data-index', this.position[1]);
      } else {
        this.activeElement.setAttribute('data-index', this.position[1] - 1);
      }
    }

    this.target.lists[this.activeElement.getAttribute('data-column-index')].forEach(elem => {
      if (elem.getAttribute('data-index') >= this.activeElement.getAttribute('data-index')) {
        elem.setAttribute('data-index', +elem.getAttribute('data-index') + 1);
      }
    });
  
    this.target.lists[this.activeElement.getAttribute('data-column-index')].push(this.activeElement);
    this.activeElement.classList.remove('dragged');
    
    // this.activeElement.style.cursor = 'auto';
    // this.board.style.cursor = 'grabbing';
    this.activeElement = null;

    document.documentElement.removeEventListener('mouseup', this.onMouseUp);

    for (let elem in this.target.lists) {
      const column = document.getElementById(elem);

      column.removeEventListener('mouseover', this.onMouseOver);
    }
  };

  canDrop(e) {
    const elem = e.target;

    if (elem.getAttribute('data-index')) {
      const { top, height } = elem.getBoundingClientRect();
      const centerElem = top + height / 2;

      if (this.cursorPosition >= centerElem) {
        return [elem.getAttribute('data-column-index'), +elem.getAttribute('data-index') + 1];
      } else {
        return [elem.getAttribute('data-column-index'), elem.getAttribute('data-index')];
      }
    }

    if (elem.className.includes('column')) {
      const { top, height } = elem.getBoundingClientRect();
      const centerElem = top + height / 2;

      if (this.cursorPosition >= centerElem) {
        const cards = elem.querySelector('.cards');
        const card = elem.querySelector('.card');
        if (card) {
          return [elem.id, cards.children.length - 2];
        } else {
          return [elem.id, cards.children.length];
        }
      } else {
        return [elem.id, 0];
      }
    }
  };

  addElement(position, elem) {
    const col = document.getElementById(position[0]);

    if (!col) return;

    const cards = col.querySelector('.cards');
    const referenceElem = cards.children[position[1]];

    if (referenceElem) {
      cards.insertBefore(elem, referenceElem);
    } else {
      cards.appendChild(elem);
    }

    return elem;
  }

  onMouseDown(e) {
    this.activeElement = e.target;

    if (this.activeElement.className.includes('card')) {
      e.preventDefault();

      const { left, top, height, width } = this.activeElement.getBoundingClientRect();

      this.activeElementWidth = width + 'px';
      this.activeElementHeight = height + 'px';
      this.shiftX = e.clientX - left;
      this.shiftY = e.clientY - top;

      this.activeElement.classList.add('dragged');
      // this.activeElement.style.cursor = 'grabbing';
      this.activeElement.style.width = this.activeElementWidth;
      this.activeElement.style.height = this.activeElementHeight;
      
      document.documentElement.addEventListener('mouseup', this.onMouseUp);

      for (let elem in this.target.lists) {
        const column = document.getElementById(elem);

        column.addEventListener('mouseover', this.onMouseOver);
      }
    }
  };

  createNewElement() {
    const div = document.createElement('div');

    div.classList.add('possibility');

    return div;
  }
}
