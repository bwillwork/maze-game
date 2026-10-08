import { Routes } from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {SetupPage} from './pages/setup-page/setup-page';
import {GamePage} from './pages/game-page/game-page';
import { AboutPage } from './pages/about-page/about-page';




export const routes: Routes = [
  {path: "", component: HomePage},
  {path: "setup", component: SetupPage},
  {path: "game", component: GamePage},
  {path: "about", component: AboutPage},
  {path: "**",redirectTo:"/"}
];
