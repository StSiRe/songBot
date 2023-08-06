class Songs {
    private list = [
        ["Мы никогда не умрем!", "dfsdf \n dsdsfd", "you.tu/fdsfdsf"],
        ["Мы умрем!", "dffdsfsdf \n aaaaa", "you.tu/aaaaa"],
        ["Слава Андрею!", "Андрею \n слава", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"]
    ];
    getListNamesSongs() {
        let names: string[];
        for (let item of this.list) {
            names.push(item[0]);
        }
        return names;
    }

    getTextOfSong(id: number) {
        let texts: string[];
        for (let item of this.list) {
            texts.push(item[1]);
        }
        return texts;
    }

    getVideoLinkOfSong(id: number) {
        let links: string[];
        for (let item of this.list) {
            links.push(item[2]);
        }
        return links;
    }
}