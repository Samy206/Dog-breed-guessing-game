export class Dog {

    public name : String;
    private breed : String;
    public pictureURL : String;

    constructor(name : String, breed : String, pictureURL: String) {
        this.name = name;
        this.breed = breed;
        this.pictureURL = pictureURL;
    }

    public getBreed() : String {
        return this.breed;
    }

    public getSrc() : String {
        return this.pictureURL;
    }
}