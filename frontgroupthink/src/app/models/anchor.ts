export class Anchor {

    constructor(
        public _id: string,
        public name: string,
        public notes : string,
        public characters: Array<string>,
        public location : string, //geoJSON
    ){}

    static CreateDefault(): Anchor {
        return new Anchor('', '', '', [], '');
    }
}
