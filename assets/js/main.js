Vue.component('square', {
    props: ['field'],
    template: `<div>{{field.content}}</div>`,
});


var vm = new Vue({
    el: '#app',
    data: {
        inProgress: false,
        winner: null,
        players: [],
        currentPlayer: [],
        movesMade: 0,
        inputName: '',
        username: '',
        inputBoard: '',
        boardSize: '',
        board: []

    },

    computed: {
        showWinner: function () {
            if (this.inProgress) {
                return `It's ` + this.currentPlayer.name + ` turn`;
            }
            if (this.winner) {
                return 'Player ' + this.winner + ' wins';
            }
            if (!this.winner && !this.inProgress) {
                return 'Draw';
            }
        },
        showSettings: function () {
            if (this.boardSize !== '') {
                return false;
            }
            if (this.currentPlayer.name) {
                return true;
            }
        },
    },

    methods: {
        setBoard: function () {

            this.boardSize = this.inputBoard;

            for (let i = 0; i < this.boardSize; i++) {
                this.board.push([]);
                for (let j = 0; j < this.boardSize; j++) {
                    this.board[i].push({content: ''});
                }
            }

        },

        setUsername: function () {
            if (this.players.length === 0 && this.inputName) {
                this.players.push({name: this.inputName, figure: 'X'})
                this.inputName = '';
            }
            if (this.players.length !== 0 && this.inputName) {
                this.players.push({name: this.inputName, figure: 'O'})
                this.inputName = '';
            }
            if (this.players.length === 2) {
                this.currentPlayer = this.players[0]
                this.inProgress = true;
            }

        },

        makeMove: function (field) {
            if (this.inProgress && !field.content) {
                field.content = this.currentPlayer.figure;
                this.movesMade++;
                this.CheckWinner();
                this.currentPlayer = this.players.reverse()[0];
            }

        },


        FieldInRow: function (arr, count) {

            let idArr = arr.filter((field) => {
                if (field.content === this.currentPlayer.figure) {
                    return field
                }
            }, this).map(value => value.id)

            let counter = 1;

            for (let i = 0; i < idArr.length; i++) {
                if (counter === count) {
                    return true;
                }
                if (idArr[i] === idArr[i + 1] - 1) {
                    counter++;
                    continue;
                }
                counter = 0;
            }
            return false;
        },


        CheckWinner: function () {
            if (this.inProgress) {
                let mainDiag = [];
                let secondDiag = [];
                let column = this.board[0].map((val, index) => this.board.map(row => row[index]).reverse());

                // Строки
                for (let i = 0; i < this.boardSize; i++) {

                    if (this.boardSize === '3' && this.board[i].every(field => field.content === this.currentPlayer.figure)) {
                        this.winner = this.currentPlayer.name;
                        this.inProgress = false;
                    }

                    if (this.boardSize === '5' && this.FieldInRow(this.board[i], 4)) {
                        this.winner = this.currentPlayer.name;
                        this.inProgress = false;
                    }

                }

                // Столбцы

                for (let i = 0; i < this.boardSize; i++) {
                    if (this.boardSize === '3' && column[i].every(field => field.content === this.currentPlayer.figure)) {
                        this.winner = this.currentPlayer.name;
                        this.inProgress = false;
                    }

                    if (this.boardSize === '5' && this.FieldInRow(this.board, 4)) {
                        this.winner = this.currentPlayer.name;
                        this.inProgress = false;
                    }
                }

                //диагональ
                //
                // for (let i = 0; i < this.boardSize; i++) {
                //     for (let j = 0; j < this.boardSize; j++) {
                //         if (i === j) {
                //             mainDiag.push(this.board[i][j]);
                //         }
                //         if (i + j === this.boardSize - 1) {
                //             secondDiag.push(this.board[i][j]);
                //         }
                //     }
                // }
                //
                // if (mainDiag.every(field => field.content === this.currentPlayer.figure)) {
                //     this.winner = this.currentPlayer.name;
                //     this.inProgress = false;
                // }
                //
                // if (secondDiag.every(field => field.content === this.currentPlayer.figure)) {
                //     this.winner = this.currentPlayer.name;
                //     this.inProgress = false;
                // }

                if (this.movesMade === Math.pow(this.boardSize, 2)) {
                    this.inProgress = false;
                }
            }
        },
    }
})

