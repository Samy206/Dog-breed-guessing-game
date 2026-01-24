import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { Dog } from '../../domain/Dog';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-page',
  imports: [NzIconModule, RouterLink, CommonModule],
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
  public currentDog : Dog;

  constructor(private cd: ChangeDetectorRef) {}

  async ngOnInit(): Promise<any>  {
    await this.getNextDog()
  } 

  async getNextDog(): Promise<void> {
    this.subscription = await this.http.get<Dog>('https://localhost:32769').pipe().subscribe( data => {
      this.currentDog = data;
      this.cd.markForCheck();
      console.log(this.currentDog)
    })
  }

  public getDog(): Dog {
    return this.currentDog;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
