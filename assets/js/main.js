Vue.component('game-field', {
    props: ['field'],
    template: `<div>{{field.content}}</div>`,
});


var vm = new Vue({
    el: '#app',
    data: {
        inputName: '',
        username: '',
        inputBoard: '',
        boardSize: '',
        board: []

    },
    methods: {
        setBoard: function () {

            if (parseInt(this.inputBoard) &&  this.inputBoard.match(/[3-5]/)) {
                this.boardSize = this.inputBoard;
            }

            for (let i = 0; i < this.boardSize; i++) {
                this.board.push([]);
                for (let j = 0; j < this.boardSize; j++) {
                    this.board[i].push({id: j, contents: '', led: false});
                }
            }

            console.log(this.board);
        },

        setUsername: function () {
            this.username = this.inputName;
        }
    }
})