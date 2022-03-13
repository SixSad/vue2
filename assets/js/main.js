Vue.component('square', {
    props: ['field'],
    template: `<div>{{field.content}}</div>`,
});


var vm = new Vue({
    el: '#app',
    data: {
        gameMode: null,
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
                    this.board[i].push({id: j, content: ''});
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


        FieldInRow: function (arr, mod, count = 5) {
            let counter = 1;
            if (mod === "row") {
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (counter === count) {
                            return true
                        }
                        if ([j + 1] < arr.length) {
                            if (arr[i][j].content !== '' && arr[i][j].content === arr[i][j + 1].content) {
                                counter++;
                                continue;
                            }
                        }
                        counter = 1;
                    }
                }
                return false;
            }

            if (mod === "column") {
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (counter === count) {
                            return true
                        }
                        if ([j + 1] < arr.length) {
                            if (arr[j][i].content !== '' && arr[j][i].content === arr[j + 1][i].content && arr[j][i].content) {
                                counter++;
                                continue;
                            }
                        }
                        counter = 1;
                    }
                }
                return false;
            }

            if (mod === "diag") {
                let zxc =[]
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if ([i + 1] < arr.length) {
                            zxc.push(arr[i + 1][i])
                        }

                    }

                }
                console.log(zxc)
            }


        },


        CheckWinner: function () {
            if (this.inProgress) {
                let mainDiag = [];
                let secondDiag = [];
                let column = this.board[0].map((val, index) => this.board.map(row => row[index]).reverse());

                // Строки

                if (this.boardSize <= '5' && this.FieldInRow(this.board, 'row', Number(this.boardSize))) {
                    this.winner = this.currentPlayer.name;
                    this.inProgress = false;
                }

                if (this.boardSize > '5' && this.FieldInRow(this.board, 'row')) {
                    this.winner = this.currentPlayer.name;
                    this.inProgress = false;
                }

                // Столбцы

                if (this.boardSize <= '5' && this.FieldInRow(this.board, 'column', Number(this.boardSize))) {
                    this.winner = this.currentPlayer.name;
                    this.inProgress = false;
                }

                if (this.boardSize > '5' && this.FieldInRow(this.board, 'column')) {
                    this.winner = this.currentPlayer.name;
                    this.inProgress = false;
                }

                // диагональ

                if (this.boardSize <= '5' && this.FieldInRow(this.board, 'diag', Number(this.boardSize))) {
                    this.winner = this.currentPlayer.name;
                    this.inProgress = false;
                }

                if (this.boardSize > '5' && this.FieldInRow(this.board, 'diag')) {
                    this.winner = this.currentPlayer.name;
                    this.inProgress = false;
                }


                if (this.movesMade === Math.pow(this.boardSize, 2)) {
                    this.inProgress = false;
                }

            }
        }
    }
})

