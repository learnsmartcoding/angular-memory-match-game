import { Component, OnInit } from '@angular/core';
import { animals, cars } from '../model/constants';
import { ImageDetail } from '../model/image-detail';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  images: ImageDetail[] = [];
  lastClickedId = 0;
  currentSelected!: ImageDetail[];
  showHint = false;
  gameCards = '2';
  category = 'transport';
  noOfMoves = 0;
  gameOver=false;
  constructor() {}

  ngOnInit(): void {}

  toggleHideShowHint(): void {
    this.showHint = !this.showHint;
  }

  startGame() {
    this.images = [];
    this.gameOver=false;
    this.noOfMoves = 0;
    const imageCountsToLoad = +this.gameCards;
    const allMixedImages: string[] = this.shuffle(
      this.category === 'transport' ? cars : animals
    );

    for (let i = 0; i < imageCountsToLoad; i++) {
      let imageToPush: ImageDetail = {
        imageId: i,
        id: i,
        imagePath: allMixedImages[i],
        isVisible: false,
        matched: false,
        clickCount: 0,
        category: '', //this.category === 'transport' ? 'Cars/Trucks' : 'Animals',
        cardBack: 'flip-card-back',
        cardFront: 'flip-card-front',
      };
      this.images.push(imageToPush);
    }

    this.loadImageDetails(this.images);
    this.shuffleArray(this.images);
  }

  shuffleArray(array: ImageDetail[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    this.images = array;
  }

  shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  loadImageDetails(images: ImageDetail[]) {
    images.forEach((f) => {
      let newId = f.id + +this.gameCards;

      let toAdd: ImageDetail = {
        imageId: f.imageId,
        id: newId,
        imagePath: f.imagePath,
        isVisible: false,
        matched: false,
        clickCount: 0,
        category: 'animals',
        cardBack: 'flip-card-back',
        cardFront: 'flip-card-front',
      };
      this.images.push(toAdd);
    });
  }

  resetSelectedImages() {
    this.images.forEach((f) => {
      if (this.currentSelected[0].id === f.id) {
        f.clickCount = 0;
        f.cardBack = 'flip-card-back';
        f.cardFront = 'flip-card-front';
        f.matched = false;
        f.isVisible = false;
      }
    });

    this.images.forEach((f) => {
      if (this.currentSelected[1].id === f.id) {
        f.clickCount = 0;
        f.cardBack = 'flip-card-back';
        f.cardFront = 'flip-card-front';
        f.matched = false;
        f.isVisible = false;
      }
    });
  }

  onClickOfImage(image: ImageDetail) {
    let imageClicked = <ImageDetail>this.images.find((f) => f.id === image.id);

    if (imageClicked.id !== this.lastClickedId) {
      this.noOfMoves = this.noOfMoves + 1;
      this.lastClickedId = imageClicked.id;
      imageClicked.clickCount = 1;
      imageClicked.isVisible = true;
      imageClicked.cardBack = 'flip-card-front';
      imageClicked.cardFront = 'flip-card-back';

      let clickCount = this.images.filter(
        (f) => f.clickCount === 1 && !f.matched
      );

      if (clickCount.length === 2) {
        if (clickCount[0].imageId === clickCount[1].imageId) {
          clickCount[0].matched = true;
          clickCount[0].isVisible = true;
          clickCount[0].clickCount = 2;
          clickCount[1].clickCount = 2;
          clickCount[1].matched = true;
          clickCount[1].isVisible = true;
        } else {
          setTimeout(() => {
            this.currentSelected = clickCount;
            this.resetSelectedImages();
          }, 1000);
          this.lastClickedId = 0;
        }
      }
    }

    if(this.images.filter(f=>!f.matched).length===0){
      this.gameOver=true;
    }
  }

  showAll() {
    this.images.forEach((f) => {
      f.isVisible = true;
      f.clickCount = 2;
      f.cardBack = 'flip-card-front';
      f.cardFront = 'flip-card-back';
    });
  }
}
