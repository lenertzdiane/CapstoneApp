export class Vignette {

    constructor(
        public _id: string,
        public name: string,
        public text : Array<string>,
        public characters: Array<string>,
        public location : string, //geoJSON
        public order : number,
    ){}

    static CreateDefault(): Vignette {
        return new Vignette('', '', [], [], '', 0);
    }
}
