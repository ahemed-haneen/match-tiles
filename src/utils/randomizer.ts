class Randomizer {
  itemList: string[];
  itemDictionary: { [key: string]: number } = {};
  itemFrequency: { [key: string]: number } = {};

  totalItems: number;

  constructor(args: { itemList: string[] }) {
    this.itemList = args.itemList;
    this.totalItems = this.itemList.length
    this.itemList.forEach((item) => {
      this.itemFrequency[item] = 0;
    });
  }

  getRandomItem(){
    const randomIndex = Math.floor(Math.random() * this.totalItems);
    const randomItem = this.itemList[randomIndex];
    this.itemFrequency[this.itemList[randomIndex]]++;
    if (this.itemFrequency[this.itemList[randomIndex]] > 1){
        this.itemList = this.itemList.filter(item => item != this.itemList[randomIndex])
        this.totalItems = this.itemList.length
    }
    return randomItem
  }
}

export default Randomizer