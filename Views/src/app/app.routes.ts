import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePage } from '../pages/home-page/home-page';
import { GamePage } from '../pages/game-page/game-page';

export const routes: Routes = [
    {path: "", component: HomePage},
    {path: "Game", component: GamePage}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
