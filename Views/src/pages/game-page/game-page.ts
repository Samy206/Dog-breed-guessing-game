import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClient } from '@angular/common/http';
import { Dog } from '../../domain/Dog';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-page',
  imports: [NzIconModule, RouterLink, CommonModule, NzInputModule, NzButtonModule],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable({
  providedIn: 'root',
})
export class GamePage implements OnInit, OnDestroy {

  private http = inject(HttpClient);
  private subscription: any;
  public PARTY_LENGTH = 10;
  public currentDog : Dog;
  
  public currentIndex: number;
  public userAnswers: String[] = [];
  public answers: String[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  async ngOnInit(): Promise<any>  {
    this.currentIndex = 0;
    this.userAnswers = new Array(10);
    this.answers = new Array(10);
    await this.getNextDog()
  } 

  async getNextDog(): Promise<void> {
    this.subscription = await this.http.get<any>('https://localhost:32769').pipe().subscribe(data => {
      console.log(data)
      this.currentDog = new Dog(data.name, data.breed, data.pictureURL);
      this.cd.markForCheck();
    })
  }

  public getDog(): Dog {
    return this.currentDog;
  }

  async saveAnswer(): Promise<void> {
    console.log(this.currentDog.getBreed())
    if(this.currentIndex < this.PARTY_LENGTH){

      let input = <HTMLInputElement>document.getElementById("breed-guess");
      this.userAnswers[this.currentIndex] = input?.value;
      this.answers[this.currentIndex] = this.currentDog.getBreed();
      
      this.currentIndex++;
      console.log(this.answers);
      console.log(this.userAnswers)
      input.value = '';
    } 

    await this.getNextDog();
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
