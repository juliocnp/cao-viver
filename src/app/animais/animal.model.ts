export class Animal {
    nome: string;
    chegada: Date;
    descricao: string;
    adotado: boolean;
    id: string;
    foto: any;
    fotoURL: string;

    constructor(data?: Animal) {
        if (data) {
            data.nome = this.nome;
            data.chegada = this.chegada;
            data.descricao = this.descricao;
            data.adotado = this.adotado;
            data.id = this.id;
            data.foto = this.foto;
            data.fotoURL = this.fotoURL;
        }
    }
}